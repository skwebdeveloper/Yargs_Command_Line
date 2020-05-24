const fs = require('fs');
const chalk = require('chalk');
const getNotes = () => {
    return "You are great";
}

// Load a new note
const addNotes = (title, body) => {
    const notes = loadNotes();
    // Check first duplicate
    const duplicateNotes = notes.find((note) => {
        return note.title === title;
    });
    if (!duplicateNotes) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.rgb(255, 136, 0).bold("New note added"));
    }
    else {
        console.log(chalk.bold.red("Note taken"));
    }
};

// Saving that note
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('Notes.json', dataJSON);
}

// Editing a new note
const loadNotes = () => {
    try {
        const Buffer = fs.readFileSync('Notes.json');
        const Data = Buffer.toString();
        return JSON.parse(Data);
    }
    catch (e) {
        // When we don't have any data
        return [];
    }
};



// REMOVE NOTE
const removeNote = (title) => {
    const notes = loadNotes();

    const remove = notes.filter((remove) => {
        return remove.title !== title;
    });
    if (notes.length > remove.length) {
        console.log(chalk.bgGreen('Note removed'));
        saveNotes(remove);
    }
    else {
        console.log(chalk.bgRed("No note found"));
    }
}


// LIST 
const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.bold.white("Your notes"));
    notes.forEach(element => {
        console.log(chalk.bold.green(element.title));
        console.log(chalk.bold.red(element.body));
    });
}


// READ
const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);
    if (note) {
        console.log(chalk.bgGreen(note.title));
        console.log(note.body);
    }
    else {
        console.log(chalk.red.bold("Note not found"));
    }
};


module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}