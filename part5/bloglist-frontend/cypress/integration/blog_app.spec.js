describe("Blog app", function () {
	beforeEach(function () {
		cy.request("POST", "http://localhost:3003/api/testing/reset");
		const user = {
			name: "Matti Luukkainen",
			username: "mluukkai",
			password: "salainen",
		};
		cy.request("POST", "http://localhost:3003/api/users/", user);
		cy.visit("http://localhost:3000");
	});

	it("Login form is shown", function () {
		cy.get("html").should("contain", "Login").and("not.contain", "Logged in");
	});

	describe("Login", function () {
		it("succeeds with correct credentials", function () {
			cy.contains("Login").click();
			cy.get("#username").type("mluukkai");
			cy.get("#password").type("salainen");
			cy.get("#login-button").click();

			cy.get("html")
				.should("contain", "Matti Luukkainen logged in")
				.and("not.contain", "wrong username or password");
		});

		it("fails with wrong credentials", function () {
			cy.contains("Login").click();
			cy.get("#username").type("mluukkai");
			cy.get("#password").type("badpass");
			cy.get("#login-button").click();

			cy.get("#notification")
				.should("contain", "wrong username or password")
				.and("have.css", "background-color", "rgb(255, 0, 0)")
				.and("not.contain", "logged in");
		});
	});
});
