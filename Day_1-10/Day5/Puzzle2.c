#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>
#include <stdbool.h>

char *readFile(char *filePath);
long long *extractSeeds(char *seedSection);
int countSeeds(long long *seeds);

long long ***extractData(char **sections);
long long **extractSection(char *sectionDataBuffer);

long long **constructSeedsData(long long *seeds, long long ***data, int seedCount);
long long mapToSection(long long **maps, long long valueToMap);

char *cleanInput(char *inputTemp);
char *tokenizeInput(char *input);
char **splitIntoSections(char *input);
long long lowestValue(long long *NumberArray, int arrayLength);

long long dataSections = 8;
long long mapSections = 3;
long long locationSection = 7;

void main()
{
    char *filePath = "PuzzleInput.txt";

    char *input = readFile(filePath);

    char **sections = splitIntoSections(input);

    long long *seeds = extractSeeds(sections[0]);

    const int seedCount = countSeeds(seeds);

    long long ***data = extractData(sections);

    long long **seedsData = constructSeedsData(seeds, data, seedCount);

    long long *locationArray = (long long *)malloc(seedCount * sizeof(long long));

    for (int seed = 0; seed < seedCount; seed++)
    {
        locationArray[seed] = seedsData[seed][locationSection];
    }

    long long lowestLocation = lowestValue(locationArray, seedCount);

    printf("lowest %lld", lowestLocation);

    free(input);
}

long long **constructSeedsData(long long *seeds, long long ***data, int seedCount)
{
    long long **seedsData = (long long **)malloc(seedCount * sizeof(long long *));

    for (long long seed = 0; seed < seedCount; seed++)
    {
        long long *seedData = (long long *)malloc(dataSections * sizeof(long long));

        seedData[0] = seeds[seed];

        for (long long section = 1; section < dataSections; section++)
        {
            seedData[section] = mapToSection(data[section], seedData[section - 1]);
        }

        seedsData[seed] = seedData;
    }

    return seedsData;
}

long long mapToSection(long long **maps, long long valueToMap)
{
    long long mappedValue = valueToMap;

    for (int map = 0; maps[map][0] != -1; map++)
    {
        if (maps[map][1] <= valueToMap && valueToMap <= ((maps[map][1] + maps[map][2]) - 1))
        {
            mappedValue = valueToMap + (maps[map][0] - maps[map][1]);

            // printf("mapped value %lld valueToMap %lld map start %lld map end %lld \nmap length %lld map start - end %lld \n", mappedValue, valueToMap, maps[map][0], maps[map][1], maps[map][2], (maps[map][0] - maps[map][1]));
            break;
        }
    }

    return mappedValue;
}

long long *extractSeeds(char *seedSection)
{

    char *token = strtok(seedSection, ":");
    char *seedsBuffer = strtok(NULL, ":");
    long long *seeds = (long long *)malloc(strlen(seedsBuffer) * sizeof(long long));

    char *seed = strtok(seedsBuffer, " ");

    long long i = 0;

    while (seed != NULL)
    {
        seeds[i] = strtoull(seed, NULL, 10);
        seed = strtok(NULL, " ");
        i++;
    }

    seeds[i] = -1;

    return seeds;
}

int countSeeds(long long *seeds)
{
    int seedCount = 0;
    for (int i = 0; seeds[i] != -1; i++)
    {
        seedCount++;
    }
    return seedCount;
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

    outputBuffer[strlen(outputBuffer)] = '\0';

    fclose(inputFile);

    return outputBuffer;
}

long long lowestValue(long long *valueArray, int arrayLength)
{
    long long lowestValue = valueArray[0];

    for (int i = 0; i < arrayLength; i++)
    {
        if (lowestValue > valueArray[i])
        {
            lowestValue = valueArray[i];
        }
    }

    return lowestValue;
}