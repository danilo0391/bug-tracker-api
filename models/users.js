const db = require("../db")();
const COLLECTION = "users";

module.exports = () => {
	const getByKey = async (key) => {
		if (!key) {
			console.log(" 01: Missing key");
			return null;
		}
		try {
			const users = await db.get(COLLECTION, { key });
			if (users.length !== 1) {
				console.log(" 02: Bad key");
				return null;
			}
			return users[0];
		} catch (ex) {
			console.log("=== Exception users::getByKey ===");
			console.log(ex);
			return null;
		}
	};

	const get = async (email = null) => {
		console.log(" inside users model");
		if (!email) {
			try {
				const users = await db.get(COLLECTION);
				return { usersList: users };
			} catch (ex) {
				console.log(" -------------------USERS GET ERROR");
				return { error: ex };
			}
		}

		try {
			const users = await db.get(COLLECTION, { email });
			return { userList: users };
		} catch (error) {
			console.log(" -------------------USERS GET ERROR");
			return { error: ex };
		}
	};

	const add = async (name, email, userType, key) => {
		//const usersCount = await db.count(COLLECTION);
		try {
			const results = await db.add(COLLECTION, {
				//id: usersCount + 1,
				name: name,
				email: email,
				userType: userType,
				key: key,
			});

			return results.result;
		} catch (error) {
			console.log(" -------------------USERS ADD ERROR");
			return { error: ex };
		}
	};

	return {
		getByKey,
		get,
		add,
	};
};
