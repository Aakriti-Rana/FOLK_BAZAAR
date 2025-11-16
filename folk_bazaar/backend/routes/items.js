const express = require('express');
const router = express.Router();
const {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem,
    getItemsByCategory
} = require('../controllers/itemController');

// Route: /api/items
router.route('/')
    .get(getItems)      // GET all items
    .post(createItem);  // POST create new item

// Route: /api/items/category/:category
router.route('/category/:category')
    .get(getItemsByCategory);  // GET items by category

// Route: /api/items/:id
router.route('/:id')
    .get(getItem)       // GET single item
    .put(updateItem)    // PUT update item
    .delete(deleteItem); // DELETE item

module.exports = router;