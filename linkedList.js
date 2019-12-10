function Node (head, linkedList = null, next = null, previous = null) {
    this.head = head;
    this.next = next;
    this.previous = previous;
    this.linkedList = linkedList;
}

function LinkedList(addLinkedList = false, node = null) {
    this.head = null;
    if (addLinkedList) {
        this.previous = node;
    }
}

LinkedList.prototype.add = function (data, linkedList = null) {

    const newNode = new Node(data, linkedList);
    let i = 0;
    if (this.head === null) {
        this.head = newNode;
    } else {
        this.tail.next = newNode;
        newNode.previous = this.tail;
    }
    this.tail = newNode;
    return i;
}

LinkedList.prototype.getById = function (id) {
    if (id > 0) {
        let current = this.head;
        
        let i = 0;
        while ((current.next !== null) && (i < id)) {
            current = current.next;
            i++;
        } 
        return current !== null ? current : undefined;
    } else {
        return undefined;
    }
}

LinkedList.prototype.getByData = function (data) {
    let current = this.head;
    while (current.head !== data) {
        current = current.next;
    } 
    return current !== null ? current : undefined;
}