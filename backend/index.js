const express = require("express");
const openaiRoutes = require("./routes/openaiRoutes");
const authRoutes = require("../backend/routes/openaiRoutes"); // Import auth routes
const app = express();
const port = 3000;

app.use(express.json());
app.use("/api", openaiRoutes);
app.use("/auth", authRoutes); // Use auth routes

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.
app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});

console.log("Hello, World!");
