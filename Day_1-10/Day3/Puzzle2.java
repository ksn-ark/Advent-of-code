import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Puzzle2 {

  public static void main(String[] args) {
    String filePath =
      "C:\\Files\\Github\\Repositories\\Advent-of-code\\Day_1-10\\Day3\\Input.txt";

    String[] rawDataArray = readFile(filePath);

    int sumGearRatio = 0;

    for (int i = 0; i < rawDataArray.length; i++) {
      String[] lineArray = rawDataArray[i].split("");

      for (int j = 0; j < lineArray.length; j++) {
        if (lineArray[j].equals("*")) {
          int[] numArray = new int[2];
          int nums = 0;

          for (int k = i - 1; k < i + 2; k++) {
            String[] currentLineArray = rawDataArray[k].split("");

            for (int l = j - 1; l < j + 2; l++) {
              String num = "";
              int numLength = 0;

              try {
                while (strisDigit(currentLineArray[l - num.length()])) { // adds digits ahead of initial
                  // digit in contact with gear
                  num = currentLineArray[l - numLength] + num;
                  numLength += 1;
                }
              } catch (Exception e) {}

              if (num == "") { // if no digits were found ahead
                numLength = 0;
              } else {
                numLength = 1;
              }

              try {
                while (strisDigit(currentLineArray[l + numLength])) {
                  num += currentLineArray[l + numLength];
                  numLength += 1;
                }
              } catch (Exception e) {}

              try {
                numArray[nums] = Integer.parseInt(num);
                l += numLength - 1;
                nums += 1;
              } catch (Exception e) {}
            }
          }
          if (nums == 2) {
            sumGearRatio += numArray[0] * numArray[1];
          }
        }
      }
    }

    System.out.println(sumGearRatio);
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