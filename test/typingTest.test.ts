
import {expect} from 'chai';
import {wordsPerMinTest} from "../src/wordsPerMinTest";


const wordsTest = new wordsPerMinTest;
describe( "Average Words Per Minute Test", function() { 
    it( "should have an correct words per mins", function() {
        // an average of one word per second
        wordsTest.wordTimes = [1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000];
        wordsTest.calcAverageWPM();
        expect(wordsTest.averageWPM).to.equal(60);
        // an average of 75 words per min
        wordsTest.wordTimes = [800,800,800,800,800,800,800,800,800,800,800,800,800,800,800,800,800,800,800,800,800,800];
        wordsTest.calcAverageWPM();
        expect(wordsTest.averageWPM).to.equal(75);
        // an average of 50 words per min
        wordsTest.wordTimes = [1200,1200,1200,1200,1200,1200,1200,1200,1200,1200,1200];
        wordsTest.calcAverageWPM();
        expect(wordsTest.averageWPM).to.equal(50);
    });
    it ("Should average out correctly",function(){
        // Should average out to one word a second
        wordsTest.wordTimes = [1200, 1000, 800];
        wordsTest.calcAverageWPM();
        expect(wordsTest.averageWPM).to.equal(60);
        // should average out as 1061.375 millie seconds to do a word
        // divide by 1000 and divide 60 by the result.
        wordsTest.wordTimes = [1200, 1000, 800, 999, 898, 1299, 1237, 1058];
        wordsTest.calcAverageWPM();
        expect(wordsTest.averageWPM).to.equal(56.53044399952891);
    })
});

describe( "Check Key Char test", function() {
    wordsTest.started = true;
    wordsTest.CompleteText = "aaaaa aaaaa aaaaa "
    it( "should check correct chars", function() {

        let checkKeyCharObj  = wordsTest.checkKeyChar("a");
        expect( checkKeyCharObj.isCharCorrect ).to.be.true;
        expect( checkKeyCharObj.newWord).to.be.false;
    })
    it( "should return error text", function() {
        let checkKeyCharObj = wordsTest.checkKeyChar("b");
        expect( checkKeyCharObj.isCharCorrect ).to.be.false;
        expect( checkKeyCharObj.newWord).to.be.false;
        expect( checkKeyCharObj.errorText).to.equal("a");
        wordsTest.checkKeyChar("a");
        wordsTest.checkKeyChar("a");
        wordsTest.checkKeyChar("a");
        wordsTest.checkKeyChar("a");
        checkKeyCharObj = wordsTest.checkKeyChar("a");
        expect( checkKeyCharObj.isCharCorrect ).to.be.false;
        expect( checkKeyCharObj.newWord).to.be.false;
        expect( checkKeyCharObj.errorText).to.equal("[space]");
    })
    it( "should be a new word", function() {
        let checkKeyCharObj = wordsTest.checkKeyChar(" ");
        expect( checkKeyCharObj.isCharCorrect ).to.be.true;
        expect( checkKeyCharObj.newWord).to.be.true;
        expect(wordsTest.wordCount).to.equal(1);
    })
})

describe ( "random Char tests", function() {
    it ( "should only return chars", function() {
        for (let i; i < 1000; i ++) {
            expect(typeof(wordsTest.randomChar)).to.equal("string");
        }
    })
})

describe ( "generating random Chars", function() {
    it ( "should return a certain number of random chars", function() {
        wordsTest.generateChars(100);
        expect(wordsTest.CompleteText.length).to.equal(100);
    }) 
    it ( " should have spaces in it ever 5th char from the 6th pos", function() {
        for(let i = 6; i < 100; i += 5)
        {
            expect(wordsTest.CompleteText.slice(i,i+1)).to.equal(" ");
        }       
    })
})