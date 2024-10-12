const { getChatGPTResponse } = require("../services/openaiService");
 
const getResponse = async (req, res) => {
	const prompt = req.query.prompt;
	try {
		const response = await getChatGPTResponse(prompt);
		res.json({ response });
	} catch (error) {
		res.status(500).json({ error: "Failed to get response from OpenAI" });
	}
};

module.exports = { getResponse };
