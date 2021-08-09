const apiRouter = require("express").Router();
const {
  getLinksWithTags,
  createLink,
  getLinks,
  getLinkById,
  getTags,
  destroyLink,
  createTag,
  createLinkTags,
} = require("../db/index");


apiRouter.get("/", (req, res) => {
  res.send({
    message: "API is under construction!",
  });
});

//removed async & await
apiRouter.get("/links", async (req, res, next) => {
  const result = await getLinks();

  res.send({
    allLinks: result,
  });
});

apiRouter.get("/alltags", async (req, res, next) => {
  const result = await getTags();

  res.send({
    allTags: result,
  });
});

apiRouter.get("/linkswithtags", async (req, res, next) => {
  const result = await getLinksWithTags();

  res.send({
    link: result,
  });
});

apiRouter.get("/links/:linkId", async (req, res, next) => {
  const { linkId } = req.params;

  const result = await getLinksWithTags(linkId);

  res.send(result);
});

apiRouter.delete("/links/:id", async (req, res, next) => {
  const { id } = req.params;

  const result = await destroyLink(id);

  res.send(result);
});

// apiRouter.post("/newlink", async (req, res, next) => {
//   const { url, comment } = req.body;

//   const result = await createLink({ url, comment });

//   res.send({
//     newLink: result,
//   });
// });

apiRouter.post("/createlink", async (req, res, next) => {
  const { url, clickCount = 0, comment, tag } = req.body;

  const result = await createLink({ url, clickCount, comment, tag });

  res.send(result);
});

apiRouter.post("/createtag", async (req, res, next) => {
  const { name } = req.body;

  const result = await createTag({ name });

  res.send({
    newTag: result,
  });
});


apiRouter.post("/link/:linksId/tag", async (req, res, next) => {
  const { linksId } = req.params;
  const { tagsId } = req.body;

  const results = await createLinkTags({ linksId, tagsId });

  res.send({
    addTagToLink: results,
  });
});

module.exports = apiRouter;
