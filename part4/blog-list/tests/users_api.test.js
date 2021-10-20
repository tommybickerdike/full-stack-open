const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
const helper = require("./test_helper");

beforeEach(async () => {
	await User.deleteMany({});

	for (let user of helper.initialUsers) {
		let userObject = new User(user);
		await userObject.save();
	}
});

describe("general user api calls", () => {
	test("users are returned as json", async () => {
		await api
			.get("/api/users")
			.expect(200)
			.expect("Content-Type", /application\/json/);
	}, 1500);

	test("can create a user", async () => {
		const newUser = {
			username: "asdasd",
			name: "Joe Bloggs",
			password: "sadasdas",
		};
		await api.post("/api/users").send(newUser).expect(201);
		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1);
		expect(usersAtEnd.slice(-1)[0].username).toEqual(newUser.username);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
