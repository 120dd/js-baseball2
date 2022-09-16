import { $ } from './utils.js';
import { SELECTORS } from "./constants.js";

export default class BaseBallGame {
    #randomNum;
    
    constructor() {
        this.init();
    }
    
    init() {
        this.#randomNum = this.createRandomNum();
        console.log(this.#randomNum);
        $('#result').innerHTML = '';
        $('#game-restart-button').style.display = 'none'
        this.registerSubmitEvent();
        this.registerRestart();
        $(`#${SELECTORS.INPUT}`).value = '';
    }
    
    registerRestart() {
        $('#game-restart-button').addEventListener('click', () => {
            this.init();
        })
    }
    
    getRandomNumber() {
        return MissionUtils.Random.pickNumberInRange(1, 9);
    }
    
    createRandomNum() {
        const numSet = new Set;
        while (numSet.size < 3) {
            numSet.add(this.getRandomNumber());
        }
        const numArr = [...numSet];
        return Number(numArr.join(''));
    }
    
    getUserInputValue() {
        return Number($(`#${SELECTORS.INPUT}`).value);
    }
    
    registerSubmitEvent() {
        $(`#${SELECTORS.SUBMIT}`).addEventListener('click', (e) => {
            e.preventDefault();
            if (isNaN(this.getUserInputValue())) {
                alert('숫자를 입력하시오');
                return
            }
            const result = this.play(this.#randomNum, this.getUserInputValue());
            this.printResult(result);
            if (result === '축하합니다!') {
                console.log(1122);
                $('#game-restart-button').style.display = 'block'
            }
        })
    }
    
    play(num1, num2) {
        const totalScore = this.getTotalScore(num1, num2);
        const strikeScore = this.getStrikeScore(num1, num2);
        const ballScore = totalScore - strikeScore;
        return this.getResult({ ball: ballScore, strike: strikeScore });
    }
    
    getTotalScore(num1, num2) {
        let totalScore = 0;
        const num1Arr = [...num1.toString()];
        const num2Arr = [...num2.toString()];
        num1Arr.forEach(num => {
            if (num2Arr.includes(num)) {
                totalScore ++
            }
        });
        return totalScore;
    }
    
    getStrikeScore(num1, num2) {
        let strikeScore = 0;
        const num1Arr = [...num1.toString()];
        const num2Arr = [...num2.toString()];
        num1Arr.forEach((num, idx) => {
            if (num === num2Arr[ idx ]) {
                strikeScore ++
            }
        })
        return strikeScore;
    }
    
    getResult({ ball, strike }) {
        if (ball === 0 && strike === 0) {
            return `낫싱`;
        }
        if (ball !== 0 && strike === 0) {
            return `${ball}볼`;
        }
        if (strike === 3) {
            return `축하합니다!`;
        }
        if (ball === 0 && strike !== 0) {
            return `${strike}스트라이크`;
        }
        if (ball !== 0 && strike !== 0) {
            return `${ball}볼 ${strike}스트라이크`;
        }
    }
    
    printResult(result) {
        $(`#${SELECTORS.RESULT}`).innerText = result;
    }
}

const baseBallGame = new BaseBallGame();