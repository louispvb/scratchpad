package com.louispvb.CTCI;

import java.util.Arrays;
import java.util.HashMap;

public class Chapter1 {
    private static boolean p1isUnique(String input) {
        // Sort string
        char[] chars = input.toCharArray();
        Arrays.sort(chars);
        for (int i = 0; i < input.length() - 1; i++) {
            // Sorted string now has repeated characters in order, so return false if there are two of the same char
            if (chars[i] == chars[i+1]) return false;
        }
        return true;
        // Runs in O(nlogn) time and O(1) space depending on jdk sort implementation
    }

    private static boolean p1isUniqueAlt(String input) {
        // For every chari of chars, check charj of next chars if chari equals charj
        for (int i = 0; i < input.length() - 1; i++) {
            for (int j = i + 1; j < input.length(); j++) {
                if (input.charAt(i) == input.charAt(j)) return false;
            }
        }
        return true;
        // Runs in O(n^2) time and O(1) space
    }

    private static boolean p2checkPermutation(String a, String b) {
        // Sort both char arrays and compare equality
        char[] ca = a.toCharArray();
        char[] cb = b.toCharArray();
        Arrays.sort(ca);
        Arrays.sort(cb);
        return Arrays.equals(ca, cb);
        // Runs in O(nlogn) time
        // Could also keep a count of all characters and compare character counts of both strings, which would take O(n) time
    }

    private static String p3URLify(String input, int length) {
        char[] chars = input.toCharArray();
        // Move backwards through array, shifting letters to the end and converting spaces to URL representation
        for (int movePos = input.length() - 1, i = length - 1; i >= 0; i--) {
            if (chars[i] == ' ') {
                chars[movePos - 2] = '%';
                chars[movePos - 1] = '2';
                chars[movePos] = '0';
                movePos -= 3;
            } else {
                chars[movePos] = chars[i];
                movePos--;
            }
        }
        return new String(chars);
        // Runs in O(n) time
    }

    private static boolean p4PalindromePermutation(String input) {
        // Uppercase and lowercase letters treated equally
        // Spaces are ignored
        // Palindrome strings are strings with even count of each character if string is even length
        // if string is odd length, palindrome additionally has one character that has odd count
        String lowercased = input.toLowerCase();
        HashMap<Character, Integer> counts = new HashMap<Character, Integer>(input.length());

        int nonSpaceLength = 0;
        for (char c : input.toCharArray()) {
            if (c != ' ') {
                nonSpaceLength++;
                if (counts.containsKey(c)) {
                    counts.put(c, counts.get(c) + 1);
                } else {
                    counts.put(c, 1);
                }
            }
        }

        int oddCount = counts.values().stream().mapToInt(i -> i)
                .reduce(0, (acc, x) -> x % 2 == 0 ? acc : acc + 1);

        boolean inputOddLength = nonSpaceLength % 2 != 0;

        if (inputOddLength && oddCount == 1) {
            return true;
        } else if (!inputOddLength && oddCount == 0) {
            return true;
        } else {
            return false;
        }
    }

    private static boolean p5oneAway(String original, String edited) {
        // Compute string difference by substracting characters from the edited string from original
        String difference = original;
        for (char c : edited.toCharArray()) {
            for (int i = 0; i < difference.length(); i++) {
                if (difference.charAt(i) == c) {
                    difference = difference.substring(0, i) + difference.substring(i + 1);
                    break;
                }
            }
        }
        // Edited is one or zero away if difference is one character long or zero chars long but with only one or less insertions
        return difference.length() == 1 ||
                (difference.length() == 0 && (edited.length() - original.length() <= 1));
    }

