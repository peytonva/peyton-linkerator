const { Client } = require('pg');
const DB_NAME = 'peyton-linkerator';
const DB_URL = process.env.DATABASE.URL || `postgres://localhost:5432/${DB_NAME}`;
const client = new Client(DB_URL)

// This is where you'll be creating your db functions 
// For example, making a function that fetches all of the links from your links table in your DB 

// database methods
async function createLink({ url, comment }) {
  try {
    const {
      rows: [link],
    } = await client.query(
      `INSERT INTO links(url, comment)
      VALUES($1 , $2)
      RETURNING *
      `,
      [url, comment]
    );

    return link;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

async function getLinks() {
  try {
    const { rows } = await client.query(`
      SELECT * FROM links
    `);

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

async function getLinkById(id) {
  try {
    const {
      rows: [link],
    } = await client.query(
      `
    SELECT * FROM links
    WHERE id = $1
    `,
      [id]
    );

    return link;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

async function createTag({ name }) {
  try {
    const {
      rows: [tag],
    } = await client.query(
      `
    INSERT INTO tags(name)
    VALUES($1)
    RETURNING name
    `,
      [name]
    );

    return tag;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

async function getTags() {
  try {
    const { rows } = await client.query(`
      SELECT * FROM tags
    `);

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

async function destroyLink(id) {
  try {
    await client.query(
      `
    DELETE FROM link_tags
    WHERE "linksId" = $1
    `,
      [id]
    );

    const {
      rows: [link],
    } = await client.query(
      `
    DELETE FROM links
    WHERE id = $1
    `,
      [id]
    );

    return link;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

async function createLinkTags({ linksId, tagsId }) {
  try {
    const {
      rows: [link_tag],
    } = await client.query(
      `
      INSERT INTO link_tags("linksId", "tagsId")
      VALUES($1, $2)
      RETURNING *
    `,
      [linksId, tagsId]
    );

    return link_tag;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

async function getLinksWithTags() {
  try {
    const { rows } = await client.query(` 
    SELECT links.url, links.clickCount, links.comment, links.date, tags.name AS tagName
    FROM link_tags
    JOIN links ON link_tags."linksId" = links.id
    JOIN tags ON link_tags."tagsId" = tags.id`);

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// export
module.exports = {
  client,
  createLink,
  createTag,
  getLinksWithTags,
  getLinks,
  getTags,
  createLinkTags,
  destroyLink,
  getLinkById,
};
