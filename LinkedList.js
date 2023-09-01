class linkedListNode {
  data;
  next;
  constructor(_data) {
    this.data = _data;
    this.next = null;
  }
}

class linkedListIterator {
  currentNode;
  constructor(node) {
    this.currentNode = node;
  }
  data() {
    if(this.currentNode == null) return null;
    return this.currentNode.data;
  }
  next() {
    if(this.currentNode != null) {
      this.currentNode = this.currentNode.next;
    }
    return this;
  }
  current() {
    return this.currentNode;
  }
}

module.exports = class linkedList{
  head;
  tail;
  constructor() {
    this.head = null;
    this.tail = null;
  }
  begin() {
    return new linkedListIterator(this.head);
  }
  printList() {
    var print_data = "";
    for( var itr = this.begin(); itr.current() != null; itr.next() ) {
      print_data += itr.data() + " -> ";
    }
    console.log(print_data); 
  }

  find(_data) {
    for( var itr = this.begin(); itr.current() != null; itr.next() ) {
      if(itr.data() == _data) {
        return itr.current();
      }
    }
    return null;
  }

  findParent(node) {
    for( var itr = this.begin(); itr.current() != null; itr.next() ) {
      if(itr.current().next == node) {
        return itr.current();
      }
    }
    return null;
  }

  insertLast(_data) {
    var newNode = new linkedListNode(_data);
    if(this.head == null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  insertAfter(node_data, _data) {
    var node = this.find(node_data);
    var newNode = new linkedListNode(_data);
    newNode.next = node.next;
    node.next = newNode;
    if(this.tail == node) {
      this.tail = newNode;
    }
  }
  
  nnsertBefore(node_data, _data) {
    var node = this.find(node_data);
    var newNode = new linkedListNode(_data);
    newNode.next = node;

    var parent = this.findParent(node);
    if(parent == null) {
      this.head = newNode;
    } else {
      parent.next = newNode;
    }
  }
  
  deleteNode(node_data) {
    var node = this.find(node_data);
    if(node == null) return;
    if(this.head == this.tail) {
      this.head = null;
      this.tail = null;
    } else if (this.head == node) {
      this.head = node.next;
    } else {
      var parent = this.findParent(node);
      if(this.tail == node) {
        this.tail = parent;
      } else {
        parent.next = node.next;
      } 
    }
    node = null;
  }


}