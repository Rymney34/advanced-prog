const express = require('express');
const multer = require ("multer");
const router = express.Router();

const { uploadMiddleware, setServicePic } = require("../controllers/serviceController.js")

// const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload/img", uploadMiddleware,setServicePic);


module.exports = router;