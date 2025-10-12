const express = require('express');
const app = express();
const cors = require('cors');
const open = require('open');
const path = require('path');
const multer = require('multer');

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Get static files from folders
app.use(express.static(path.join(__dirname, 'public')));

//Code for uploading images

const catalogueUpload = multer({ dest: 'public/images/catalogue' });
const pfpUpload = multer({dest: 'public/images/user_pfps'});

app.post('/server/catalogue', catalogueUpload.single('book-cover'), function(req, res, next){
    if (req.file !== null){
        console.log(req.file);
        res.status(201).json(req.file);
    }else{
        res.status(400).json('Failed to upload cover image');
    }
});

app.post('/server/pfp', pfpUpload.single('avatar'), function(req, res, next){
    if (req.file !== null){
        res.status(201).json(req.file);
    }else{
        res.status(400).json('Failed to upload pfp');
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    open(`http://localhost:${PORT}`, {app: {name: open.apps.chrome}});
});