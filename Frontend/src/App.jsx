    import React, { useEffect, useState } from 'react';
    import axios from 'axios';  // imported axois for http methods 
    import './App.css';  // import css file

    const App = () => { 
    const [add, isAdd] = useState(false); // defining the Notes adding dialog flag 
    const [notes, setNotes] = useState([]); // state to store the array of notes from the backend 
    const [newNote, setNewNote] = useState("");// for current messages to be added to the notes

    useEffect(() => {
        const fetchAll = async () => { // get method using axois to get all the notes stored in the backed only get objects when mounted
        try {
            const res = await axios.get('http://localhost:5000/getall');
            setNotes(res.data); // storing the objects in the notes
        } catch (error) {
            console.error(error);
        }
        };
        fetchAll();
    }, []);

    const handleAddNote = async () => { // function for adding new notes in the array
        if (newNote.trim() === "") return; 

        try {
        const res = await axios.post('http://localhost:5000/add', { // post method to push only the text as json 
            text: newNote,
        });

        setNotes([...notes, { text: newNote }]); // adding the object in the notes as well
        } catch (error) {
            console.log(error)
        }
        isAdd(false); // set the add flag false for clear the space
        setNewNote(""); // clear the curr note as well
    };

    return (
        <>
        <div className="welcome">  {/** welcome message */}
            <h1>Welcome to NotePad+</h1>
        </div>

        <div className="notes">{/** map function used for displaying more than one note */}
            {notes.map((note, index) => ( 
            <div key={index} className="note-box">
                {note.text || note}
            </div>
            ))}
        </div>

        <div className="cont"> 
            <div className="add" onClick={() => isAdd(!add)}>+</div> {/** add button */}
            {add && (
            <div className="addnotes"> {/** addNote dialog only open when the button is clicked */}
                <textarea
                placeholder='Write your note...'
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                ></textarea>
                <button onClick={handleAddNote}>Add Note</button>
            </div>
            )}
        </div>
        </>
    );
    };

    export default App;
