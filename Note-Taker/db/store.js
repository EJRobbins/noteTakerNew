// THIS IS WANTED

const util = require("util");
const fs = require("fs");
// Unique ID
const uuidv1 = require("uuid/v1");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileAsync("db/db.json", "utf8")
    }
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }
    getNotes() {
        return this.read().then(notes => {
            let parseNotes;

            try{
                parseNotes = [].concat(JSON.parse(notes));
            }catch(err) {
                parseNotes = [];
            }

            return parseNotes;
        })
    }
    addNote(note) {
        // destructuring note object
        const {title, text} = note;
        if (!title || !text) {
            throw new Error ("Title and Text cannot be blank.");
        }
        const newNote = {title, text, id: uuidv1()}
        // Using spread, adding New Note to array of current notes
        return this.getNotes().then(notes => [...notes, newNote]).then(updatedNotes => this.write(updatedNotes)).then(() => newNote);
    }
    removeNote(id) {
        return this.getNotes().then((notes) => notes.filter(note => note.id !== id)).then(filteredNotes => this.write(filteredNotes));
    }
}

module.exports = new Store();