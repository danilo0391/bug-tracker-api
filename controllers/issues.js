const issues = require("../models/issues.js")();

module.exports = () => {
	const getController = async (req, res) => {
		try {
			const { issuesList, error } = res.json(await issues.get());
			if (error) {
				return res.status(500).json({ error });
			}
			res.json({ issues: issuesList });
		} catch (ex) {
			console.log("=== Exception issues::getController ===");
			console.log(ex);
			return null;
		}
	};

	const getIndividualIssue = async (req, res) => {
		try {
			const { issuesList, error } = res.json(await issues.get(req.params.slug));
			if (error) {
				return res.status(500).json({ error });
			}
			res.json({ issues: issuesList });
		} catch (ex) {
			console.log("=== Exception issues::getIndividualIssue ===");
			console.log(ex);
			return null;
		}
	};

	const aggregateWithComments = async (req, res) => {
		const { issuesList, error } = res.json(
			await issues.aggregateWithComments(req.params.issueNumber)
		);

		if (error) {
			return res.status(500).json({ error });
		}
		res.json({ issues: issuesList });
	};

	const postController = async (req, res) => {
		const slug = req.params.slug;
		const title = req.body.title;
		const description = req.body.description;
		try {
			const { issuesList, error } = await issues.add(slug, title, description);
			if (error) {
				return res.status(500).json({ error });
			}
			res.json({ issues: issuesList });
		} catch (ex) {
			console.log("=== Exception users::getById ===");
			console.log(ex);
			return null;
		}
	};

	return {
		getController,
		postController,
		getIndividualIssue,
		aggregateWithComments,
	};
};
