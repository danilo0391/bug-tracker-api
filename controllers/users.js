const users = require("../models/users.js")();

module.exports = () => {
	const getController = async (req, res) => {
		try {
			const { usersList, error } = res.json(await users.get());
			if (error) {
				return res.status(500).json({ error });
			}

			res.json({ users: usersList });
		} catch (ex) {
			console.log("=== Exception users::getController ===");
			console.log(ex);
			return null;
		}
	};

	const getById = async (req, res) => {
		try {
			const { usersList, error } = res.json(await users.get(req.params.email));
			if (error) {
				return res.status(500).json({ error });
			}

			res.json({ users: usersList });
		} catch (ex) {
			console.log("=== Exception users::getById ===");
			console.log(ex);
			return null;
		}
	};

	const postController = async (req, res) => {
		const name = req.body.name;
		const email = req.body.email;
		const userType = req.body.userType;
		const key = req.body.key;
		try {
			const result = await users.add(name, email, userType, key);

			if (error) {
				return res.status(500).json({ error });
			}
			res.json(result);
		} catch (ex) {
			console.log("=== Exception users::postController ===");
			console.log(ex);
			return null;
		}
	};

	return {
		getController,
		postController,
		getById,
	};
};
