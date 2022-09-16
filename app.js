const chalk = require('chalk');
const yargs = require('yargs');
let notes = require('./notes.js');

yargs.version=('1.1.0');

yargs.command({
    command:'add',
    describe:'to add notes',
    builder: {
        title: {
            describe:'Note title',
            demandOption:true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv => notes.addNotes(argv.title,argv.body)
})

yargs.command({
    command:'remove',
    describe:'to remove notes',
    builder: {
        title: {
            describe: 'title of note to be removed',
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv => notes.removeNotes(argv.title)
})

yargs.command({
    command:'list',
    describe:'to list notes',
    handler: argv => notes.listNotes()
})

yargs.command({
    command:'read',
    describe:'to read notes',
    builder: {
        title: {
            describe: 'to read a specific note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv => notes.readNote(argv.title)
})


yargs.parse();