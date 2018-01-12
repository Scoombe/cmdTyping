import { Socket } from "net";


//library for the handling of keypresses on the console.
//declare function require(name:string);
let keypress = require('keypress');
let charPos:number = 0;  
const chalk = require('chalk');
let request = require('request')
var marky = require('marky');
const randomWords = require('random-words');
const decode = require('decode-html')
let CompleteText: string;
let curDisplayText: string;
let done:boolean = false;
let averageWPM: number;
let secTimer;
let started = false;
keypress(process.stdin);
/*
*function: function for the ggeneration of text for the user to type
*/
function generateText(){
    let randWords: Array<string> = randomWords({exactly:200, min:3, max:10});
    CompleteText = randWords.join(" ");
    countdown();
};

//function for getting 1 charecter
function getCurrentChar():string{
    return CompleteText.slice(charPos, charPos+1);
}

function countdown(){
    //function for calling all of the countdownFunctions
    let Contdownfunctions: Array<any> = [oneSecond,twoSecond,threeSecond,go]
    for (var i = 0; i < Contdownfunctions.length; i++) {
        setTimeout(Contdownfunctions[i], i+1 * 1000);
    }
};

function oneSecond(){
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
    console.clear();
    console.log("type");
    //console.clear();
    console.log(CompleteText.substring(0,100));
    marky.mark("typing");
};


//&#8217;
//function that gets the keypress
process.stdin.on('keypress', function (ch: any , key: any ) {
    //console.log('got "keypress"', key);
    if (key && key.ctrl && key.name == 'c') {
      process.stdin.pause();
    }
    let char:string  = getCurrentChar();
    if(!done){
        if(key.sequence == char){
            charPos= charPos + 1;
            if(charPos != CompleteText.length){
                curDisplayText = CompleteText.slice(charPos,charPos+100);
                console.clear();
                console.log(curDisplayText);
            }
            else{
                console.log("finished string");
                finished();
            }        
        }
        else{
            console.clear();
            console.log(`${chalk.red(char)}`);
            console.log(curDisplayText)
        }
        if(!started){
            getStarted();
        }
    }   
    if(done){
        if(key && key.ctrl && key.name == 'r'){
            done = false;
            generateText();
        }
    }
  });

  function getStarted(){
    console.log("getting Started");
    started = true;
    setTimeout(finished, 30000);
  }

function finished(){
    started = false;
    done = true;
    console.clear()
    let words:number =  charPos / 5
    console.log(`total words: ${words}`);
    console.log(`you have finished, press control r to try another test. 
    Words per minute: ${words * 2}
    You wrote ${words} words in 30 seconds`);

}

  declare module 'readline' {
    export function emitKeypressEvents(stream: NodeJS.ReadableStream, interface?: ReadLine): void;
  }

  const stdin: any = process.stdin;
  stdin.setRawMode(true);
  process.stdin.resume();
  console.log(stdin.setRawMode)

  generateText();