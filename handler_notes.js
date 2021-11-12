const fs = require('fs');
const chalk = require('chalk');

const error_info = `${chalk.bgRed("Error")}` 
const success_info = `${chalk.bgYellow.bold("Info")}`

/**
 * Convert the JSON file into a Javascript Object.
 * Create an empty list if the file doesn't exist.
 * 
 * @param {string} file - JSON file
 * @return {[] | [{}]} - Return a list with the content of the file.
 */
 const loadNotes = (file) => {
    try{
        const dataBuffer = fs.readFileSync(file);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
}

/**
 * Save the notes in JSON format at the main directory
 * 
 * @param {string} file - name of the file
 * @param {*} notes - list of notes
 */
const saveNotes = (file, notes) => {
    const noteString = JSON.stringify(notes, null, 2);
    fs.writeFileSync(file, noteString);
}

/**
 * Filter the content of the list notes according to the text of the body
 * 
 * @param {[]} notes
 * @param {string} comparator - Comparative element
 * @returns {[]} new array list of notes 
 */
const verifyDuplicate = (notes, comparator) => notes.filter((note) => note.body === comparator)

/**
* Create a note in format JSON with the content inserted by the user
*
* @param {string} file - filename
* @param {string} header - Header of the note
* @param {string} msg - Body of the note
*
*/
const createNote = (file, header, msg) => {
    const notes = loadNotes(file);
    const isDuplicate = verifyDuplicate(notes, msg)

    if(isDuplicate.length === 0){
        notes.push({
            title: header,
            body: msg
        })
        saveNotes(file, notes);
        console.log(`\n${success_info}: New note added!`)
    } else {
        console.log(`\n${error_info}: body of the note already exists!`)
        //throw new Error("The note already exists")
    }
}

/**
 * Delete a note from the list and replace the original file
 * 
 * @param {string} file - filename
 * @param {string} msg - Body of the note to be deleted
 */
const removeNote = (file, msg) => {
    const notes = loadNotes(file);
    const isExist = verifyDuplicate(notes, msg);
    const newNote = notes.filter((note) => note.body !== msg)

    isExist.length === 0 ? console.log(`\n${error_info}: The note doesn't exist!`)
        //throw new Error("There is no note with that content")
                        :console.log(`\n${success_info}: Note removed!`)

    saveNotes(file, newNote);
}

/**
 * Display the save notes from the JSON file
 * 
 * @param {string} file - Filename
 */
const readNotes = (file) => {
    const notes = loadNotes(file)
    console.table(notes)
}

/**
 * Filter notes according to the title and display them to the user
 * 
 * @param {string} file - Filename
 * @param {string} title - Header of the note
 */
const FilterNote = (file, title) => {
    const notes = loadNotes(file)
    const findTitle = notes.filter(note => note.title === title)

    findTitle.length > 0 ? console.table(findTitle) 
                        : console.log(`\n${error_info}:No se ha podido filtrar`)
    
}

module.exports = {
    createNote: createNote,
    loadNotes: loadNotes,
    removeNote: removeNote,
    readNotes: readNotes,
    FilterNote: FilterNote,
}