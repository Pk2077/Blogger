const express = require("express");
const router = express.Router();
const Article = require("../models/article");

router.get("/", async (req, res) => {
  const article = await Article.find();
  if (!article) return res.status(404).send("Not Found");
  res.send(article);
});

router.get("/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) return res.status(404).send("Not Found");
  res.send(article);
});

router.post("/", async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    year: req.body.year,
  });
  await article.save();
  res.send(article);
});

router.put("/:id", async (req, res) => {
  let article = await Article.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      year: req.body.year,
    },
    { new: true }
  );
  if (!article) return res.status(404).send("Not Found");
  res.send(article);
});

router.delete("/:id", async (req, res) => {
  let article = await Article.findByIdAndRemove(req.params.id);
  if (!article) return res.status(404).send("Not Found");

  res.send(article);
});

module.exports = router;
