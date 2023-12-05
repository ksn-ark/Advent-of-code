sum=0;

stringNumbers = ["0","1","2","3","4","5","6","7","8","9"]

stringNumbersSpelled = ["zero","one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

f = open("C:\Files\Github\Repositories\Advent-of-code\Day 1-10\Day1\Day1Dataset1.txt", "r");

input = f.read()

inputArray = input.split()

for word in inputArray:

    firstNumberedWord = ""

    for letter in word :
        firstNumberedWord+=letter
        for number in stringNumbersSpelled :
            firstNumberedWord = firstNumberedWord.replace(number, stringNumbers[stringNumbersSpelled.index(number)])

    for letter in firstNumberedWord:

        if letter in stringNumbers :
            firstDigit=str(stringNumbers.index(letter))
            break;
    
    secondNumberedWord = ""

    for letter in word[::-1] :
        secondNumberedWord=letter+secondNumberedWord
        for number in stringNumbersSpelled :
            secondNumberedWord = secondNumberedWord.replace(number, stringNumbers[stringNumbersSpelled.index(number)])
    
    for letter in secondNumberedWord:
        if letter in stringNumbers :
            secondDigit=str(stringNumbers.index(letter))
    
    twoDigitValue=firstDigit+secondDigit
    sum+=int(twoDigitValue)

print(sum)