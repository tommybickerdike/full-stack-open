import express from "express";
const app = express();

app.get("/hello", (req, res) => {
	console.log(req.method, req.url, 200);
	res.send("Hello Full Stack!");
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
