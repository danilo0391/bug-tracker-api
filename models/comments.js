const db = require("../db")();
const COLLECTION = "comments";

module.exports = () => {
	const get = async (email = null) => {
		console.log("  insede comments model");
		if (!email) {
			try {
				const comments = await db.get(COLLECTION);
				return { commentsList: comments };
			} catch (ex) {
				console.log(" -------------------COMMENTS GET ERROR");
				return { error: ex };
			}
		}
		try {
			const oneComment = await db.get(COLLECTION, { author: email });
			return { commentsList: oneComment };
		} catch (ex) {
			console.log(" -------------------COMMENTS GET ERROR");
			return { error: ex };
		}
	};

	const add = async (issueNumber, text, author) => {
		const COLLECTION_ISSUES = "issues";
		console.log(COLLECTION_ISSUES);
		const issues_array = await db.get(COLLECTION_ISSUES, { issueNumber });
		console.log(issues_array);
		const issue_id = issues_array[0]._id;
		console.log(issue_id);
		const count = await db.count(COLLECTION);
		try {
			const result = await db.add(COLLECTION, {
				id: count + 1,
				text: text,
				author: author,
				issue_id: issue_id,
			});
			return result.result;
		} catch (ex) {
			console.log(" -------------------COMMENTS ADD ERROR");
			return { error: ex };
		}
	};

	return {
		get,
		add,
	};
};
