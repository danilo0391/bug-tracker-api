const projects = require("../models/projects.js")();

module.exports = () => {
	const getController = async (req, res) => {
		res.json(await projects.get());
	};

	const getById = async (req, res) => {
		res.json(await projects.get(req.params.slug));
	};

	const postController = async (req, res) => {
		const slug = req.body.slug;
		const name = req.body.name;
		const description = req.body.description;
		const result = await projects.add(slug, name, description);
		res.json(result);
	};

	const populatedController = async (req, res) => {
		res.json(await projects.aggregateWithIssues(req.params.slug));
	};

	const updateStatus = async (req, res) => {
		const slug = req.params.slug;
		const issue = req.params.issue;
		const issueid = req.params.issueid;
		const status = req.params.status;
		const result = await projects.add(slu, issue, issueid, status);
		res.json(result);
	};

	return {
		getController,
		postController,
		getById,
		populatedController,
		updateStatus,
	};
};
