const apiRouter = require("express").Router();
const {
  getLinksWithTags,
  createLink,
  getLinks,
  getTags,
  destroyLink,
  createTag,
  createLinkTags,
} = require("../db/index");

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

apiRouter.get("/linkwithtags", async (req, res, next) => {


  const result = await getLinksWithTags();

  res.send({
    link: result,
  });
});

apiRouter.delete("/deletelink/:id", async (req, res, next) => {
  const { id } = req.params;

  const result = await destroyLink(id);

  res.send(result);
});

apiRouter.post("/newlink", async (req, res, next) => {
  const { url, comment } = req.body;

  const result = await createLink({ url, comment });

  res.send({
    newLink: result,
  });
});

apiRouter.post("/newtag", async (req, res, next) => {
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

module.exports = apiRouter;
