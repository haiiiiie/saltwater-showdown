const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const FILE_PATH = path.join(__dirname, 'groups.json');

app.use(express.json());

app.get('/load', (req, res) => {
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Error loading groups');
        } else {
            res.send(JSON.parse(data));
        }
    });
});

app.post('/save', (req, res) => {
    const groups = req.body;
    fs.writeFile(FILE_PATH, JSON.stringify(groups), 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            res.status(500).send('Error saving groups');
        } else {
            res.send('Groups saved');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
