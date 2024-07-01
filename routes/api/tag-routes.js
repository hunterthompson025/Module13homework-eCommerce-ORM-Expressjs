const router = require('express').Router();
const { model } = require('../../config/connection');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Get all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll(
      {
        include: [
          {
            model: Product,
            through: {
              model: ProductTag,
              attributes: ['id','product_id', 'tag_id'],
            },
          },
        ],
      });

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a tag by id
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          through: {
            model: ProductTag,
            attributes: ['id','product_id', 'tag_id'],
          },
        },
      ],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a tag
router.post('/post/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE a tag by id
router.put('/update/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(
      {
        id: req.body.id,
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({message: `Tag ${req.body.id} updated`});
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a tag
router.delete('/delete/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json({message: `Tag ${req.params.id} deleted`});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
