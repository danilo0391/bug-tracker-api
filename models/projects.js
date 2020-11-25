const db = require("../db")();
const COLLECTION = "projects";

module.exports = () => {
	const get = async (slug = null) => {
		console.log(" inside projects model");
		if (!slug) {
			try {
				const projects = await db.get(COLLECTION);
				return { projectsList: projects };
			} catch (ex) {
				console.log(" -------------------PROJECTS GET ERROR");
				return { error: ex };
			}
		}

		try {
			const projects = await db.get(COLLECTION, { slug });
			return { projectsList: projects };
		} catch (ex) {
			console.log(" -------------------PROJECTS GET ERROR");
			return { error: ex };
		}
	};

	const add = async (slug, name, description) => {
		try {
			const results = await db.add(COLLECTION, {
				slug: slug,
				name: name,
				description: description,
			});
			return results.result;
		} catch (ex) {
			console.log(" -------------------PROJECTS ADD ERROR");
			return { error: ex };
		}
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

		try {
			const projects = await db.aggregate(COLLECTION, LOOKUP_ISSUES_PIPELINE);
			console.log(projects);
			return { projectsList: projects };
		} catch (ex) {
			console.log(" -------------------PROJECTS AGGREGATEWITHISSUES ERROR");
			return { error: ex };
		}
	};

	const updateStatuts = async (status) => {
		try {
			const results = await db.add(COLLECTION, {
				slug: slug,
				issue: issue,
				issueId: issueId,
				status: status,
			});

			return results.result;
		} catch (ex) {
			console.log(" -------------------PROJECTS UPDATESTATUS ERROR");
			return { error: ex };
		}
	};

	return {
		get,
		add,
		aggregateWithIssues,
		updateStatuts,
	};
};
