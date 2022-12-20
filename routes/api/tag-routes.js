const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");
const { update } = require("../../models/Product");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: { model: Product, through: ProductTag, as: 'products' }
    });
    res.status(200).json(tags);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: { model: Product, through: ProductTag, as: 'products' },
    });

    if (!tag) {
      res.status(404).json("That tag id does not exist!");
      return;
    }
    res.status(200).json(tag);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    if (!req.body.tag_name) {
      res.status(400).json("You must specify a tag name!");
      return;
    }
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    if (!req.body.tag_name) {
      res.status(404).json("You need to supply a tag_name");
      return;
    }

    const updatedTag = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if(updatedTag[0] === 0){
      res.status(404).json("Could not find tag by that id")
      return
    }

    res.status(201).json(updatedTag);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    if (!req.params.id) {
      res.status(404).json("You must supply an id");
    }
    const deletedTag = Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("Tag deleted");
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
