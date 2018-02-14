import { totalmem } from "os";

//library for the handling of keypresses on the console.
//declare function require(name:string);
let keypress = require('keypress');
let charPos:number = 0;  
const chalk = require('chalk');
const randomWords = require('random-words');
let CompleteText: string;
let curDisplayText: string;
let done:boolean = false;
let averageWPM: number = 0;
let secTimer;
let started = false;
let wordCount: number = 0;
let finishTimeout:NodeJS.Timer;
let timer = require('timer-stopwatch');
let stopWatch: any;
let wordTimes:Array<number> = []; 
keypress(process.stdin);
/*
*function: function for the generation of text for the user
 to type
*/
function generateText(){
    let randWords: Array<string> = randomWords({exactly:200,maxLength:5});
    CompleteText = randWords.join(" ");
    curDisplayText = CompleteText.slice(0,100);
    countdown();
};

//function for getting 1 charecter
function getCurrentChar():string{
    return CompleteText.slice(charPos, charPos+1);
}

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
function go(){
    charPos = 0;
    wordTimes = [];
    console.clear();
    console.log("type");
    getStarted();
    //console.clear();
    done = false;
    console.log(CompleteText.substring(0,100));
};


//&#8217;
//function that gets the keypress
process.stdin.on('keypress', function (ch: any , key: any ) {
    //console.log('got "keypress"', key);
    checkReserveKeys(key);
    if(!done){
       checkKeyChar(key.sequence);
    }
  });

  function checkReserveKeys(key: any):void{
    //function for checking if any of the control keys have been pressed.
    if(done){
        if(key && key.ctrl && key.name == 'r'){
            generateText();
            wordCount = 0;
            averageWPM = 0;
        }
    } 
    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
        clearTimeout(finishTimeout);
        process.exit()
    }
  }

  //function to check the different keypresses
  //make sure that the 
  function checkKeyChar(keyPressChar:string):void{
        let currentChar:string = getCurrentChar();
        let isCharCorrect: boolean = false;
        if(started){
            if(currentChar == keyPressChar)
            {
                if(charPos != 0 && charPos % 5 == 0){
                    console.log(`charPos: ${charPos}`);
                    calcAverageWPM();
                }
                if(currentChar == " "){
                    wordCount++;
                }
                charPos= charPos + 1;
                curDisplayText = CompleteText.slice(charPos,charPos+100);
                isCharCorrect = true;
                displayText(true);
            }
            else{
                if(currentChar == " "){
                    displayText(true,"[space]")
                } 
                else{
                    displayText(true, currentChar)
                }
            }
        }
  }
  //getting the average time to do 5 chars and then calculating the average words per minute
  function calcAverageWPM():void{
    wordTimes.push( stopWatch.lap());
    let totalTimes: number = 0;
    let count:number = 0;
    totalTimes = 0;
    count = 0;
    wordTimes.forEach(time => {
        totalTimes += time;
        count++;
    });
    //average time for a word to be written
    let averageTime:number; 
    averageTime = totalTimes / count;
    averageWPM =  60 / (averageTime / 1000) ;

  }
  function displayText( clear:boolean,error?:string){
    if(clear){
        console.clear();
    }
    if(error){
        console.log(`${chalk.red(error)}`);
    }
    console.log(curDisplayText);
    console.log(`wordCount: ${wordCount}`);
    console.log(`average Words Per Minute: ${averageWPM}`);
   
  }
  function getStarted(){;
    started = true;
    stopWatch = new timer(30000)
    stopWatch.start();
    stopWatch.onDone(finished);
  }

function finished(){
    started = false;
    done = true;
    console.clear()
    console.log(`total words: ${wordCount}`);
    console.log(`you have finished, press control r to try another test. 
Words per minute: ${wordCount * 2}
You wrote ${wordCount} words in 30 seconds
Calculated words per minute: ${(charPos  / 5) * 2} (This is based on the time it takes to type any 5 chars)
Average Words Per Minute: ${averageWPM}`);
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
  generateText();