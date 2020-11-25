const comments = require("../models/comments.js")();

module.exports = () => {
	const getController = async (req, res) => {
		try {
			const { commentsList, error } = res.json(await comments.get());
			if (error) {
				return res.status(500).json({ error });
			}
			res.json({ comments: commentsList });
		} catch (ex) {
			console.log("=== Exception comments::getController ===");
			console.log(ex);
			return null;
		}
	};

	const getCommentsForAuthor = async (req, res) => {
		try {
			const { commentsList, error } = res.json(
				await comments.get(req.params.email)
			);
			if (error) {
				return res.status(500).json({ error });
			}
			res.json({ comments: commentsList });
		} catch (ex) {
			console.log("=== Exception comments::getCommentsForAuthor ===");
			console.log(ex);
			return null;
		}
	};

	const postController = async (req, res) => {
		const issueNumber = req.params.issueNumber;
		const text = req.body.text;
		const author = req.body.author;
		try {
			const { commentsList, error } = await comments.add(
				issueNumber,
				text,
				author
			);
			if (error) {
				return res.status(500).json({ error });
			}
			res.json({ comments: commentsList });
		} catch (ex) {
			console.log("=== Exception comments::postController ===");
			console.log(ex);
			return null;
		}
	};

	return {
		getController,
		getCommentsForAuthor,
		postController,
	};
};
