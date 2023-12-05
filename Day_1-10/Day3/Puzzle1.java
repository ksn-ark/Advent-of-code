import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Puzzle1 {
    public static void main(String[] args) {

        String filePath = "C:\\Files\\Github\\Repositories\\Advent-of-code\\Day_1-10\\Day3\\Input.txt";

        String[] rawDataArray = readFile(filePath);

        int partNumberSum = 0;

        for (int i = 0; i < rawDataArray.length; i++) {
            String[] lineArray = rawDataArray[i].split("");
            for (int j = 0; j < lineArray.length; j++) {
                if (strisDigit(lineArray[j])) {

                    int numLength = 0;
                    String num = "";
                    while (strisDigit(lineArray[j + numLength]) == true) {
                        num += lineArray[j + numLength];
                        numLength += 1;
                        if (j + numLength == lineArray.length) {
                            break;
                        }
                    }

                    for (int k = i - 1; k < i + 2; k++) {
                        for (int l = j - 1; l < j + numLength + 1; l++) {
                            try {
                                if (rawDataArray[k].split("")[l].equals(".") == false
                                        && strisDigit(rawDataArray[k].split("")[l]) == false) {
                                    partNumberSum += Integer.parseInt(num);
                                }
                            } catch (ArrayIndexOutOfBoundsException e) {
                                continue;
                            }

                        }
                    }

                    j += numLength;
                }
            }
        }

        System.out.println(partNumberSum);
    }

    public static String[] readFile(String filePath) {

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

    public static boolean strisDigit(String str) {
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
