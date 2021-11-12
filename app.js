const notes = require('./handler_notes')

const process = require('process');
const chalk = require('chalk');
const { argv } = require('process');
const { readSingleNote, FilterNote } = require('./handler_notes');
const yargs = require('yargs')(process.argv.slice(2))

.command({
    command: 'add',
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Title of the note",
            alias: 't',
            type: 'string',
            demandOption: true
        },
        body: {
            describe: 'body of the note',
            alias: 'b',
            type: 'string',
            demandOption: true
        }
    },
    handler: (argv) => {
        console.log(`     
            ${chalk.yellow.bold("Title")}: ${argv.title}
            ${chalk.yellow.bold("Body")}: ${argv.body}`)
            
            notes.createNote("notes.json", argv.title, argv.body)
    }
})
.example(
        '$0 add -t "Read" -b "The Odyssey"',
        `Create a new note con the format:  
            \n\tTitle: Read  
            \tBody: The Odyssey`
)

.command({
    command: "remove",
    describe: "Remove a note",
    builder: {
        body: {
            describe: "Content of the note",
            alias: 'b',
            type: 'string',
            demandOption: true
        }
    },
    handler: (argv) =>  notes.removeNote("notes.json", argv.body)
})
.example(
    '\n$0 remove -b "The Odyssey"',
    `\nRemove the note with content "The Odyssey"`
)
    
.command({
    command: 'list',
    describe: "Display all notes",
    handler: () => notes.readNotes("notes.json")
})
.example(
    '\n$0 list',
    `\nShow a table with all notes`
)

.command({
    command: "filter",
    describe: "Filter a note by its title",
    builder: {
        title: {
            describe: "Title of the note",
            alias: 't',
            type: 'string',
            demandOption: true
        }
    },
    handler: (argv) => FilterNote("notes.json", argv.title)
})
.example(
    '\n$0 filter -t "Cook"',
    '\nShow all notes with the title "Cook"'
)
.version("1.0")
.epilog("\n©2021 Noteapp v1.0")
.wrap(100)
.parse();