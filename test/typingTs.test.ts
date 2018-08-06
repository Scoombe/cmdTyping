import {expect} from 'chai';
import {cmdTyping} from '../src/typing';

let chalk = require("chalk");
let typeTest = new cmdTyping(printText, function(){console.log("finish has run");},0.01);
/**
 * @function to print the displayString text to the console.
 */
function printText() : void {
    
}

describe ( "typing.ts tests" , function(){
    typeTest.wordsTest.curDisplayText = "aaaaaaaaaaaa"
    it ( "should countdown", function () {
        typeTest.startTest();
        
    });
    it ( "should have the right display text ", function() {
        typeTest.getDisplayText(false)
        expect(typeTest.displayString).to.equal(`aaaaaaaaaaaa
words typed: ${chalk.green(`0`)}
word average WPM: ${chalk.green(`0`)}
total average WPM: ${chalk.green(`0`)}`);
    });
    it ( "should have the right finish text ", function() {
        typeTest.getFinishText();
        expect(typeTest.displayString).to.equal(`${chalk.red(`you have finished, press control r to go again. `)}
Words written: 0
Words per minute: ${chalk.green(`0`)}
You wrote 0 words in 30 seconds
Calculated words per minute: ${chalk.green(`0`)} (This is based on the time it takes to type any 5 chars)
Average Words Per Minute: ${chalk.green(`0`)}
${chalk.green(`High Score`)}
From: ${chalk.green(``)}
WPM:  ${chalk.green(`0`)}
AverageWPM: ${chalk.green(`0`)}`);
    });
});