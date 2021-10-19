const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
});

blogSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;

		returnedObject.likes === undefined
			? (returnedObject.likes = 0)
			: returnedObject.likes;
	},
});

module.exports = mongoose.model("Blog", blogSchema);
