const express = require("express");
const bodyParser = require("body-parser");

const hostname = "0.0.0.0";
const port = process.env.PORT || 3000;

const users = require("./models/users")();
const usersController = require("./controllers/users")();
const projectsController = require("./controllers/projects")();
const issuesController = require("./controllers/issues")();
const commentsController = require("./controllers/comments")();

const app = (module.exports = express());

// logging
app.use(async (req, res, next) => {
	const FailedAuthMessage = {
		// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401
		error: "Failed Authentication",
		message: "Go away!",
		code: "xxx", // Some useful error code
	};
	const suppliedKey = req.headers["x-api-key"];
	const clientIp =
		req.headers["x-forwarded-for"] || req.connection.remoteAddress;
	// Check Pre-shared key
	if (!suppliedKey) {
		console.log(
			" [%s] FAILED AUTHENTICATION -- %s, No Key Supplied",
			new Date(),
			clientIp
		);
		FailedAuthMessage.code = "01";
		return res.status(401).json(FailedAuthMessage);
	}
	const user = await users.getByKey(suppliedKey);
	if (!user) {
		console.log(
			" [%s] FAILED AUTHENTICATION -- %s, BAD Key Supplied",
			new Date(),
			clientIp
		);
		FailedAuthMessage.code = "02";
		return res.status(401).json(FailedAuthMessage);
	}
	next();
});

app.use(bodyParser.json());

// Users functions
app.get("/users", usersController.getController); // Get all users
app.get("/users/:email", usersController.getById); // Get an user
app.post("/users", usersController.postController); // Add a user

// Projects fuctions
app.get("/projects", projectsController.getController); // Get all projects
app.get("/projects/:slug", projectsController.getById); // Get a project
app.get("/projects/:slug/issues", projectsController.populatedController); // Get all issues for a project
app.post("/projects", projectsController.postController); // Add a user
app.post("/projects/:slug/issues", issuesController.postController); // Add new issues to a project individually

// Issues functions
app.get("/issues", issuesController.getController); // Get all issues
app.get("/issues/:slug", issuesController.getIndividualIssue); // Get individual issues
app.get(
	"/issues/:issueNumber/comments",
	issuesController.aggregateWithComments
); // Get all comments for an issue
app.post("/issues/:issueNumber/comments", commentsController.postController); // Add a new comment to an Issue

// Comments fuctions
app.get("/comments", commentsController.getController); // Get all comments
app.get("/comments/:email", commentsController.getCommentsForAuthor); // Get all comments for an author
//app.get("/issues/:slug/comments/id", issuesController.)

app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

// 404
app.use((req, res) => {
	res.status(404).json({
		error: 404,
		message: "Route not found",
	});
});
