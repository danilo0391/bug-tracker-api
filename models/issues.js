const db = require("../db")();
const COLLECTION = "issues";

module.exports = () => {
	const get = async (issueNumber = null) => {
		console.log(issueNumber);
		console.log(" inside issues model");
		if (!issueNumber) {
			const issues = await db.get(COLLECTION);
			return issues;
		}
		const anIssue = await db.get(COLLECTION, { issueNumber });
		return anIssue;
	};

	const add = async (slug, title, description) => {
		const status = "open";

		const COLLECTION_PROJECT = "projects";
		const project_array = await db.get(COLLECTION_PROJECT, { slug });
		const project_id = project_array[0]._id;
		const count_var = await db.count(COLLECTION, { project_id });
		const next = slug + "-" + (count_var + 1);

		const results = await db.add(COLLECTION, {
			issueNumber: next,
			title: title,
			description: description,
			status: status,
			project_id: project_id,
		});
		return results.results;
	};

	const aggregateWithComments = async (issueNumber) => {
		const LOOKUP_COMMENTS_PIPELINE = [
			{
				$match: {
					issueNumber: issueNumber,
				},
			},
			{
				$lookup: {
					from: "comments",
					localField: "_id",
					foreignField: "issue_id",
					as: "comments",
				},
			},
		];
		console.log(LOOKUP_COMMENTS_PIPELINE);
		const issues = await db.aggregate(COLLECTION, LOOKUP_COMMENTS_PIPELINE);
		console.log(issues);
		return issues;
	};

	const aggregateWithCommentsById = async (issueNumber) => {
		const LOOKUP_COMMENTS_PIPELINE = [
			{
				$match: {
					issueNumber: issueNumber,
				},
			},
			{
				$lookup: {
					from: "comments",
					localField: "_id",
					foreignField: "issue_id",
					as: "comments",
				},
			},
		];
		console.log(LOOKUP_COMMENTS_PIPELINE);
		const issues = await db.aggregate(COLLECTION, LOOKUP_COMMENTS_PIPELINE);
		console.log(issues);
		return issues;
	};

	return {
		get,
		add,
		aggregateWithComments,
	};
};
