const fs = require('fs');
const express = require("express");
const app = express();
const validator = require("validator");
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');


// ADDING A NOTES
yargs.command({
    command: 'add',
    describe: 'This is adding',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.addNotes(argv.title, argv.body);
    }
});

// REMOVING DATA
yargs.command({
    command: 'remove',
    describe: 'This is removing',
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.removeNote(argv.title);
    }
});


// LISTNG ALL NOTES
yargs.command({
    command: 'list',
    describe: 'This is for list',
    handler: (argv) => {
        notes.listNotes();
        //  console.log('List');
    }
});

// READING ALL NOTES
yargs.command({
    command: 'read',
    describe: 'This is for reading',
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.readNote(argv.title);
    }
});



yargs.parse();
