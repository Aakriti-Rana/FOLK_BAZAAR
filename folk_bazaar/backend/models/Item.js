const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a product name'],
            trim: true,
            maxlength: [100, 'Name cannot be more than 100 characters']
        },
        category: {
            type: String,
            required: [true, 'Please add a category'],
            enum: [
                'Jewelry',
                'Clothing',
                'Bags',
                'Shoes',
                'Sarees',
                'Handicrafts',
                'Other'
            ]
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
            maxlength: [500, 'Description cannot be more than 500 characters']
        },
        image: {
            type: String,
            required: [true, 'Please add an image URL'],
            match: [
                /^(https?:\/\/).+/,
                'Please add a valid URL'
            ]
        },
        price: {
            type: Number,
            required: [true, 'Please add a price'],
            min: [0, 'Price cannot be negative']
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Item', itemSchema);