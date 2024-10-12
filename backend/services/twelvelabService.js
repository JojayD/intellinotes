const dotenv = require("dotenv");
const { TwelveLabsClient } = require('twelvelabs'); // Require the Twelve Labs client
dotenv.config({ path: require('path').resolve(__dirname, '../../.env') });  // Make sure the path is correct
const client = new TwelveLabsClient({ apiKey: process.env.TWELVELABS_API_KEY });

// const url = "https://api.twelvelabs.io/v1.2/summarize";


const createIndex = async (indexName) => {
	try {
		const createdIndex = await client.index.create({
			name: indexName,
			engines: [
				{
					name: "marengo2.6",
					options: ["visual", "conversation", "text_in_video"],
				},
			],
			addons: ["thumbnail"],
		});

		return createdIndex;
	} catch (error) {
		throw new Error(`Error creating index: ${error.message}`);
	}
};

module.exports = { createIndex };