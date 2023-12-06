import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Puzzle1 {

  public static void main(String[] args) {
    String filePath =
      "C:\\Files\\Github\\Repositories\\Advent-of-code\\Day_1-10\\Day3\\Input.txt";

    String[] rawDataArray = readFile(filePath);

    int partNumberSum = 0;

    for (int i = 0; i < rawDataArray.length; i++) {
      String[] lineArray = rawDataArray[i].split("");

      for (int j = 0; j < lineArray.length; j++) {
        if (strisDigit(lineArray[j])) {
          int numLength = 0;
          String num = "";

          // adds digits together as string to make the full number

          while (strisDigit(lineArray[j + numLength]) == true) { // checks the next item in the row is a digit
            num += lineArray[j + numLength]; // adds the digit to the number
            numLength += 1;
            if (j + numLength == lineArray.length) { // breaks the loop if we have hit the end of a line
              break;
            }
          }

          for (int k = i - 1; k < i + 2; k++) { // loops through the row above, of and below the number
            for (int l = j - 1; l < j + numLength + 1; l++) { // loops through the columns before the first
              // digit's column, above each digit's column,
              // and after the last digit's column
              try {
                if (
                  rawDataArray[k].split("")[l].equals(".") ==
                  false && // checks if not a dot
                  strisDigit(rawDataArray[k].split("")[l]) == false
                ) { // checks its not
                  // another number
                  partNumberSum += Integer.parseInt(num); // adds the number as a valid part number
                }
              } catch (ArrayIndexOutOfBoundsException e) { // for when it's trying to check invalid
                // rows/columns
                continue;
              }
            }
          }

          j += numLength; // j is the column, since the number has already been processed, number of
          // digits is added to the column so it picks off from the column right after the
          // number (I suspect it may be starting from the one after that, but is
          // irrelevant here as adjacent numbers are not a thing)
        }
      }
    }

    System.out.println(partNumberSum);
  }

  public static String[] readFile(String filePath) { // helper funciton, reads file, returns array of lines
    String rawData = "";

    try {
      BufferedReader br = new BufferedReader(new FileReader(filePath));

      String line;

      while ((line = br.readLine()) != null) {
        rawData += line + ",";
      }

      rawData = rawData.substring(0, rawData.length() - 1);
      String[] rawDataArray = rawData.split(",", 0);

      br.close();

      return rawDataArray;
    } catch (IOException e) {
      e.printStackTrace();
      return new String[1];
    }
  }

  public static boolean strisDigit(String str) { // helper function to check if a string is a digit
    try {
      int a = Integer.parseInt(str);
      if (a == 0) {
        return true;
      }
      return true;
    } catch (NumberFormatException e) {
      return false;
    }
  }
}
