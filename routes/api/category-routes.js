const router = require("express").Router();
const { Category, Product } = require("../../models");
const { findByPk, update } = require("../../models/Product");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: { model: Product },
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    if(!req.body.category_name){
      res.status(400).json("You must include a category name!")
      return
    }
    const category = await Category.create(req.body);

    res.status(201).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update({
      category_name: req.body.category_name
    }, {
      where: {
        id: req.params.id
      }
    })
    res.status(201).json(updatedCategory)
  } catch (err) {
    res.status(400).json(err)
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  const deletedCategory = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json(deletedCategory);
});

module.exports = router;
