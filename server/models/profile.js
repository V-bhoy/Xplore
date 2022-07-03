const mongoose = require('mongoose');


const profileSchema =  mongoose.Schema({
    userId: String,
    name: String,
    username: String,
    website: String,
    bio : String,
    favourites: {
        type: [String],
        default: []
    },
    profileUrl: String
})

const Profile = mongoose.model("profile", profileSchema);

module.exports = Profile;