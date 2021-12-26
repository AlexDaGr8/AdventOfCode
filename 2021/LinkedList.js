export class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

export class LinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
        this.tail = null
    }
    
    push(value) {
        const newNode = new Node(value);
        if (this.length > 0) {
            this.tail.next = newNode;
        } else {
            this.head = newNode
        }
        this.tail = newNode;
        this.length += 1;
        return newNode;
    }

    pop() {
        if (!this.length) { return null; }
        else {
            let currentNode = this.head;
            let secondToLastNode = this.head;
            while(currentNode.next) {
                secondToLastNode = currentNode;
                currentNode = currentNode.next;
            }
            // set the second to last node's 'next' to 'null
            // the second to the last node should cut its connection to the next node
            secondToLastNode.next = null;
            // set secondToLastNode as tail
            this.tail = secondToLastNode;
            // decrease the length by 1
            this.length -= 1;
            // if the list is now empty, set its head and tail as null
            if (!this.length) {
                this.head = null;
                this.tail = null
            }

            return currentNode;
        }
    }
}