const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll(
      {
        include: [
          {
            model: Product
          }
        ],
      });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// GET a single category
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product
        }
      ],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category data found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new category
router.post('/post/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE a category by id
router.put('/update/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(
      {
        id: req.body.id,
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({message: `Category ${req.params.id} updated`});
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a category
router.delete('/delete/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json({message: `Category ${req.params.id} deleted`});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
