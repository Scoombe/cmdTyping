import { cmdTyping } from './typing';

// library for the handling of key presses on the console.
const readline = require('readline');
const keypress = require('keypress');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// setting up the listener for the pressing of keys
keypress(process.stdin);

main();
let typing: cmdTyping;
function main() {
    typing = new cmdTyping(printText, getName, 0.5);
    typing.startTest();
}

/**
 * @function to print the displayString text to the console.
 */
function printText(): void {
    console.clear();
    console.log(typing.displayString);
}

function getName(): void {
    rl.clearLine();
    typing.gettingName = true;
    rl.question('Please enter your username for your highscore: ', (name: string) => {
        typing.wordsTest.updateHighscore(name);
        typing.getFinishText();
        typing.gettingName = false;
    });
}

/**
 * Function for listening for keypresses
 * @param  {string} 'keypress': what event will call this function
 * @param  {callback} 'anonymous function':
 *                      @param {object} 'ch': the char object '
 *                      @param {object} 'key': the key object the .sequence is used to get the char entered.
 */
process.stdin.on('keypress', function(ch: any , key: any ): void {
    // seeing if the key is reserved.
    checkReserveKeys(key);
    typing.checkKey(key.sequence);
});

function checkReserveKeys(key: any): void {
    // function for checking if any of the control keys have been pressed.
    if (typing.wordsTest.done) {
        if (key && key.ctrl && key.name === 'r') {
            typing.startTest();
        }
    }
    if (key && key.ctrl && key.name === 'c') {
        process.stdin.pause();
        process.exit();
    }
}

declare module 'readline' {
    export function emitKeypressEvents(stream: NodeJS.ReadableStream, interface?: ReadLine): void;
}

const clear = require('clear');
if (!console.clear) {
    console.clear = function() {
        clear();
    };
}

const stdin: any = process.stdin;
if (stdin.setRawMode) {
    stdin.setRawMode(true);
}

process.stdin.resume();
