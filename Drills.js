'use strict';
//1. How many searches?

let sortedList = [3, 5, 6, 8, 11, 12, 14, 15, 17, 18];
let searches = 0;
function howManySearches(arry, target, start, end) {
    start = start === undefined ? 0 : start;
    end = end === undefined ? arry.length : end;

    if(start > end) {
        return -1;
    }

    const index = Math.floor((start + end) / 2);
    const item = arry[index];

    if (item === target) {
        searches++;
        return `it took ${searches} searches to find ${target}`;
    }
    else if (item < target) {
        searches++;
        return howManySearches(arry, target, index + 1, end);
    }
    else if (item > target) {
        searches++;
        return howManySearches(arry, target, start, index - 1);
    }
}
//console.log(howManySearches(sortedList, 8));
//console.log(howManySearches(sortedList, 16))

//2. Adding a React UI
//See src folder

//3. Find a book
function findBook(dewey, title) {
    let found = false
    let deweyArry = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    let titleArry = ['Green Eggs and Ham', 'The Grinch', 'Go Dog Go']

    let deweyIndex = howManySearches(deweyArry, dewey)
    let titleIndex = howManySearches(titleArry, title)

    if(deweyIndex && titleIndex) {
        found = true;
    }

    if(found) {
        return 'Book was found';
    } else {
        return 'Book could not be found;'
    }
}
console.log(findBook(3, 'The Grinch'))

//4. Searching in a BST

//5. Implement different tree traversals

//6. Find the next commanding officer

//7. Max profit

//8. Egg drop (optional)