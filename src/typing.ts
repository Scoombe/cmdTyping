
//library for the handling of keypresses on the console.
//declare function require(name:string);
let keypress = require('keypress');
let charPos:number = 0;  
const chalk = require('chalk');
let request = require('request')
var marky = require('marky');
const decode = require('decode-html')
let CompleteText: string;
let curDisplayText: string;
let done:boolean = false;
let averageWPM: number;
let secTimer;
keypress(process.stdin);
/*
*function: function for the ggeneration of text for the user to type
*/
function generateText(){
    //todo generate random text
    request('https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1', function (error:any, response:any , body:any) {
    done = false;
    let apiText= JSON.parse(body);
    apiText = apiText[0]
    CompleteText=  apiText.content.slice(3,apiText.content.length - 5);
    CompleteText = decode(CompleteText);
    CompleteText = CompleteText.replace(/&#8217;/g,"'");
    CompleteText = CompleteText.replace(/<em>/g,'');
    CompleteText = CompleteText.replace(/<em>/g,'');
    CompleteText = CompleteText.trim();
    console.log(CompleteText);
    countdown();
    });
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
    console.log(CompleteText);
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
    if(key.sequence == char){
        charPos= charPos + 1;
        if(charPos != CompleteText.length){
            curDisplayText = CompleteText.substr(charPos,CompleteText.length-1);
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
    if(finished){
        if(key && key.ctrl && key.name == 'r'){
            done = false;
            generateText();
        }
    }
  });


function finished(){
    done = true;
    console.clear()
    let elapsedTime:number = Math.round(marky.stop("typing").duration / 1000);
    console.log(`elapsedTime: ${elapsedTime}`);
    let words:number =  Math.round(CompleteText.length / 5);;
    console.log(`total words: ${words}`);
    console.log(`total chars:${CompleteText.length}`)
    let wordsPerMin: number =(words * 60) / elapsedTime;
    console.log(`you have finished, press control r to try another test. 
    Words per minute: ${wordsPerMin}`);

}

  declare module 'readline' {
    export function emitKeypressEvents(stream: NodeJS.ReadableStream, interface?: ReadLine): void;
  }
  generateText();