const express = require('express');
const cors = require('cors'); // cors used for communicating between two different ports

const app = express();
app.use(cors());
app.use(express.json());  // json used for request and response processing 

let notes = [{id:1, text:"Add notes"}];  // basic structure for identification 


// get method used to return all the objects stored in notes array

app.get('/getall', (req, res) => {
    try {
        return res.status(200).json(notes);
    } catch (err) {
        return res.status(500).json({ message: "An error occurred while fetching notes" });
    }
});

// post method used to store the objects sent in request
app.post('/add', (req, res) => {
    try {
        const {text } = req.body; // object destructor for extracting text
        const id = notes.length + 1; // custom indexing for array
        notes.push({ id, text }); // add the notes based on the index
        return res.status(201).json({ message: "Successfully added note" });
    } catch (err) {
        return res.status(500).json({ message: "An error occurred while adding note" });
    }
});

const PORT = 5000; // defining port 
app.listen(PORT, () => console.log(`App is running on port ${PORT}`)); // expose the application on defined port
