const express = require('express');
const app = express();
const open = require('open');
const path = require('path');

//Get static files from folders
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    open(`http://localhost:${PORT}`, {app: {name: open.apps.chrome}});
});