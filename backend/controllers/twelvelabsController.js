const { createIndex } = require("../services/twelvelabService");
const { retrieveListIndex } = require("../services/twelvelabService");
const createIndexController = async (req, res) => {
	const { indexName } = req.body;
	try {
		const createdIndex = await createIndex(indexName);

		console.log(`ID: ${createdIndex.id}`);
		console.log(`Name: ${createdIndex.name}`);
		console.log("Engines:");
		createdIndex.engines.forEach((engine, index) => {
			console.log(`  Engine ${index + 1}:`);
			console.log(`    Name: ${engine.name}`);
			console.log(`    Options: ${JSON.stringify(engine.options)}`);
		});
		console.log(`Video count: ${createdIndex.videoCount}`);
		console.log(`Total duration: ${createdIndex.totalDuration} seconds`);
		console.log(`Created at: ${createdIndex.createdAt}`);
		if (createdIndex.updatedAt) {
			console.log(`Updated at: ${createdIndex.updatedAt}`);
		}

		res.json(createdIndex); // Send the created index as a response
	} catch (error) {
		console.error("Error creating index:", error);
		res.status(500).json({ error: "Failed to create index" });
	}
};

const retrieveIndexController = async (index_name) => {
	try {
		const indexes = await retrieveListIndex();
		const dataArray = indexes.data;
		console.log(dataArray);

		if (!dataArray) {
			console.log("No indexes found");
		} else {
			dataArray.forEach((index) => {
				console.log(`ID: ${index._id}`);
				console.log(`Name: ${index.index_name}`);
				console.log("Engines:");
				console.log(`Video count: ${index.video_count}`);
				console.log(`Total duration: ${index.total_duration} seconds`);
				console.log(`Created at: ${index.created_at}`);
				if (index.updatedAt) {
					console.log(`Updated at: ${index.expires_at}`);
				}
			});
		}
	} catch (error) {
		console.error("Error retrieving indexes:", error);
		indexes.status(500).json({ error: "Failed to retrieve indexes" });
	}
};


module.exports = { createIndexController, retrieveIndexController };
