"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = "./PuzzleInput.txt";
    const input = yield fetchInput(filePath);
    const cards = inputHandler(input);
    const totalScratchCards = totalCardsCalculator(cards);
    console.log(totalScratchCards);
    console.log(cards);
});
const totalCardsCalculator = (cards) => {
    let totalScratchCards = 0;
    cards.map((card) => {
        let matchingNumbers = 0;
        card.winningNumbers.forEach((winningNumber) => {
            if (card.cardNumbers.has(winningNumber)) {
                matchingNumbers += 1;
            }
        });
        cards.map(incard => {
            if (card.id < incard.id && incard.id <= card.id + matchingNumbers) {
                incard.cardCount += card.cardCount;
            }
            else {
                return;
            }
        });
    });
    cards.map((card) => (totalScratchCards += card.cardCount));
    return totalScratchCards;
};
const fetchInput = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(filePath);
    const inputData = yield response.text();
    return inputData;
});
const inputHandler = (inputCards) => {
    const rawCards = inputCards.split("\n");
    const cards = rawCards.map((rawCard) => new Card(rawCard));
    return cards;
};
class Card {
    constructor(rawCard) {
        const sections = rawCard.split(":");
        this.id = parseInt(sections[0].split(/ +/)[1]);
        [this.winningNumbers, this.cardNumbers] = sections[1].split("| ", 2).map((numbers) => new Set(numbers
            .trim()
            .split(/ +/)
            .map((number) => parseInt(number))));
        this.cardCount = 1;
    }
}
main();
