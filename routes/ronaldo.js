const express = require('express');
const axios = require('axios');
const router = express.Router();

// Array of Ronaldo images URLs
const data = [
    "https://i.pinimg.com/originals/22/a6/6e/22a66ef9fc1067375df29ee4fd04954b.jpg",
    "https://i.pinimg.com/originals/16/85/cc/1685ccb76d0948fa2b1afd534c78df07.jpg",
    "https://besthqwallpapers.com/Uploads/13-4-2022/197987/thumb2-4k-cristiano-ronaldo-2022-manchester-united-football-stars.jpg",
    // Add more URLs here...
];

// Endpoint to get a random Ronaldo image
router.get('/ronaldo', async (req, res) => {
    try {
        // Get a random image URL from the data array
        const randomImageUrl = data[Math.floor(Math.random() * data.length)];
        // Fetch the image data
        const imageResponse = await axios.get(randomImageUrl, { responseType: 'arraybuffer' });
        // Set the response headers
        res.set('Content-Type', 'image/jpeg');
        res.send(imageResponse.data);
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
