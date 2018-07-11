import { totalmem } from "os";
import {wordsPerMinTest} from "./wordsPerMinTest";
//library for the handling of key presses on the console.
//declare function require(name:string);
let keypress = require('keypress');

const chalk = require('chalk');
const randomWords = require('random-words');
let timer = require('timer-stopwatch');
let stopWatch: any;
let wordsTest: wordsPerMinTest;



keypress(process.stdin);

//function that gets the keypress
process.stdin.on('keypress', function (ch: any , key: any ) {
    //console.log('got "keypress"', key);
    checkReserveKeys(key);
    if(wordsTest.started){
        let charCheck = wordsTest.checkKeyChar(key.sequence);
        if(charCheck.isCharCorrect){
            if(charCheck.newWord){
                wordsTest.wordTimes.push(stopWatch.lap());
                wordsTest.mostRecentWPM();
            }
            displayText(true);
        }
        else{
            displayText(true, charCheck.errorText)
        }
    }
});

function checkReserveKeys(key: any):void{
    //function for checking if any of the control keys have been pressed.
    if(wordsTest.done){
        if(key && key.ctrl && key.name == 'r'){
            getStarted();
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
    console.log(`wordCount: ${wordsTest.wordCount}`);
    console.log(`average Words Per Minute: ${wordsTest.averageWPM}`);
}

function getStarted(){;
    wordsTest = new wordsPerMinTest();
    countdown();
    stopWatch = new timer(30000);       
    stopWatch.onDone(finished);
}

function go(){
    console.clear();
    console.log("type");
    wordsTest.started = true;
    stopWatch.start();
    displayText(false);
};

function countdown(){
    setTimeout(oneSecond,1000);
    setTimeout(twoSecond,2000);
    setTimeout(threeSecond,3000);
    setTimeout(go,4000);
}
    function oneSecond(){
    displayText(true);
    console.log(1);
};
function twoSecond(){
    console.log(2)
};
function threeSecond(){
    console.log(3)
};

function finished(){
    wordsTest.started = false;
    wordsTest.done = true;
    console.clear()
    console.log(`total words: ${wordsTest.wordCount}`);
    console.log(`you have finished, press control r to try another test. 
Words per minute: ${wordsTest.wordCount * 2}
You wrote ${wordsTest.wordCount} words in 30 seconds
Calculated words per minute: ${(wordsTest.charPos  / 5) * 2} (This is based on the time it takes to type any 5 chars)
Average Words Per Minute: ${wordsTest.averageWPM}`);
    stopWatch.stop();
    stopWatch.reset();
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


getStarted();
    