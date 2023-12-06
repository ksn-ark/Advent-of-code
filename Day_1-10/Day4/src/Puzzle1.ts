const main = async (): Promise<void> => {
  const filePath = "./PuzzleInput.txt";
  const input = await fetchInput(filePath);
  const cards = await inputHandler(input);
  const totalPoints: number = pointCalculator(cards);
  console.log(totalPoints);
};

const pointCalculator = (cards: Card[]) => {
  let totalPoints: number = 0;
  cards.map((card) => {
    let pointPower: number = 0;
    card.winningNumbers.forEach((winningNumber: number) => {
      if (card.cardNumbers.has(winningNumber)) {
        pointPower += 1;
      }
    });
    totalPoints += pointPower === 0 ? 0 : 2 ** (pointPower - 1);
  });
  return totalPoints;
};

const fetchInput = async (filePath: string): Promise<string> => {
  const response = await fetch(filePath);
  const inputData = await response.text();
  return inputData;
};

const inputHandler = (inputCards: string): Card[] => {
  const rawCards: string[] = inputCards.split("\n");
  const cards: Card[] = rawCards.map((rawCard: string) => new Card(rawCard));
  return cards;
};

class Card {
  id: number;
  winningNumbers: Set<any>;
  cardNumbers: Set<any>;

  constructor(rawCard: string) {
    const sections: string[] = rawCard.split(":");
    this.id = parseInt(sections[0].split(/ +/)[1]);

    [this.winningNumbers, this.cardNumbers] = sections[1].split("| ", 2).map(
      (numbers: string) =>
        new Set(
          numbers
            .trim()
            .split(/ +/)
            .map((number: string) => parseInt(number))
        )
    );
  }
}

interface Card {
  id: number;
  winningNumbers: Set<any>;
  cardNumbers: Set<any>;
}

main();
