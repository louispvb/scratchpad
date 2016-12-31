package com.louispvb.CTCI;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.ListIterator;

public class Chapter2 {
    private static <T> LinkedList<T> p1removeDups(LinkedList<T> list) {
        // iterate through list
        for (ListIterator<T> i = list.listIterator(0); i.hasNext();) {
            T elem = i.next();
            // save index to return iterator to previous location after scanning rest of list
            int savedIndex = i.nextIndex();

            while (i.hasNext()) {
                // scan rest of list removing any duplicated elems
                T restElem = i.next();
                if (elem.equals(restElem)) {
                    i.remove();
                }
            }

            // reset list iterator to next index
            i = list.listIterator(savedIndex);
        }
        return list;
    }

    private static <T> T p2kthToLast(LinkedList<T> list, int k) {
        // Compute list length by iterating through once
        int length = 0;
        for (T e : list) {
            length++;
        }
        // Return
        return list.get(length - 1 - k);
    }

    private static <T> LinkedList<T> p3deleteMiddle(LinkedList<T> list) {
        int length = list.size();

        // A middle element can be reached when a fast iterator reaches the end, the the slower iterator is in the middle

        ListIterator<T> it = list.listIterator(), fastIt = list.listIterator();
        while (fastIt.hasNext()) {
            it.next();
            fastIt.next();
            if (fastIt.hasNext()) fastIt.next();
        }
        it.remove();
        return list;
    }

    private static <T extends Comparable> LinkedList<T> p4partition(LinkedList<T> list, T divider) {
        // Make two new lists for elems greater and less than divider
        LinkedList<T> lessThan = new LinkedList<T>();
        LinkedList<T> greaterOrEqual = new LinkedList<T>();
        // Add all elems in original lists to these two lists
        for (T elem : list) {
            if (divider.compareTo(elem) < 0) {
                lessThan.add(elem);
            } else {
                greaterOrEqual.add(elem);
            }
        }
        // Concatenate lists
        greaterOrEqual.addAll(lessThan);
        return greaterOrEqual;
    }

    private static <T> void printList(LinkedList<T> list) {
        System.out.println(Arrays.toString(list.toArray()));
    }

    private static int p5sumLists(LinkedList<Integer> digits1, LinkedList<Integer> digits2) {
        int sumDigits1 = 0;
        int factor = 1;
        for (Integer i : digits1) {
            sumDigits1 += factor * i;
            factor *= 10;
        }
        int sumDigits2 = 0;
        factor = 1;
        for (Integer i : digits2) {
            sumDigits2 += factor * i;
            factor *= 10;
        }
        return sumDigits1 + sumDigits2;

        // Follow up: if the digits were in forward order I would count the elements and then start my factor as
        // 10^count and then divide the factor by 10 on each digit
    }

    private static <T> boolean p6palindrome(LinkedList<T> list) {
        // Check equality for elems going forwards to elems going backwards
        for (ListIterator<T> forward = list.listIterator(0), backward = list.listIterator(list.size());
                forward.hasNext() && backward.hasPrevious() && forward.nextIndex() <= backward.previousIndex();) {
            T forwardElem = forward.next();
            T backwardElem = backward.previous();
            if (forwardElem != backwardElem) return false;
        }
        return true;
    }

    // For problem 7, 'intersection', I would use a custom linked list implementation to have access to nodes.
    // Then count how many elems it takes to get to the end from both list heads, then get the difference
    // then skip difference amount of nodes on the longer list to get, then start from that node and the other list head
    // for another loop on both until the looping nodes of both are equal

    // For problem 8, 'loop detection', I would use a fast iterator going 2x the speed of a slow iterator. There is a loop
    // When both iterators are within range of another

    public static void runChapter() {
        LinkedList<Integer> list = new LinkedList<>();
        list.add(2);
        list.add(2);
        list.add(1);
        list.add(3);
        list.add(1);
        list.add(1);
        p1removeDups(list);
        printList(list);

        System.out.println(p2kthToLast(list, 1));

        list.add(4);
        list.add(5);
        printList(p3deleteMiddle(list));

        list.add(3);
        list.add(0);
        printList(p4partition(list, 2));

        LinkedList<Integer> d1 = new LinkedList<>();
        d1.add(7);
        d1.add(1);
        d1.add(6);
        LinkedList<Integer> d2 = new LinkedList<>();
        d2.add(5);
        d2.add(9);
        d2.add(2);
        System.out.println(p5sumLists(d1, d2));

        LinkedList<Character> palindrome = new LinkedList<>();
        for (char c : "tacocat".toCharArray()) {
            palindrome.add(c);
        }
        System.out.println(p6palindrome(palindrome));
    }
}
