// Alaa Ahmad

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Ensure the 'uploads' directory exists 
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// configure Multer Storage 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files to the 'uploads' folder
    },
    filename: (req, file, cb) => {
        // Create a unique filename to avoid overwriting files
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const newFilename = uniqueSuffix + path.extname(file.originalname);
        cb(null, newFilename);
    }
});

// Create the Multer instance 
const upload = multer({ storage: storage });

// Define the File Upload Route
app.post('/upload-avatar', upload.single('avatar'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file was uploaded.');
    }
    
    // On success, 'req.file' contains information about the uploaded file.
    res.status(200).json({
        message: 'File uploaded successfully!',
        filename: req.file.filename,
        path: req.file.path,
        sizeInBytes: req.file.size
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});