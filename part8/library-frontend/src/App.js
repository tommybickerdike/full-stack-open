import React, { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import Recommended from "./components/Recommended";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { useApolloClient, useQuery } from "@apollo/client";
import { ME } from "./queries";

const Notify = ({ errorMessage }) => {
	if (!errorMessage) {
		return null;
	}

	return <div style={{ color: "grey" }}>{errorMessage}</div>;
};

const App = () => {
	const [errorMessage, setErrorMessage] = useState(null);
	const [page, setPage] = useState("authors");
	const [token, setToken] = useState(null);
	const client = useApolloClient();

	const me = useQuery(ME);
	const favoriteGenre = me.data?.me?.favoriteGenre;

	const notify = (message) => {
		setErrorMessage(message);
		setTimeout(() => {
			setErrorMessage(null);
		}, 5000);
	};

	const logOut = () => {
		setToken(null);
		localStorage.clear();
		client.resetStore();
		setPage("authors");
	};

	return (
		<div>
			<div>
				<button onClick={() => setPage("authors")}>authors</button>
				<button onClick={() => setPage("books")}>books</button>
				{token ? (
					<>
						<button onClick={() => setPage("add")}>add book</button>
						<button onClick={() => setPage("recommended")}>recommended</button>
						<button onClick={logOut}>logout</button>
					</>
				) : (
					<button onClick={() => setPage("login")}>login</button>
				)}
			</div>

			<Authors show={page === "authors"} setError={notify} />

			<Books show={page === "books"} />

			<Recommended
				show={page === "recommended"}
				favoriteGenre={favoriteGenre}
			/>

			<NewBook
				show={page === "add"}
				setError={notify}
				favoriteGenre={favoriteGenre}
			/>

			<Login show={page === "login"} setError={notify} setToken={setToken} />

			<Notify errorMessage={errorMessage} />
		</div>
	);
};

export default App;
