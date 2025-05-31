const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); 

let notes = [{id:1, text:"Add notes"}]; 

app.get('/getall', (req, res) => {
    try {
        return res.status(200).json(notes);
    } catch (err) {
        return res.status(500).json({ message: "An error occurred while fetching notes" });
    }
});

app.post('/add', (req, res) => {
    try {
        const {text } = req.body;
        const id = notes.length + 1;
        notes.push({ id, text });
        return res.status(201).json({ message: "Successfully added note" });
    } catch (err) {
        return res.status(500).json({ message: "An error occurred while adding note" });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
