'use strict';

//Linear searches check items one-by-one until it finds what it is looking for
//Example of a linear search algorithm:
function indexOf(array, value) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == value) {
            return i;
        }
    }
    return -1;
};
//The best case time complexity is O(1) if the desired item is index 0
//The average case time complexity is O(n) if the desired item is in the middle of the array
//The worst case time complexity is O(n) if the item is at the end or not in the array


//Binary searches take a divide-and-conquer approach to finding an item
//This type of search only works on sorted arrays
//Example of a binary search algorithm:
function binarySearch(array, value, start, end) {
    var start = start === undefined ? 0 : start;
    var end = end === undefined ? array.length : end;

    if (start > end) {
        return -1;
    }

    const index = Math.floor((start + end) / 2);
    const item = array[index];

    console.log(start, end);
    if (item == value) {
        return index;
    }
    else if (item < value) {
        return binarySearch(array, value, index + 1, end);
    }
    else if (item > value) {
        return binarySearch(array, value, start, index - 1);
    }
};
//The best case time complexity is O(1) if the desired item is in the middle of the array
//The average case time complexity and worst case time complexity are both O(log(n))


//Depth-First Search (DFS) for searching trees starts at a given node (typically the root), then goes as far down as it can
//If it hits a node that has either already been visited or has no children, it begins to backtrack
//Example that would be instantiated in a BST below:
dfs(values=[]) {
    if (this.left) {
        values = this.left.dfs(values);
    }
    values.push(this.value);

    if (this.right) {
        values = this.right.dfs(values);
    }
    return values;
}
//DFS are O(n) time complexity
//Note that the above example uses in-order traversal search (left, root, right)


//Breadth-First search (BFS) for searching trees starts at a given node, then searches row-by-row
//This continues until it runs out of rows or finds the target value
//BFS requies a FIFO Queue so that all siblings can be stored and processed in order
//Example that would be instantiated in a BST below:
bfs(tree, values = []) {
    const queue = new Queue(); // Assuming a Queue is implemented (refer to previous lesson on Queue)
    const node = tree.root;
    queue.enqueue(node);
    while (queue.length) {
        const node = queue.dequeue(); //remove from the queue
        values.push(node.value); // add that value from the queue to an array

        if (node.left) {
            queue.enqueue(node.left); //add left child to the queue
        }

        if (node.right) {
            queue.enqueue(node.right); // add right child to the queue
        }
    }

    return values;
}
//BFS are O(n) time complexity