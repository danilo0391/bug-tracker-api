const uri = process.env.MONGO_URI;
console.log(uri);
const MongoClient = require("mongodb").MongoClient;
const DB_NAME = "bug-tracker-api";
const MONGO_OPTIONS = { useUnifiedTopology: true, useNewUrlParser: true };
module.exports = () => {
	const count = (collectionName, query = {}) => {
		return new Promise((resolve, reject) => {
			MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
				if (err) {
					console.log(err);
					return reject("=== count::MongoClient.connect");
				}
				const db = client.db(DB_NAME);
				const collection = db.collection(collectionName);
				collection.find(query).count((err, docs) => {
					if (err) {
						console.log(err);
						return reject("=== find::MongoClient.connect");
					}
					resolve(docs);
					client.close();
				});
			});
		});
	};

	const get = (collectionName, query = {}) => {
		return new Promise((resolve, reject) => {
			MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
				if (err) {
					console.log(err);
					return reject("=== get::MongoClient.connect");
				}
				const db = client.db(DB_NAME);
				const collection = db.collection(collectionName);
				collection.find(query).toArray((err, docs) => {
					if (err) {
						console.log(err);
						return reject("=== find::MongoClient.connect");
					}
					resolve(docs);
					client.close();
				});
			});
		});
	};

	const add = (collectionName, item) => {
		return new Promise((resolve, reject) => {
			MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
				if (err) {
					console.log(err);
					return reject("=== add::MongoClient.connect");
				}
				const db = client.db(DB_NAME);
				const collection = db.collection(collectionName);
				collection.insertOne(item, (err, result) => {
					if (err) {
						console.log(err);
						return reject("=== insertOne::MongoClient.connect");
					}
					resolve(result);
				});
			});
		});
	};

	const aggregate = (collectionName, pipeline = []) => {
		return new Promise((resolve, reject) => {
			MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
				if (err) {
					console.log(err);
					return reject("=== aggregate::MongoClient.connect");
				}
				const db = client.db(DB_NAME);
				const collection = db.collection(collectionName);
				collection.aggregate(pipeline).toArray((err, docs) => {
					if (err) {
						console.log(err);
						return reject(" --- aggregate ERROR ---");
					}
					resolve(docs);
					client.close();
				});
			});
		});
	};

	return {
		count,
		get,
		add,
		aggregate,
	};
};
