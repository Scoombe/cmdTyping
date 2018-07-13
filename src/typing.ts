import { totalmem } from "os";
import {wordsPerMinTest} from "./wordsPerMinTest";
//library for the handling of key presses on the console.
let keypress = require('keypress');

const chalk = require('chalk');
const randomWords = require('random-words');
const readline = require('readline');

let timer = require('timer-stopwatch');
let stopWatch: any;
let wordsTest: wordsPerMinTest;
let gettingName = false; 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//setting up the listener for the pressing of keys
keypress(process.stdin);

main();
function main() {
    startTest();
}

/**
 * @function that starts the words per minute test
 * Also calls the countdown function
 */
function startTest() {
    let highscore = {wpm: 0, averageWPM: 0, name: ""};
    if (wordsTest) {
        wordsTest.restartTest();
    }
    else{
        wordsTest = new wordsPerMinTest();
    }
    stopWatch = new timer(30000);       
    stopWatch.onDone(finished);
    beginCountdown();
}

/**
 * @function that displays a countdown in the console.
 * Also calls the go function after 4 seconds
 */
function beginCountdown() {
    displayText(true);
    setTimeout(function(){console.log(1);},1000);
    setTimeout(function(){console.log(2);},2000);
    setTimeout(function(){console.log(3);},3000);
    setTimeout(go,4000);
}

/**
 * @function for starting the words test.
 * It clears the log
 * starts the stopwatch
 * And calls the display test function
 */
function go() {
    console.clear();
    console.log("type");
    wordsTest.started = true;
    stopWatch.start();
    displayText(false);
};




/**
 * Function for listening for keypresses
 * @param  {string} 'keypress': what event will call this function
 * @param  {callback} 'anonymous function': 
 *                      @param {object} 'ch': the char object ' 
 *                      @param {object} 'key': the key object the .sequence is used to get the char entered.
 */
process.stdin.on('keypress', function (ch: any , key: any ) {
    //seeing if the key is reserved.
    checkReserveKeys(key);
    if(wordsTest.started){
        let charCheck = wordsTest.checkKeyChar(key.sequence);
        if(charCheck.isCharCorrect){
            if(charCheck.newWord){
                wordsTest.wordTimes.push(stopWatch.lap());
                wordsTest.calcAverageWPM();
            }
            displayText(true);
        }
        else{
            displayText(true, charCheck.errorText)
        }
    }
});

function checkReserveKeys (key: any):void {
    //function for checking if any of the control keys have been pressed.
    if(wordsTest.done){
        if(key && key.ctrl && key.name == 'r'){
            startTest();
        }
    } 
    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
        process.exit()
    }
}



/**
 * @function to display Text to the console. 
 * @param  {boolean} clear
 * @param  {string} error? 
 * @returns void
 */
function displayText( clear:boolean, error?:string) :void {
    if(clear){
        console.clear();
    }
    if(error){
        console.log(`${chalk.red(error)}`);
    }
    console.log(wordsTest.curDisplayText);
    console.log(`words typed: ${chalk.green(`${wordsTest.wordCount}`)}`);
    console.log(`10 word average WPM:  ${chalk.green(`${wordsTest.lastTenAvWPM}`)}`);
    console.log(`total average WPM:  ${chalk.green(`${wordsTest.averageWPM}`)}`);
}



function finished(){
    wordsTest.started = false;
    wordsTest.done = true;
    console.clear()
    if(wordsTest.checkHighscore())
    {
        getName();
    }
    else{
        displayFinishText();
    }
    stopWatch.stop();
    stopWatch.reset();
}
function displayFinishText() {
    console.clear()
    console.log(`${chalk.red(`you have finished, press control r to go again. `)}`);
    console.log(`Words written: ${wordsTest.wordCount}`);
    console.log(`Words per minute: ${chalk.green(`${wordsTest.wordCount * 2}`)}
You wrote ${wordsTest.wordCount} words in 30 seconds
Calculated words per minute: ${chalk.green(`${(wordsTest.charPos  / 5) * 2} `)} (This is based on the time it takes to type any 5 chars)
Average Words Per Minute: ${chalk.green(`${wordsTest.averageWPM}`)}`);
    console.log(`${chalk.green(
    `High Score`)}
From: ${chalk.green(`${wordsTest.highscore.name}`)}
WPM:  ${chalk.green(`${wordsTest.highscore.wpm}`)}
AverageWPM: ${chalk.green(`${wordsTest.highscore.averageWPM}`)}
    `);
}

function getName(){ 
    rl.clearLine();
    rl.question("Please enter your username for your highscore: ", (name:string) => {
      wordsTest.updateHighscore(name);
      displayFinishText();
    })
}


declare module 'readline' {
    export function emitKeypressEvents(stream: NodeJS.ReadableStream, interface?: ReadLine): void;
}

let clear = require('clear');
if(!console.clear){
    console.clear = function(){
        clear();
    }
}

const stdin: any = process.stdin;
if (stdin.setRawMode){
    stdin.setRawMode(true);
}

process.stdin.resume();
    