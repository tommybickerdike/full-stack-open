const { ApolloServer, UserInputError, gql } = require("apollo-server");
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
		authorCount: async () => await Author.countDocuments(),
		bookCount: async () => await Book.countDocuments(),
		allBooks: async (root, args) => {
			return await Book.find(
				args.genre ? { genres: { $in: [args.genre] } } : {}
			).populate("author");
		},
		allAuthors: async () => await Author.find({}),
	},
	Author: {
		bookCount: async (root) => {
			console.log(await Book.find({ author: { $in: root._id } }));
			return await Book.countDocuments({
				author: { $in: root._id },
			});
		},
	},
	Mutation: {
		addBook: async (root, args) => {
			const foundAuthor = await Author.findOne({ name: args.author });

			if (!foundAuthor) {
				const newAuthor = new Author({ name: args.author });
				try {
					await newAuthor.save();
				} catch (error) {
					throw new UserInputError(error.message, {
						invalidAuthorCreation: args.author,
					});
				}
			}

			const author = await Author.findOne({ name: args.author });
			const newBook = new Book({ ...args, author });

			try {
				await newBook.save();
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			}

			return newBook;
		},

		editAuthor: (root, args) => {
			// const author = authors.find((a) => a.name === args.name);
			// if (!author) {
			// 	return null;
			// }
			// const updatedAuthor = { ...author, born: args.setBornTo };
			// authors = authors.map((a) => (a.name === args.name ? updatedAuthor : a));
			// return updatedAuthor;
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
