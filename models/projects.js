const db = require("../db")();
const COLLECTION = "projects";

module.exports = () => {
	const get = async (slug = null) => {
		console.log(" inside projects model");
		if (!slug) {
			const projects = await db.get(COLLECTION);
			return projects;
		}
		const projects = await db.get(COLLECTION, { slug });
		return projects;
	};

	const add = async (slug, name, description) => {
		const results = await db.add(COLLECTION, {
			slug: slug,
			name: name,
			description: description,
		});
		return results.result;
	};

	const aggregateWithIssues = async (slug) => {
		console.log(slug);
		const LOOKUP_ISSUES_PIPELINE = [
			{
				$match: {
					slug: slug,
				},
			},
			{
				$lookup: {
					from: "issues",
					localField: "_id",
					foreignField: "project_id",
					as: "issues",
				},
			},
		];
		console.log(LOOKUP_ISSUES_PIPELINE);
		const projects = await db.aggregate(COLLECTION, LOOKUP_ISSUES_PIPELINE);
		console.log(projects);
		return projects;
	};

	const updateStatuts = async (status) => {
		const results = await db.add(COLLECTION, {
			slug: slug,
			issue: issue,
			issueId: issueId,
			status: status,
		});

		return results.result;
	};

	return {
		get,
		add,
		aggregateWithIssues,
		updateStatuts,
	};
};
