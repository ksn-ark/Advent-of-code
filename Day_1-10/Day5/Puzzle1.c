#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>
#include <stdbool.h>

char *readFile(char *filePath);
long long *extractSeeds(char *seedSection);

long long ***extractData(char **sections);
long long **extractSection(char *sectionDataBuffer);

char *cleanInput(char *inputTemp);
char *tokenizeInput(char *input);
char **splitIntoSections(char *input);

long long dataSections = 8;
long long mapSections = 3;

void main()
{
    char *filePath = "PuzzleInput.txt";

    char *input = readFile(filePath);

    char **sections = splitIntoSections(input);

    long long *seeds = extractSeeds(sections[0]);

    long long ***data = extractData(sections);

    for (long long section = 1; section < dataSections; section++)
    {
        for (long long map = 0;; map++)
        {
            if (data[section][map][0] == -1)
            {
                printf("section %i has %i maps\n", section, map);
                break;
            }
            for (long long value = 0; value < mapSections; value++)
            {
                printf("%lld ", data[section][map][value]);
            }
            printf("\n");
        }
        printf("\n");
    }

    free(input);
}

long long *extractSeeds(char *input)
{

    char *token = strtok(input, ":");
    char *seedsBuffer = strtok(NULL, ":");
    long long *seeds = (long long *)malloc(strlen(seedsBuffer) * sizeof(int));

    char *seed = strtok(seedsBuffer, " ");

    long long i = 0;

    while (seed != NULL)
    {
        seeds[i] = atoi(seed);
        seed = strtok(NULL, " ");
        i++;
    }

    return seeds;
}

long long ***extractData(char **sections)
{
    long long ***data = (long long ***)malloc(dataSections * sizeof(long long **));

    long long seedValueCheck = 0;

    for (long long i = 1; i < dataSections; i++)
    {
        char *token = strtok(sections[i], ":\n");

        char *sectionDataBuffer = strtok(NULL, ":");

        long long **sectionData = extractSection(sectionDataBuffer);

        data[i] = sectionData;
    }

    return data;
}

long long **extractSection(char *sectionRaw)
{

    char *line = strtok(sectionRaw, "\n");

    char **lines = (char **)malloc((strlen(sectionRaw)) * sizeof(char *));

    long long lineIterator = 0;

    while (line != NULL)
    {
        lines[lineIterator] = strdup(line);

        line = strtok(NULL, "\n");

        lineIterator++;
    }

    long long **sectionData = (long long **)malloc(strlen(sectionRaw) * sizeof(long long *));

    long long i = 0;

    while (lineIterator > i)
    {
        long long *lineData = (long long *)malloc(mapSections * sizeof(long long));

        char *token = strtok(lines[i], " ");
        for (long long j = 0; j < mapSections; j++)
        {
            lineData[j] = strtoull(token, NULL, 10);

            token = strtok(NULL, " ");
        }
        sectionData[i] = lineData;

        i++;
    }

    long long *guardValue = (long long *)malloc(1 * sizeof(long long));

    guardValue[0] = -1;

    sectionData[i] = guardValue;

    return sectionData;
}

char **splitIntoSections(char *input)
{
    char **output = (char **)malloc(dataSections * sizeof(char *));

    char *tokenizableInput = tokenizeInput(input);

    char *token = strtok(tokenizableInput, "#");

    long long i = 0;

    while (i < dataSections)
    {
        output[i] = token;
        token = strtok(NULL, "#");
        i++;
    };

    output[dataSections] = NULL;

    return output;
}

char *tokenizeInput(char *input)
{

    char uniqueToken[] = "#";

    char *tempString = input;

    while ((tempString = strstr(input, "\n\n")) != NULL)
    {
        strncpy(tempString, uniqueToken, strlen(uniqueToken));
    }
    return input;
}

char *readFile(char *filePath)
{

    FILE *inputFile = fopen(filePath, "r");

    fseek(inputFile, 0, SEEK_END);

    long long inputSize = ftell(inputFile);

    rewind(inputFile);

    char *outputBuffer = (char *)malloc(inputSize);

    fread(outputBuffer, 1, inputSize, inputFile);

    outputBuffer[strlen(outputBuffer) - 8] = '\0';

    fclose(inputFile);

    return outputBuffer;
}