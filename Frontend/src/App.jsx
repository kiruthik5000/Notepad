import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [add, isAdd] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");// for status messages

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get('http://localhost:5000/getall');
        setNotes(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAll();
  }, []);

  const handleAddNote = async () => {
    if (newNote.trim() === "") return;

    try {
      const res = await axios.post('http://localhost:5000/add', {
        text: newNote,
      });

      setNotes([...notes, { text: newNote }]); // or refetch after post
    } catch (error) {
        console.log(error)
    }
    isAdd(false);
    setNewNote("");
  };

  return (
    <>
      <div className="welcome">
        <h1>Welcome to NotePad+</h1>
      </div>

      <div className="notes">
        {notes.map((note, index) => (
          <div key={index} className="note-box">
            {note.text || note}
          </div>
        ))}
      </div>

      <div className="cont">
        <div className="add" onClick={() => isAdd(!add)}>+</div>
        {add && (
          <div className="addnotes">
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
