import {expect} from 'chai';
import {cmdTyping} from '../src/typing';

let chalk = require("chalk");
let typeTest = new cmdTyping(printText, function(){console.log("finish has run");},0.01);
/**
 * @function to print the displayString text to the console.
 */
function printText() : void {
    
}

describe ( "typing.ts tests" ,function(){
    typeTest.wordsTest.curDisplayText = "aaaaaaaaaaaa"
    it ( "should have the right display text ", function() {
        typeTest.getDisplayText(false)
        expect(typeTest.displayString).to.equal(`aaaaaaaaaaaa
words typed: ${chalk.green(`0`)}
word average WPM: ${chalk.green(`0`)}
total average WPM: ${chalk.green(`0`)}`);
    });
});

