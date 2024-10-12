const { createIndex } = require('../services/twelvelabService');

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
    console.error('Error creating index:', error);
    res.status(500).json({ error: 'Failed to create index' });
  }
};

module.exports = { createIndexController };