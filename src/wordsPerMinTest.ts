const randomWords = require("random-words");
export class wordsPerMinTest  {
    // holds the position that the user has got through the words
    charPos :number = 0;
    // the complete text from start to finish
    CompleteText: string = "";

    curDisplayText: string = "";
    done:boolean = false;
    averageWPM: number = 0;
    secTimer: number = 0;
    started = false;
    wordCount: number = 0;
    wordTimes:Array<number> = []; 

    
    /**
     * @param  {function} textGenerator? Optional Include different 
     */
    constructor(randomChars?: boolean) {
        if(randomChars)
        {
            this.generateChars(1000);
        }
        else{
            this.generateText();                        
        }
    }

    
    /**
     * @param  {number} charLen length of the char string to create
     * @returns void
     */
    generateChars(charLen: number) :void {
        let charString: string= "";
        let stringLength: number = 0;
        while (stringLength != charLen){
            charString += this.randomChar();
            if (stringLength %5 == 0 && stringLength != 0 && stringLength+1 != charLen)
            {
                charString+= " ";
            }
            stringLength = charString.length;
           
        }
        this.CompleteText = charString;
        this.curDisplayText = this.CompleteText.slice(0,100);
    }

    randomChar() :string {
        const charList: Array<string> = ["1","2","3","4","5","6","7","8","9","0","a","b","c","d","e","f","g","h","i","j","k","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","x","y","z","!","\"", "£","$","%","^","&","*",",","(",")",":","@","{","}","#","?",">","<","[","]","/","\\","<",">","\'",";"]
        let randomNum: number = Math.floor((Math.random() * charList.length));
        return charList[randomNum];
    }


    //method for generating random words 
    generateText() :void {
        let randWords: Array<string> = randomWords({exactly:200,maxLength:5});
        this.CompleteText = randWords.join(" ");
        this.curDisplayText = this.CompleteText.slice(0,100);
    }

    // function for getting 1 character
    getCurrentChar():string{
        return this.CompleteText.slice(this.charPos, this.charPos+1);
    }

    

    /**
     * @function:  getting the average time to do 5 chars and then calculating the average words per minute
     * @returns void
     */
    calcAverageWPM() :void {
        let totalTimes: number = 0;
        let count:number = 0;
        totalTimes = 0;
        count = 0;
        this.wordTimes.forEach(time => {
            totalTimes += time;
            count++;
        });
        // average time for a word to be written
        let averageTime:number; 
        averageTime = totalTimes / count;
        this.averageWPM =  60 / (averageTime / 1000) ;
    }

    /**
     * @function for checking if the key char is correct
     * @param  {string} keyPressChar
     * @returns {json} ReturnObj: isCharCorrect - bool: newWord - bool: ?errorText - string 
     * 
     * 
     */
    checkKeyChar(keyPressChar :string) :any {
        let currentChar:string = this.getCurrentChar();
        let returnObj :any = {newWord: false,isCharCorrect: false };
        if (this.started) {
            if (currentChar == keyPressChar) {
                if (this.charPos != 0 && this.charPos % 5 == 0) {
                    returnObj.newWord= true;
                }
                if (currentChar == " ") {
                    this.wordCount++;
                }
                this.charPos= this.charPos + 1;
                this.curDisplayText = this.CompleteText.slice(this.charPos,this.charPos+100);
                returnObj.isCharCorrect = true;
            }
            else {
                if (currentChar == " ") {
                    returnObj.errorText = "[space]";
                } 
                else {
                        returnObj.errorText = currentChar;
                }
            }
        }
        return returnObj;
    }

}