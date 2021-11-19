const { ApolloServer, UserInputError, gql } = require("apollo-server");
const { v1: uuid } = require("uuid");
require("dotenv").config();

const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log("connected to MongoDB");
	})
	.catch((error) => {
		console.log("error connecting to MongoDB:", error.message);
	});

const authors = Author.find();
const books = Book.find();

const typeDefs = gql`
	type Book {
		title: String!
		published: Int!
		author: Author!
		genres: [String!]!
		id: ID!
	}
	type Author {
		name: String!
		id: ID!
		born: Int
		bookCount: Int
	}
	type Query {
		authorCount: Int!
		bookCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
	}
	type Mutation {
		addBook(
			title: String!
			published: Int!
			author: String!
			genres: [String!]!
		): Book
	}
	type Mutation {
		editAuthor(name: String!, setBornTo: Int!): Author
	}
`;

const resolvers = {
	Query: {
		authorCount: () => authors.length,
		bookCount: () => books.length,
		allBooks: (root, args) => {
			let result = books;
			args.author
				? (result = result.filter((b) => b.author === args.author))
				: result;
			args.genre
				? (result = result.filter((b) => b.genres.includes(args.genre)))
				: result;
			return result;
		},
		allAuthors: () => authors,
	},
	Author: {
		bookCount: (root) => {
			const foundBooks = books.filter((b) => b.author === root.name);
			return foundBooks.length;
		},
	},
	Mutation: {
		addBook: async (root, args) => {
			const foundAuthor = await Author.findOne({ name: args.author });

			if (!foundAuthor) {
				const newAuthor = new Author({ name: args.author });
				newAuthor.save();
			}

			const author = await Author.findOne({ name: args.author });

			const newBook = new Book({ ...args, author });

			newBook.save();
			return newBook;
		},

		editAuthor: (root, args) => {
			const author = authors.find((a) => a.name === args.name);
			if (!author) {
				return null;
			}

			const updatedAuthor = { ...author, born: args.setBornTo };
			authors = authors.map((a) => (a.name === args.name ? updatedAuthor : a));
			return updatedAuthor;
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
