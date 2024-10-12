const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config({ path: require('path').resolve(__dirname, '../../.env') });  // Ensure the path is correct

const TWELVELABS_API_URL = 'https://api.twelvelabs.io/insights'; // Replace with the actual API endpoint from Twelve Labs
const TWELVELABS_API_KEY = process.env.TWELVELABS_API_KEY;

const createIndex = async (indexName) => {
  try {
    const response = await axios.post(
      `${TWELVELABS_API_URL}/indexes`, // Replace with the actual endpoint for creating an index
      {
        name: indexName,
        engines: [
          {
            name: "marengo2.6",
            options: ["visual", "conversation", "text_in_video"],
          },
        ],
        addons: ["thumbnail"],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TWELVELABS_API_KEY}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(`Error creating index: ${error.message}`);
  }
};

const getVideoInsights = async (videoUrl) => {
  // Your existing getVideoInsights function implementation
};

module.exports = { createIndex, getVideoInsights };