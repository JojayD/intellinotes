const express = require("express");
const openaiRoutes = require("./routes/openaiRoutes");
const authRoutes = require("../backend/routes/openaiRoutes"); // Import auth routes
const app = express();
const port = 3001;
const twelvelabsRoutes = require("./routes/twelvelabsRoutes"); // Import Twelve Labs routes
app.use(express.json());
app.use("/twelvelabsAPI", twelvelabsRoutes); // Use Twelve Labs routes
app.use("/openAiAPI", openaiRoutes);
app.use("/auth", authRoutes); // Use auth routes

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});

app.get("/", (req, res) => {
	
});

console.log("Hello, World!");