    private static String p6stringCompression(String input) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < input.length(); i++) {
            int cmprCount = 0;
            int j = i;
            for (; j < input.length() && input.charAt(i) == input.charAt(j); j++, cmprCount++);
            sb.append(input.charAt(i) + Integer.toString(cmprCount));
            i = j - 1;
        }
        String compressed = sb.toString();
        return compressed.length() >= input.length() ? input : compressed;
    }

    private static void swap(int[][] matrix, int i, int j, int i2, int j2) {
        int temp = matrix[i][j];
        matrix[i][j] = matrix[i2][j2];
        matrix[i2][j2] = temp;
    }

    private static void printMatrix(int[][] matrix, int elemPadding) {
        for (int i = 0; i < matrix.length; i++) {
            StringBuilder sb = new StringBuilder();
            for (int j = 0; j < matrix[i].length; j++) {
                sb.append(String.format("%-"+elemPadding+"s", Integer.toString(matrix[i][j])) + " ");
            }
            System.out.println(sb.toString());
        }
    }
    private static void p7rotateMatrix(int[][] matrix) {
        // (0,0) (0,1) (0,2)
        // (1,0) (1,1) (1,2)
        // (2,0) (2,1) (2,2)

        // (2,0) (1,0) (0,0)
        // (2,1) (1,1) (0,1)
        // (2,2) (1,2) (0,2)

        // 4 way swap
        // There are ceil(length/2) rings, where a ring is a ring of elements forming a hollow square in a matrix
        for (int ring = 0; ring < Math.ceil(matrix.length/2.0); ring++) {
            int beg = ring; // Edge begin index
            int end = matrix.length - 1 - ring; // Edge end index

            // For every elem of edge
            for (int i = beg, offset = 0; i < end; i++, offset++) {
                // top edge (first row, ith col)
                // right edge (ith row, last col)
                // bottom edge (last row, last - offset col)
                // left edge (last - offset row, first col)

                // Perform rotation of 4 elems on the ring
                int temp = matrix[beg][i]; // store top temp
                matrix[beg][i] = matrix[end - offset][beg]; // left to top
                matrix[end - offset][beg] = matrix[end][end - offset]; // bottom to left
                matrix[end][end - offset] = matrix[i][end]; // right to bottom
                matrix[i][end] = temp; // top to right
            }
        }
    }

    private static void p8zeroMatrix(int[][] matrix) {
        // Zero the column and row when encountering a zero elem
        // Skip over the newly zerod columns when checking for zero elems by adding previously zeroed cols and rows to blacklist
        // Blacklist is at most M rows and N columns in MxN
        int[] rowBlacklist = new int[matrix.length];
        int[] colBlacklist = new int[matrix[0].length];

        for (int m = 0; m < matrix.length; m++) {
            if (rowBlacklist[m] == 1) continue;
            for (int n = 0; n < matrix[m].length; n++) {
                if (colBlacklist[n] == 1) continue;
                if (matrix[m][n] == 0) {
                    // zero row
                    for (int i = 0; i < matrix[0].length; i++) {
                        matrix[m][i] = 0;
                    }
                    rowBlacklist[m] = 1;

                    // zero col
                    for (int i = 0; i < matrix.length; i++) {
                        matrix[i][n] = 0;
                    }
                    colBlacklist[n] = 1;

                    break; // Skip this row now that it has been zeroed
                }
            }
        }
    }

    private static boolean p9stringRotation(String s1, String s2) {
        if (s1.length() != s2.length()) return false;
        return (s2 + s2).contains(s1);
    }

    public static void runChapter() {
        System.out.println(p1isUnique("abracadabra"));
        System.out.println(p1isUnique("algorithms"));
        System.out.println(p1isUniqueAlt("abracadabra"));
        System.out.println(p1isUniqueAlt("algorithms"));

        System.out.println(p2checkPermutation("banana", "bnnaaa"));
        System.out.println(p2checkPermutation("banana", "bnnaaaa"));

        System.out.println(p3URLify("Mr John Smith    ", 13));

        System.out.println(p4PalindromePermutation("taco cat"));

        System.out.println(p5oneAway("pale", "bale"));

        System.out.println(p6stringCompression("aabcccccaaa"));
        System.out.println(p6stringCompression("aardvark"));

        int[][] matrix = new int[][] {
//                {1,2,3},
//                {4,5,6},
//                {7,8,9}
                {1,2,3,4},
                {5,6,7,8},
                {9,10,11,12},
                {13,14,15,16}
        };

        p7rotateMatrix(matrix);
        printMatrix(matrix, 2);

        System.out.println("---");
        matrix = new int[][] {
//                {1,2,3},
//                {4,5,6},
//                {7,8,9}
                {1,2,3,4},
                {5,6,0,8},
                {9,10,11,12},
                {0,14,15,16}
        };

        p8zeroMatrix(matrix);
        printMatrix(matrix, 2);

        System.out.println(p9stringRotation("waterbottle", "erbottlewat"));
        System.out.println(p9stringRotation("waterbottle", "erbottlewtt"));
    }
}
