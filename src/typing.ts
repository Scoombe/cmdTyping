let wordsPerMinTest = require('wpmtest');
wordsPerMinTest = wordsPerMinTest.wordsPerMinTest;

const chalk = require('chalk');

export class cmdTyping {

    wordsTest: any;
    gettingName: boolean = false;
    displayString: string = ``;
    printText: Function;
    getName: Function;
    /**
     * @constructor
     * @param  {Function} printText function that is passed to the class to print text
     * @param  {Function} getName function that gets the name
     */
    constructor(printText: Function, getName: Function, minutes: number, dummyFinish?: Boolean) {
        const context = this;
        if (dummyFinish) {
            this.wordsTest = new wordsPerMinTest(function() {}, minutes, { randomWords: false });
        } else {
            this.wordsTest = new wordsPerMinTest(function() { context.finished(context); }, minutes, { randomWords: false });
        }
        this.printText = printText;
        this.getName = getName;
    }

    /**
     * @function that starts the words per minute test
     * Also calls the countdown function
     */
    startTest(): void {
        this.wordsTest.restartTest();
        const context = this;
        const three: Function = function() { context.getDisplayText(true, '3'); };
        const two: Function = function() { context.getDisplayText(true, '2'); };
        const one: Function = function() { context.getDisplayText(true, '1'); };
        const go: Function = function() { context.go(context); };
        this.beginCountdown(three, two, one, go);
    }

    /**
     * @function that displays a countdown in the console.
     * Also calls the go function after 4 seconds
     */
    beginCountdown(three: Function, two: Function, one: Function, go: Function): void {
        this.getDisplayText(true);
        setTimeout(three, 1000);
        setTimeout(two, 2000);
        setTimeout(one, 3000);
        setTimeout(go, 4000);
    }

    /**
     * @function for starting the words test.
     * It clears the log
     * starts the stopwatch
     * And calls the display test function
     */
    go(context: any): void {
        context.getDisplayText(true, 'Type');
        context.wordsTest.started = true;
        context.wordsTest.startStopWatch();
    }

    /**
     * @function
     * @param  {string} keyEntered keychar to check
     */
    checkKey(keyEntered: string): void {
        if (this.wordsTest.started) {
            const charCheck = this.wordsTest.checkKeyChar(keyEntered);
            if (charCheck.isCharCorrect) {
                this.getDisplayText(true);
            } else {
                this.getDisplayText(true, charCheck.errorText);
            }
        } else if (!this.gettingName) {
            this.printText();
        }
    }

    /**
     * @function to display Text to the console.
     * @param  {boolean} clear: If the current text needs to be cleared or not.
     * @param  {string} error? Error text if there is one.
     * @returns void
     */
    getDisplayText(clear: boolean, error?: string): void {
        if (clear) {
            this.displayString = ``;
        }
        if (error) {
            this.displayString += `${chalk.red(error)}
`;
        }
        this.displayString += `${this.wordsTest.curDisplayText}
words typed: ${chalk.green(`${this.wordsTest.wordCount}`)}
word average WPM: ${chalk.green(`${this.wordsTest.lastTenAvWPM}`)}
total average WPM: ${chalk.green(`${this.wordsTest.averageWPM}`)}`;
        this.printText();
    }

    finished(context: {
        wordsTest: {
            started: boolean,
            done: boolean,
            checkHighscore: Function,
        },
        getFinishText: Function,
    }) {
        context.wordsTest.started = false;
        context.wordsTest.done = true;
        console.clear();
        if (context.wordsTest.checkHighscore()) {
            this.getName();
        } else {
            context.getFinishText();
        }
    }

    getFinishText(): void {
        this.displayString = `${chalk.red(`you have finished, press control r to go again. `)}
Words written: ${this.wordsTest.wordCount}
Words per minute: ${chalk.green(`${this.wordsTest.wordCount * 2}`)}
You wrote ${this.wordsTest.wordCount} words in 30 seconds
Calculated words per minute: ${chalk.green(`${(this.wordsTest.charPos  / 5) * 2}`)} (This is based on the time it takes to type any 5 chars)
Average Words Per Minute: ${chalk.green(`${this.wordsTest.averageWPM}`)}
${chalk.green(`High Score`)}
From: ${chalk.green(`${this.wordsTest.highscore.name}`)}
WPM:  ${chalk.green(`${this.wordsTest.highscore.wpm}`)}
AverageWPM: ${chalk.green(`${this.wordsTest.highscore.averageWPM}`)}`;
        this.printText();
    }
}
