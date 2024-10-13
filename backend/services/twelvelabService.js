require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const { TwelveLabs } = require('twelvelabs-js');

const TWELVELABS_API_KEY = process.env.TWELVELABS_API_KEY;

// Initialize the TwelveLabs client
const client = new TwelveLabs({ apiKey: TWELVELABS_API_KEY });

// Function to get an index by name
const getIndexByName = async (indexName) => {
  try {
    const indexes = await client.index.list();
    const index = indexes.find((idx) => idx.name === indexName);
    return index || null; // Return the index object if found, else null
  } catch (error) {
    throw new Error(`Error retrieving index: ${error.message}`);
  }
};

// Function to create or get an index
const createOrGetIndex = async (indexName) => {
  try {
    // Try to get the index by name
    let index = await getIndexByName(indexName);
    if (index) {
      console.log(`Index exists: id=${index.id}, name=${indexName}`);
      return index.id;
    }

    // If not found, create a new index
    const newIndex = await client.index.create({
      name: indexName,
      engines: [
        {
          name: 'pegasus1.1',
          options: ['visual', 'conversation'], // Adjust options as needed
        },
      ],
      addons: ['thumbnail'],
    });

    console.log(
      `Created new index: id=${newIndex.id}, name=${newIndex.name}, engines=${JSON.stringify(newIndex.engines)}`
    );

    return newIndex.id;
  } catch (error) {
    throw new Error(`Error creating or retrieving index: ${error.message}`);
  }
};

// Function to upload a video, retrying if the index doesn't exist
const uploadVideo = async (indexId, filePath) => {
  try {
    console.log(`Uploading video at path: ${filePath}`);
    const task = await client.task.create({
      indexId,
      file: filePath,
    });

    console.log(`Created task: id=${task.id}`);
    await task.waitForDone(300, (task) => {
      console.log(`  Status=${task.status}`);
    });

    if (task.status !== 'ready') {
      throw new Error(`Indexing failed with status ${task.status}`);
    }

    console.log(`Uploaded video. The unique identifier of your video is ${task.videoId}`);
    return task.videoId;
  } catch (error) {
    // If the index does not exist, attempt to create a new one and retry the upload
    if (error.message.includes('does not exist in index collection')) {
      console.log('Index does not exist, creating a new one...');
      const indexName = `user_${indexId}_index`; // Assuming indexId is part of the name
      const newIndexId = await createOrGetIndex(indexName);

      console.log(`Retrying upload with new index id=${newIndexId}`);
      return await uploadVideo(newIndexId, filePath); // Retry with the new index
    } else {
      throw new Error(`Error uploading video: ${error.message}`);
    }
  }
};

// Function to generate insights from a video
const getVideoInsights = async (videoId) => {
  try {
    console.log(`Generating insights for video ID: ${videoId}`);

    // Generate gist
    const gist = await client.generate.gist(videoId, ['title', 'topic', 'hashtag']);
    console.log(`Title: ${gist.title}\nTopics: ${gist.topics}\nHashtags: ${gist.hashtags}`);

    // Generate summary
    const summary = await client.generate.summarize(videoId, 'summary');
    console.log(`Summary: ${summary.summary}`);

    // Generate chapters
    console.log('Chapters:');
    const chaptersData = await client.generate.summarize(videoId, 'chapter');
    const chapters = chaptersData.chapters.map((chapter) => ({
      chapterNumber: chapter.chapterNumber,
      chapterTitle: chapter.chapterTitle,
      chapterSummary: chapter.chapterSummary,
      start: chapter.start,
      end: chapter.end,
    }));

    // Generate highlights
    console.log('Highlights:');
    const highlightsData = await client.generate.summarize(videoId, 'highlight');
    const highlights = highlightsData.highlights.map((highlight) => ({
      highlight: highlight.highlight,
      start: highlight.start,
      end: highlight.end,
    }));

    // Generate open-ended text
    const textData = await client.generate.text(videoId, 'What happened?');
    const text = textData.data;

    // Compile all insights
    const insights = {
      gist,
      summary: summary.summary,
      chapters,
      highlights,
      openEndedText: text,
    };

    return insights;
  } catch (error) {
    throw new Error(`Error generating video insights: ${error.message}`);
  }
};

module.exports = {
  createOrGetIndex,
  uploadVideo,
  getVideoInsights,
};