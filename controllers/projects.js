const projects = require("../models/projects.js")();

module.exports = () => {
	const getController = async (req, res) => {
		try {
			const { projectsList, error } = res.json(await projects.get());
			if (error) {
				return res.status(500).json({ error });
			}

			res.json({ projects: projectsList });
		} catch (ex) {
			console.log("=== Exception projects::getController ===");
			console.log(ex);
			return null;
		}
	};

	const getById = async (req, res) => {
		try {
			const { projectsList, error } = res.json(
				await projects.get(req.params.slug)
			);
			if (error) {
				return res.status(500).json({ error });
			}
			res.json({ projects: projectsList });
		} catch (ex) {
			console.log("=== Exception projects::getById ===");
			console.log(ex);
			return null;
		}
	};

	const postController = async (req, res) => {
		const slug = req.body.slug;
		const name = req.body.name;
		const description = req.body.description;
		try {
			const { projectsList, error } = await projects.add(
				slug,
				name,
				description
			);
			if (error) {
				return res.status(500).json({ error });
			}
			res.json({ projects: projectsList });
		} catch (ex) {
			console.log("=== Exception users::getById ===");
			console.log(ex);
			return null;
		}
	};

	const populatedController = async (req, res) => {
		try {
			const { projectsList, error } = res.json(
				await projects.aggregateWithIssues(req.params.slug)
			);

			if (error) {
				return res.status(500).json({ error });
			}
			res.json({ projects: projectsList });
		} catch (ex) {
			console.log("=== Exception projects::populatedController ===");
			console.log(ex);
			return null;
		}
	};

	const updateStatus = async (req, res) => {
		const slug = req.params.slug;
		const issue = req.params.issue;
		const issueid = req.params.issueid;
		const status = req.params.status;
		try {
			const { projectsList, error } = await projects.add(
				slu,
				issue,
				issueid,
				status
			);
			if (error) {
				return res.status(500).json({ error });
			}
			res.json({ projects: projectsList });
		} catch (ex) {
			console.log("=== Exception projects::updateStatus ===");
			console.log(ex);
			return null;
		}
	};

	return {
		getController,
		postController,
		getById,
		populatedController,
		updateStatus,
	};
};
