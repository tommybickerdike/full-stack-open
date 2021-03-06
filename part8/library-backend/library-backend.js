const {
	ApolloServer,
	UserInputError,
	AuthenticationError,
	gql,
} = require("apollo-server");
require("dotenv").config();
const DataLoader = require("dataloader");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");

const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const pubsub = new PubSub();

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

mongoose.set("debug", true);

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
	type Subscription {
		bookAdded: Book!
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
		allAuthors: async () => {
			const basicAuthors = await Author.find({});
			const books = await Book.find({});

			const authorLoader = new DataLoader((keys) => {
				const result = keys.map((authorId) => {
					const quant = books.filter((book) => {
						return JSON.stringify(book.author) === JSON.stringify(authorId);
					});
					return quant.length;
				});
				return Promise.resolve(result);
			});

			const booksCount = await authorLoader.loadMany(
				basicAuthors.map((author) => author._id)
			);

			return basicAuthors.map((author, index) => {
				return { ...author._doc, bookCount: booksCount[index] };
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

			pubsub.publish("BOOK_ADDED", { bookAdded: newBook });
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
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
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

server.listen().then(({ url, subscriptionsUrl }) => {
	console.log(`Server ready at ${url}`);
	console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
