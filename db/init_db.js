const {
  client,
  createLink,
  createTag,
  getLinks,
  getTags,
  createLinkTags,
} = require("./index");

async function buildTables() {
  try {
    await client.connect();

    // drop tables in correct order
    console.log("Dropping All Tables...");
    await client.query(`
      DROP TABLE IF EXISTS link_tags;
      DROP TABLE IF EXISTS tags;
      DROP TABLE IF EXISTS links;`);
    console.log("Tables have been successfully dropped!");

    // build tables in correct order
    console.log("Starting to build tables...");
    await client.query(`CREATE TABLE links (
        id SERIAL PRIMARY KEY,
        url VARCHAR(255) NOT NULL,
        clickCount INT DEFAULT 0,
        comment VARCHAR(255) NOT NULL,
        date DATE DEFAULT CURRENT_DATE
      );
      CREATE TABLE tags (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL
      );
      CREATE TABLE link_tags (
        id SERIAL PRIMARY KEY,
        "linksId" INT REFERENCES links("id") NOT NULL,
        "tagsId" INT REFERENCES tags("id")  NOT NULL
      )`);
    console.log("Tables have been successfully built!");
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  console.log("Trying to build the links");
  try {
    const linksToCreate = [
      {
        url: "https://www.reddit.com/",
        comment: "The front page of the internet",
      },
      {
        url: "https://www.instagram.com/",
        comment: "A place to share photos with family and friends",
      },
      {
        url: "https://www.youtube.com/",
        comment:"The place to broadcast yourself"}
    ];
    const links = await Promise.all(linksToCreate.map(createLink));
    console.log("Test links", links);

    console.log("Finished creating links!");
  } catch (error) {
    console.error("Error creating links");
    throw error;
  }
}

async function populateInitialTagData() {
  console.log("Creating tags");
  try {
    const tagsToCreate = [
      {
        name: "Forums",
      },
      {
        name: "Photos",
      },
      {
        name: "Videos"
      }
    ];

    const tags = await Promise.all(tagsToCreate.map(createTag));
    console.log("Tags Created");
    console.log("Tags Created: ", tags);
    console.log("Finished creating tags!");
  } catch (error) {
    console.error("Error creating tags");
    throw error;
  }
}

async function populateInitialLinkTagsData() {
  console.log("Creating link_tags");
  try {
    const [redditLink, instagramLink, youtubeLink] = await getLinks();
    const [instaTag, redditTag, youtubeTag] = await getTags();
    const linkTagsToCreate = [
      {
        linksId: redditLink.id,
        tagsId: redditTag.id,
      },
      {
        linksId: instagramLink.id,
        tagsId: instaTag.id,
      },
      {
        linksId: youtubeLink.id,
        tagsId: youtubeTag.id
      }
    ];
    const linkTags = await Promise.all(linkTagsToCreate.map(createLinkTags));
    console.log("link_tags created");
    console.log("link_tags created: ", linkTags);
    console.log("Finished creating link_tags!");
  } catch (error) {
    console.error("Error making link_tags");
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .then(populateInitialTagData)
  .then(populateInitialLinkTagsData)
  .catch(console.error)
  .finally(() => client.end());
