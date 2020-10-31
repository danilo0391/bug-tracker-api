const db = require("../db")();
const COLLECTION = "comments";

module.exports = () => {
	const get = async (email = null) => {
		console.log("  insede comments model");
		if (!email) {
			const comments = await db.get(COLLECTION);
			return comments;
		}

		const oneComment = await db.get(COLLECTION, { author: email });
		return oneComment;
	};

	const add = async (issueNumber, text, author) => {
		const COLLECTION_ISSUES = "issues";
		console.log(COLLECTION_ISSUES);
		const issues_array = await db.get(COLLECTION_ISSUES, { issueNumber });
		console.log(issues_array);
		const issue_id = issues_array[0]._id;
		console.log(issue_id);
		const count = await db.count(COLLECTION);

		const result = await db.add(COLLECTION, {
			id: count + 1,
			text: text,
			author: author,
			issue_id: issue_id,
		});

		return result.result;
	};

	return {
		get,
		add,
	};
};
