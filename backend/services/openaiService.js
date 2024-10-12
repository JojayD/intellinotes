const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
const apiUrl = "https://api.openai.com/v1/chat/completions";

const getChatGPTResponse = async (prompt) => {
	try {
		const completion = await axios.post(
			apiUrl,
			{
				model: "gpt-4o-mini",
				messages: [
					{ role: "system", content: "You are a helpful assistant." },
					{ role: "user", content: prompt },
				],
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${apiKey}`,
				},
			}
		);

		return completion.data.choices[0].message.content.trim();
	} catch (error) {
		throw new Error("Error fetching ChatGPT response");
	}
};

module.exports = { getChatGPTResponse };
