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
//console.log(findBook(3, 'The Grinch'))

//4. Searching in a BST
//Answer: The post-order traversal is 14, 19, 15, 27, 25, 79, 90, 91, 89, 35.  The pre-order traversal for the second tree is 8, 6, 5, 7, 10, 9, 11.

//5. Implement different tree traversals

class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
      this.key = key;
      this.value = value;
      this.parent = parent;
      this.left = null;
      this.right = null;
    }
    insert(key, value) {
      // If the tree is empty then this key being inserted is the root node of the tree
      if (this.key === null) {
        this.key = key;
        this.value = value;
      }
      /* If the tree already exists, then start at the root, 
          and compare it to the key you want to insert.
          If the new key is less than the node's key 
          then the new node needs to live in the left-hand branch */
      else if (key < this.key) {
      /* If the existing node does not have a left child, 
          meaning that if the `left` pointer is empty, 
          then we can just instantiate and insert the new node 
          as the left child of that node, passing `this` as the parent */
        if (this.left === null) {
          this.left = new BinarySearchTree(key, value, this);
        }
        /* If the node has an existing left child, 
             then we recursively call the `insert` method 
             so the node is added further down the tree */
        else {
          this.left.insert(key, value);
        }
      }
      /* Similarly, if the new key is greater than the node's key 
          then you do the same thing, but on the right-hand side */
      else {
        if (this.right === null) {
          this.right = new BinarySearchTree(key, value, this);
        }
        else {
          this.right.insert(key, value);
        }
      }
    }
    find(key) {
      // If the item is found at the root then return that value
      if (this.key === key) {
        return this.value;
      }
      /* If the item you are looking for is less than the root 
         then follow the left child.
         If there is an existing left child, 
         then recursively check its left and/or right child
         until you find the item */
      else if (key < this.key && this.left) {
        return this.left.find(key);
      }
      /* If the item you are looking for is greater than the root 
         then follow the right child.
         If there is an existing right child, 
         then recursively check its left and/or right child
         until you find the item */
      else if (key > this.key && this.right) {
        return this.right.find(key);
      }
      // You have searched the tree and the item is not in the tree
      else {
        throw new Error('Key Error');
      }
    }
    remove(key) {
      if (this.key === key) {
        if (this.left && this.right) {
          const successor = this.right._findMin();
          this.key = successor.key;
          this.value = successor.value;
          successor.remove(successor.key);
        }
        /* If the node only has a left child, 
             then you replace the node with its left child */
        else if (this.left) {
          this._replaceWith(this.left);
        }
        /* And similarly if the node only has a right child 
             then you replace it with its right child */
        else if (this.right) {
          this._replaceWith(this.right);
        }
        /* If the node has no children then
             simply remove it and any references to it 
             by calling "this._replaceWith(null)" */
        else {
          this._replaceWith(null);
        }
      }
      else if (key < this.key && this.left) {
        this.left.remove(key);
      }
      else if (key > this.key && this.right) {
        this.right.remove(key);
      }
      else {
        throw new Error('Key Error');
      }
    }
    _replaceWith(node) {
      if (this.parent) {
        if (this === this.parent.left) {
          this.parent.left = node;
        }
        else if (this === this.parent.right) {
          this.parent.right = node;
        }
  
        if (node) {
          node.parent = this.parent;
        }
      }
      else {
        if (node) {
          this.key = node.key;
          this.value = node.value;
          this.left = node.left;
          this.right = node.right;
        }
        else {
          this.key = null;
          this.value = null;
          this.left = null;
          this.right = null;
        }
      }
    }
    _findMin() {
      if (!this.left) {
        return this;
      }
      return this.left._findMin();
    }
    preOrder(arr = []) {
        arr.push(this.key);
        if (this.left) {
          this.left.preOrder(arr);
        }
        if (this.right) {
          this.right.preOrder(arr);
        }
        return arr;
      }
      inOrder(arr = []) {
        if (this.left) {
          this.left.inOrder(arr);
        }
    
        arr.push(this.key);
    
        if (this.right) {
          this.right.inOrder(arr);
        }
        return arr;
      }
      postOrder(arr = []) {
        if (this.left) {
          this.left.postOrder(arr);
        }
        if (this.right) {
          this.right.postOrder(arr);
        }
        arr.push(this.key);
        return arr;
      }
}

function mainBST() {
    const newBST = new BinarySearchTree();
    newBST.insert(25, 25);
    newBST.insert(15, 15);
    newBST.insert(50, 50);
    newBST.insert(10, 10);
    newBST.insert(24, 24);
    newBST.insert(35, 35);
    newBST.insert(70, 70);
    newBST.insert(4, 4);
    newBST.insert(12, 12);
    newBST.insert(18, 18);
    newBST.insert(31, 31);
    newBST.insert(44, 44);
    newBST.insert(66, 66);
    newBST.insert(90, 90);
    newBST.insert(22, 20);

    console.log('post-order ', newBST.postOrder());
    console.log('pre-order ', newBST.preOrder());
    console.log('in-order ', newBST.inOrder());
}
//mainBST();

//6. Find the next commanding officer
const commandStructure = [ "Captain Picard", "Commander Riker", "Commander Data", "Lt. Cmdr. Worf", "Lt. Cmdr. LaForge", "Lt. Cmdr. Crusher", "Lieutenant Security Officer", "Lieutenant Selar"]

let ussEnterprise = new BinarySearchTree();
for(let num of commandStructure) ussEnterprise.insert(num, num);

//console.log(ussEnterprise.preOrder());
//7. Max profit
const sharePrice = [128, 97, 121, 123, 98, 97, 105];

let profitTree = new BinarySearchTree();
for(let num of sharePrice) profitTree.insert(num, num);

function maximizeProfit(tree, max, current) {
    if (tree.right === null && tree.left === null) {
    if (tree.value - current > max) max = tree.value - current;
    return max;
    }

    if (tree.value - current > max) max = tree.value - current;

    if (tree.right) {
    const rCurrent = maximizeProfit(tree.right, max, current);
    const rNext = maximizeProfit(tree.right, max, tree.right.value);
    return rCurrent > rNext ? rCurrent : rNext;
    }

    const lCurrent = maximizeProfit(tree.left, max, current);
    const lNext = maximizeProfit(tree.left, max, tree.left.value);
    return lCurrent > lNext ? lCurrent : lNext;

}
console.log(maximizeProfit(profitTree, 0, profitTree.value));
    

//8. Egg drop (optional)