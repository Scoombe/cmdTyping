import {expect} from 'chai';
import {cmdTyping} from '../src/typing';

let chalk = require("chalk");
let typeTest = new cmdTyping(printText, function(){console.log("finish has run");},0.01, true);
/**
 * @function to print the displayString text to the console.
 */
function printText() : void {
    
}

describe ( "typing.ts tests" , function(){
    typeTest.wordsTest.curDisplayText = "aaaaaaaaaaaa"
    it ( "should have the right display text ", function() {
        typeTest.getDisplayText(false)
        let text = getTestDisplayText("aaaaaaaaaaaa",0,0,0);
        expect(typeTest.displayString).to.equal(text);
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
    it ("Should check key chars correctly ", function() {
        typeTest.wordsTest.started = true;
        typeTest.wordsTest.CompleteText = "aaaaaaaaaaaa";
        typeTest.checkKey("b");
        expect(typeTest.displayString).to.equal(getTestDisplayText("aaaaaaaaaaaa",0,0,0,"a"));
        typeTest.checkKey("a");
        expect(typeTest.displayString).to.equal(getTestDisplayText("aaaaaaaaaaa",0,0,0,));
        typeTest.checkKey("a");
        expect(typeTest.displayString).to.equal(getTestDisplayText("aaaaaaaaaa",0,0,0));
        typeTest.checkKey("a");
        expect(typeTest.displayString).to.equal(getTestDisplayText("aaaaaaaaa",0,0,0));
        typeTest.checkKey("b");
        expect(typeTest.displayString).to.equal(getTestDisplayText("aaaaaaaaa",0,0,0,"a"));

    });
});

function getTestDisplayText(displayString: string, wordsTyping: number, AverageWPM: number, totalAverageWPM: number, errorText?: string,) : string{
    let text = ``;
    if(errorText){
        text = `${chalk.red(errorText)}
`;
    }
    text += `${displayString}
words typed: ${chalk.green(`${wordsTyping}`)}
word average WPM: ${chalk.green(`${AverageWPM}`)}
total average WPM: ${chalk.green(`${totalAverageWPM}`)}`
return text;
}