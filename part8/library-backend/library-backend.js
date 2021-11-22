const {
	ApolloServer,
	UserInputError,
	AuthenticationError,
	gql,
} = require("apollo-server");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.SECRET_KEY;

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
	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}
	type Token {
		value: String!
	}
	type Query {
		me: User
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
		editAuthor(name: String!, setBornTo: Int!): Author
		createUser(username: String!, favoriteGenre: String!): User
		login(username: String!, password: String!): Token
	}
`;

const resolvers = {
	Query: {
		me: (root, args, context) => {
			return context.currentUser;
		},
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
			return await Book.countDocuments({
				author: { $in: root._id },
			});
		},
	},
	Mutation: {
		addBook: async (root, args, context) => {
			const currentUser = context.currentUser;

			if (!currentUser) {
				throw new AuthenticationError("not authenticated");
			}

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
		createUser: (root, args) => {
			const user = new User({ ...args });

			return user.save().catch((error) => {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			});
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });

			if (!user || args.password !== "secret") {
				throw new UserInputError("wrong credentials");
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			};

			return {
				value: jwt.sign(userForToken, JWT_SECRET),
			};
		},

		editAuthor: async (root, args, context) => {
			const currentUser = context.currentUser;

			if (!currentUser) {
				throw new AuthenticationError("not authenticated");
			}

			try {
				const updatedAuthor = await Author.findOneAndUpdate(
					{ name: args.name },
					{ born: args.setBornTo },
					{ new: true }
				);
				return updatedAuthor;
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			}
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const auth = req ? req.headers.authorization : null;
		if (auth && auth.toLowerCase().startsWith("bearer ")) {
			const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
			const currentUser = await User.findById(decodedToken.id);
			return { currentUser };
		}
	},
});

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
