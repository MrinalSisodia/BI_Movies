const mongoose = require("mongoose")

const RestaurantSchema = new mongoose.Schema({
name: {
    type: String, 
    required: true
}, cuisine: [{
    type: String, 
    enum: ['American', 'Italian', 'Chinese', 'Indian', 'Japanese', 'Mexican', 'Thai', 'French', 'Mediterranean', 'Greek', 'Spanish', 'Other'], 
    required: true
}], 
location: {
    type: String, 
    required: true
}, 
phoneNumber: {
    type: String, 
    required: true
},
website: String, 
openHours: String,
reviews: [{
    type: String
}],
rating: {
    type: Number, 
    min: 0, 
    max: 5,
    default: 0, 
}, 
priceRange: [{
    type: String, 
    enum: ['$ (0-10)', '$$ (11-30)', '$$$ (31-60)', '$$$$ (61+)', 'Other']
}], 
photos: [{
    type: String
}], 
reservationsNeeded: {
    type: Boolean,
    default: false
},
isDeliveryAvailable:  {
    type: Boolean,
    default: false
},
menuUrl: String,
}, {timestamps: true})

const Restaurants = mongoose.model("Restaurants", RestaurantSchema)

module.exports = Restaurants