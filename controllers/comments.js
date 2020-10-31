const comments = require("../models/comments.js")();

module.exports = () => {
	const getController = async (req, res) => {
		res.json(await comments.get());
	};

	const getCommentsForAuthor = async (req, res) => {
		res.json(await comments.get(req.params.email));
	};

	const postController = async (req, res) => {
		const issueNumber = req.params.issueNumber;
		const text = req.body.text;
		const author = req.body.author;
		const result = await comments.add(issueNumber, text, author);
		res.json(result);
	};

	return {
		getController,
		getCommentsForAuthor,
		postController,
	};
};
