require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const { TwelveLabs } = require('twelvelabs-js');
const { firestore } = require("../firebase/firebaseAdmin"); // Import Firestore admin

// Save note to Firestore under the user's document
const saveNoteToFirestore = async (userId, videoId, content) => {
  const userDocRef = firestore.collection("users").doc(userId); // Reference to the user's document
  const newNote = {
    videoId,
    title: `Notes from ${videoId}`,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Store the note in a sub-collection "notes" within the user's document
  await userDocRef.collection("notes").add(newNote);
};

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
    let index = await getIndexByName(indexName);
    if (index) {
      console.log(`Index exists: id=${index.id}, name=${indexName}`);
      return index.id;
    }

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

// Function to upload a video
const uploadVideo = async (indexId, filePath) => {
  try {
    console.log(`Uploading video at path: ${filePath}`);
    const task = await client.task.create({
      indexId,
      file: filePath,
    });

    console.log(`Created task: id=${task.id}`);
    await task.waitForDone(5000, (task) => {
      console.log(`  Status=${task.status}`);
    });

    if (task.status !== 'ready') {
      throw new Error(`Indexing failed with status ${task.status}`);
    }

    console.log(`Uploaded video. The unique identifier of your video is ${task.videoId}`);
    return task.videoId;
  } catch (error) {
    if (error.message.includes('does not exist in index collection')) {
      console.log('Index does not exist, creating a new one...');
      const indexName = `user_${indexId}_index`;
      const newIndexId = await createOrGetIndex(indexName);

      console.log(`Retrying upload with new index id=${newIndexId}`);
      return await uploadVideo(newIndexId, filePath);
    } else {
      throw new Error(`Error uploading video: ${error.message}`);
    }
  }
};

// Function to generate open-ended text (custom prompt)
const getVideoInsights = async (videoId, userId) => {
  try {
    console.log(`Generating open-ended text for video ID: ${videoId}`);
    
    const prompt = "Imagine you're a student taking notes from this lecture video. Write down everything important that you need to know.";
    const textData = await client.generate.text(videoId, prompt);
    const text = textData.data;

    console.log("Open-ended Text:", text);

    // Save the notes in Firebase under the user's document
    await saveNoteToFirestore(userId, videoId, text);

    return {
      openEndedText: text,
    };
  } catch (error) {
    throw new Error(`Error generating video insights: ${error.message}`);
  }
};

module.exports = {
  createOrGetIndex,
  uploadVideo,
  getVideoInsights,
};
