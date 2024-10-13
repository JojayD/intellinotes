const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config({ path: require("path").resolve(__dirname, "../../.env") }); // Ensure the path is correct

const TWELVELABS_API_URL = "https://api.twelvelabs.io/insights"; // Replace with the actual API endpoint from Twelve Labs
const TWELVELABS_API_KEY = process.env.TWELVELABS_API_KEY;

const fetch = require("node-fetch");
const createIndex = async (indexName) => {
	const url = "https://api.twelvelabs.io/v1.2/indexes";
	const options = {
		method: "POST",
		headers: {
			accept: "application/json",
			"x-api-key": process.env.TWELVELABS_API_KEY,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			index_name: indexName,
			engines: [
				{
					engine_options: ["visual", "text_in_video", "logo"],
					engine_name: "marengo2.6",
				},
			],
		}),
	};

	fetch(url, options)
		.then((res) => res.json())
		.then((json) => console.log(json))
		.catch((err) => console.error("error:" + err));
};

const retrieveListIndex = async ()=>{
  const fetch = require("node-fetch");

		const url =
			"https://api.twelvelabs.io/v1.2/indexes?page=1&page_limit=10&sort_by=created_at&sort_option=desc&engine_family=marengo";
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				"x-api-key": process.env.TWELVELABS_API_KEY,
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(url, options);
    const json = await response.json();
    return json;
    
    
    
}

retrieveListIndex();

module.exports = { createIndex, retrieveListIndex };
