const router = require("express").Router();
const { Category, Product } = require("../../models");


// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const category = await Category.findByPk(req.params.id, {
    include: {model: Product}
  });
  res.json(category);
});

router.post("/", (req, res) => {
  // create a new category
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
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
