// Import and Initialize OpenAI Library
const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config({ path: require('path').resolve(__dirname, '../../.env') });  // Make sure the path is correct

console.log("OpenAI API Key:", process.env.OPENAI_API_KEY);
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

// Function to get response from OpenAI
const getChatGPTResponse = async (prompt) => {
	try {
		const completion = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [
				{ role: "system", content: "You are a helpful assistant." },
				{ role: "user", content: prompt },
			],
		});

		return completion.choices[0].message.content;
	} catch (error) {
		console.error("Error fetching ChatGPT response:", error.message);
		throw new Error("Error fetching ChatGPT response");
	}
};

// Example usage
(async () => {
	const response = await getChatGPTResponse(
		"Write a haiku about recursion in programming."
	);
	console.log(response);
})();
