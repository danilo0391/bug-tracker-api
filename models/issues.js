const db = require("../db")();
const COLLECTION = "issues";

module.exports = () => {
	const get = async (issueNumber = null) => {
		console.log(" inside issues model");
		if (!issueNumber) {
			try {
				const issues = await db.get(COLLECTION);
				return { issuesList: issues };
			} catch (ex) {
				console.log(" -------------------ISSUES GET ERROR");
				return { error: ex };
			}
		}
		try {
			const anIssue = await db.get(COLLECTION, { issueNumber });
			return { issuesList: anIssue };
		} catch (ex) {
			console.log(" -------------------ANISSUES GET ERROR");
			return { error: ex };
		}
	};

	const add = async (slug, title, description) => {
		const status = "open";

		const COLLECTION_PROJECT = "projects";
		const project_array = await db.get(COLLECTION_PROJECT, { slug });
		const project_id = project_array[0]._id;
		const count_var = await db.count(COLLECTION, { project_id });
		const next = slug + "-" + (count_var + 1);

		try {
			const results = await db.add(COLLECTION, {
				issueNumber: next,
				title: title,
				description: description,
				status: status,
				project_id: project_id,
			});
			return results.results;
		} catch (ex) {
			console.log(" -------------------ISSUES ADD ERROR");
			return { error: ex };
		}
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

		try {
			const issues = await db.aggregate(COLLECTION, LOOKUP_COMMENTS_PIPELINE);
			console.log(issues);
			return { issuesList: issues };
		} catch (ex) {
			console.log(" -------------------ISSUES AggregateWithComments ERROR");
			return { error: ex };
		}
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
		try {
			const issues = await db.aggregate(COLLECTION, LOOKUP_COMMENTS_PIPELINE);
			console.log(issues);
			return { issuesList: issues };
		} catch (ex) {
			console.log(" -------------------ISSUES AggregateWithCommentsById ERROR");
			return { error: ex };
		}
	};

	return {
		get,
		add,
		aggregateWithComments,
		aggregateWithCommentsById,
	};
};
