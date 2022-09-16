const chalk = require('chalk');
const fs = require('fs');


const readNote = title => {
    let notes = loadNotes();
    let note = notes.find(note => note.title===title);
    if(note === undefined)
    console.log(chalk.bgRed('Note not Found!'));
    else console.log(chalk.italic.cyanBright(note.body));
}

const listNotes= () => {
    let notes = loadNotes();
    console.log(chalk.bgWhite.red.bold('Your Notes:'));
    notes.forEach(note => {
        console.log('\n\t'+chalk.bgYellowBright.bold('Title:')+'\t'+chalk.yellow.italic(note.title));
        console.log('\t'+chalk.bgCyanBright.bold('Body :')+'\t'+chalk.cyan.italic(note.body));
    });
}

const addNotes= function(title,body) {
    let notes= loadNotes();
    let duplicateNote= notes.find(note => note.title===title);
debugger
    if(!duplicateNote)
    {
        notes.push({
            title: title,
            body: body
        });
        console.log(chalk.green('Note Added!'));
        saveNotes(notes);
    }
    else console.log(chalk.red('Title already present!'));
}

const saveNotes= notes => {
    let json= JSON.stringify(notes);
    fs.writeFileSync('notes.json',json);
}

const loadNotes= function() {
    try {
        let notes= fs.readFileSync('notes.json');
        notes= notes.toString();
        notes= JSON.parse(notes);
        return notes;
    } catch {
        return [];
    }
}

const removeNotes= function(title) {
    let notes= loadNotes();
    let updNotes= notes.filter(note => note.title!==title);
    if(notes.length === updNotes.length) 
    console.log(chalk.bgRed('Note not Found!'));
    else console.log(chalk.bgGreen('Note removed!'));
    saveNotes(updNotes);
}

module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote
};