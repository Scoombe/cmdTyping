
import {expect} from 'chai';
import {wordsPerMinTest} from "../src/wordsPerMinTest";


describe( "Average Words Per Minute Test", function() { 
    it( "should have an correct words per mins", function() {
        const wordsTest = new wordsPerMinTest();
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
        const wordsTest = new wordsPerMinTest();
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
    const wordsTest = new wordsPerMinTest();
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
