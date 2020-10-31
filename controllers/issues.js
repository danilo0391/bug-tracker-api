const issues = require("../models/issues.js")();

module.exports = () => {
	const getController = async (req, res) => {
		res.json(await issues.get());
	};

	const getIndividualIssue = async (req, res) => {
		res.json(await issues.get(req.params.slug));
	};

	const aggregateWithComments = async (req, res) => {
		res.json(await issues.aggregateWithComments(req.params.issueNumber));
	};

	const postController = async (req, res) => {
		const slug = req.params.slug;
		const title = req.body.title;
		const description = req.body.description;
		const result = await issues.add(slug, title, description);
		res.json(result);
	};

	return {
		getController,
		postController,
		getIndividualIssue,
		aggregateWithComments,
	};
};
