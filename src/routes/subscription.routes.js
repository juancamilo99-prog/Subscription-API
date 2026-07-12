const express = require('express');
const upload = require('../middleware/cloudinary/uploadFiles');
const { create_subscripcion, get_subscription } = require('../controller/subscription.controller');


const router = express.Router();

router.post("/create", upload.array("images", 5), create_subscripcion)
router.get("/", get_subscription);

module.exports = router;