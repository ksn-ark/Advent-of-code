const fetchRawData = async () => {
  fetch("./Day2Data1.txt")
    .then((res) => res.text())
    .then((data) => interpretData(data));
};

const interpretData = (rawData) => {
  let gameArray = rawData.split("\r\n");
  const gameObjectsArray = gameArray.map((gameData) => ({
    game: defineGameObject(gameData),
  }));
  powerCalc(gameObjectsArray)
};

const defineGameObject = (gameData) => {
  const gameObject = new Object();
  gameObject.gameId = gameData.split(":")[0].split(" ")[1];

  roundsArray = gameData.split(":")[1].split(";");

  gameObject.rounds = roundsArray.map((round) => {
    const roundObject = new Object();
    const ballCountArray = round.split(",");
    for (ballCount in ballCountArray) {
      ballArray = ballCountArray[ballCount].split(" ");
      ballColor = ballArray[2];
      ballCount = parseInt(ballArray[1]);
      Object.defineProperty(roundObject, `${ballColor}`, {
        value: ballCount,
      });
    }

    return roundObject;
  });

  return gameObject;
};

const powerCalc = (gameObjectsArray) => {
    powerSum = 0;
    for (i in gameObjectsArray) {
        minRed = 0;
        minGreen = 0;
        minBlue = 0;

        game = gameObjectsArray[i].game

        for(j in game.rounds) {
            round = game.rounds[j]
            if(minRed<round.red){
                minRed=round.red
            }
            if(minBlue<round.blue){
                minBlue=round.blue
            }
            if(minGreen<round.green){
                minGreen=round.green
            }
        }
        gamePower=minRed*minBlue*minGreen
        powerSum+=gamePower
    }
    console.log(powerSum)
}

fetchRawData();