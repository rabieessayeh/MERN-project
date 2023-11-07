const Article = require("../models/Article");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newArticle = new Article(req.body);

  try {
    const savedArticle = await newArticle.save();
    res.status(200).json(savedArticle);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  const article = Article.findById(req.params._id);
  const updArt = req.body;
  
  if(updArt.img.length === 0)
      updArt.img = article.img;
  if(updArt.nom.length === 0)
      updArt.nom = article.nom;
  if(updArt.desc.length === 0)
      updArt.desc = article.desc;
  if(updArt.prix.length === 0)
      updArt.prix = article.prix;

  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      {
        $set:updArt,
      },
      { new: true }
    );
    res.status(200).json(updatedArticle);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.post("/delete", async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.body._id);
    res.status(200).json("Article Suprimer...");
  } catch (err) {
    res.status(500).json(err); 
  }
});

//GET Article
router.get("/find/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.status(200).json(article);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Articles
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let articles;

    if (qNew) {
      articles = await Article.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      articles = await Article.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      articles = await Article.find();
    }

    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
