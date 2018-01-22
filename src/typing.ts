//library for the handling of keypresses on the console.
//declare function require(name:string);
let keypress = require('keypress');
let charPos:number = 0;  
const chalk = require('chalk');
const randomWords = require('random-words');
let CompleteText: string;
let curDisplayText: string;
let done:boolean = false;
let averageWPM: number;
let secTimer;
let started = false;
let wordCount: number = 0;
let finishTimeout:NodeJS.Timer;

keypress(process.stdin);
/*
*function: function for the ggeneration of text for the user to type
*/
function generateText(){
    let randWords: Array<string> = randomWords({exactly:200, min:3, max:10});
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
    console.clear();
    console.log("type");
    //console.clear();
    console.log(CompleteText.substring(0,100));
};


//&#8217;
//function that gets the keypress
process.stdin.on('keypress', function (ch: any , key: any ) {
    //console.log('got "keypress"', key);
    checkReserveKeys(key);
    if(!done){
       checkKeyChar(key.sequence);
        if(!started){
            getStarted();
        }
    }
  });

  function checkReserveKeys(key: any):void{
    //function for checking if any of the control keys have been pressed.
    if(done){
        if(key && key.ctrl && key.name == 'r'){
            done = false;
            generateText();
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
        if(currentChar == keyPressChar)
        {
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

  function displayText( clear:boolean,error?:string){
    if(clear){
        console.clear();
    }
    if(error){
        console.log(`${chalk.red(error)}`);
    }
    console.log(curDisplayText);
    console.log(`wordCount: ${wordCount}`);
   
  }
  function getStarted(){
    console.log("getting Started");
    started = true;
    finishTimeout =  setTimeout(finished, 30000);
  }

function finished(){
    started = false;
    done = true;
    console.clear()
    console.log(`total words: ${wordCount}`);
    console.log(`you have finished, press control r to try another test. 
    Words per minute: ${wordCount * 2}
    You wrote ${wordCount} words in 30 seconds`);
    wordCount = 0;

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
  console.log(stdin.setRawMode)

  generateText();