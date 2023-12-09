#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

char *readFile(char *filePath);

void main()
{
    char *filePath = "PuzzleInput.txt";

    char *input = readFile(filePath);

    printf("%s", input);
}

char *readFile(char *filePath)
{

    FILE *inputFile = fopen(filePath, "r");

    fseek(inputFile, 0, SEEK_END);
    long inputSize = ftell(inputFile);
    rewind(inputFile);

    char *outputBuffer = (char *)malloc(inputSize + 1);

    fread(outputBuffer, 1, inputSize, inputFile);

    outputBuffer[inputSize] = '\0';

    fclose(inputFile);

    return outputBuffer;
}