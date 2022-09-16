// require('dotenv').config();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "chidestech",
    api_key: 777737197986991,
    api_secret: "wpEZUOYtmRjHklXeitNratc5E_4",
});

module.exports = {cloudinary};