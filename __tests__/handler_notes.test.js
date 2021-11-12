const notes = require('../handler_notes');
const fs = require('fs');
const { loadNotes, readNote, readNotes } = require('../handler_notes');

beforeEach(() => {
    notes.createNote("sample_note.json", "Book", "Twilight");
    notes.createNote("sample_note.json", "Book", "Alice in Wonderland");
});

afterEach(() => {
    fs.rmSync("./sample_note.json")
});

describe("Test --createNote()", () =>{
    it("Create a file called sample_note.json", () => {
        expect(fs.statSync('./sample_note.json')).toBeTruthy();
    });
    xit("Verify that body field can't be repeated", () => {
            expect(() => {
                notes.createNote("sample_note.json", "Book", "Alice in Wonderland")}
                ).toThrow("The note already exists");   
    });
    it("Add a note with different data in body field", () => {
        notes.createNote("sample_note.json", "Book", "Da Vinci code");

        const data = notes.loadNotes('./sample_note.json');
        expect(data).toEqual([
            {title: "Book", body: "Twilight"},
            {title: "Book", body: "Alice in Wonderland"},
            {title: "Book", body: "Da Vinci code"}
        ])
    })

})

describe("Test --loadNote()", () => {
    it("Read the unmodified content of the JSON file", () => {
        const data = notes.loadNotes('./sample_note.json');
        expect(data).toEqual([
            {title: "Book", body: "Twilight"},
            {title: "Book", body: "Alice in Wonderland"}
        ])
    });

    it("Return an empty list if the JSON file doesn't exist", () => {
        const data = notes.loadNotes("no_notes.json");

        expect(data).toEqual([]);
    })
})

describe("Test --removeNote()", () => {
    xit("Throw an error if the note doesn't exist", () => {
        expect(() => {
            notes.removeNote('./sample_note.json', "Fortunata y Jacinta")}
            ).toThrow("There isn't any note with that content");
    })
    it("Remove the note 'Alice in Wonderland", () => {
        notes.createNote('./sample_note.json', "Book", "The memories of Sherlock Holmes")
        notes.removeNote('./sample_note.json', "Alice in Wonderland");

        expect(loadNotes('./sample_note.json')).toEqual([
            {title: "Book", body: "Twilight"},
            {title: "Book", body: "The memories of Sherlock Holmes"}
        ])
    })
})

describe("Test --readNote()", () => {
    it("Display a table in the console", () => {
        
        const tableMock = jest.spyOn(global.console, 'table').mockImplementation()
        readNotes('./sample_note.json')

        expect(tableMock).toHaveBeenCalledTimes(1);
        tableMock.mockRestore();
    })
})