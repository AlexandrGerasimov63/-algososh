import { ElementStates } from "../../types/element-states";

class QueueNode<T> {
  value!: T | string;
  color!: ElementStates;
}

export class Queue<T> {
    constructor(givenArr: QueueNode<T>[]) {
        this.arr = givenArr;
    }
    
    arr: QueueNode<T>[] = [];
    sizeArr = -1;
    head = -1;
    tail = -1;
    turn = 0;

  
  push = (item: QueueNode<T>) => {
    // console.log(this.turn)
    if (this.head === -1 && this.tail === -1 && this.turn !== 0) {
      this.arr[this.turn] = item;
      this.tail = this.turn - 1;
      this.head = this.turn;
      this.turn++;
      this.sizeArr++;
    } 
    if(this.turn<7) {
      this.arr[this.turn] = item;
      this.turn++;
      this.sizeArr++;
    } else {
        return
    }
    if (this.tail < 6) {
        this.tail++;
    }
    if (this.head < 0) {
        this.head++;
    }
    
    
    
  };

  pop = () => {
    this.arr[this.head].value = "";
    if (this.head !== this.tail) {
      this.head++;
      this.sizeArr--;
      console.log(this.sizeArr)
      console.log(this.head)
      console.log(this.tail)
    } else {
      this.sizeArr--;
      this.head = -1;
      this.tail = -1;
      this.turn--;
    }
  };

  getLastItem = (): QueueNode<T> => {
    for (let i = this.arr.length - 1; i >= 0; i--) {
      if (this.arr[i].value !== "") {
        return this.arr[i];
      }
    }
    return this.arr[0];
  };

  getFirstItem = (): QueueNode<T> => {
    for (let i = 0; i <= this.arr.length - 1; i++) {
      if (this.arr[i].value !== "") {
        return this.arr[i];
      }
    }
    return this.arr[0];
  };

  getHead = () => {
    return this.head;
  };

  getTail = () => {
    return this.tail;
  };

  clearArr = () => {
    this.head = -1;
    this.tail = -1;
    this.turn = 0;
    this.sizeArr = -1;
    return (this.arr = Array.from({ length: 7 }, () => ({
      value: "",
      color: ElementStates.Default,
    })));
  };

  elements = () => this.arr;

  size = () => this.arr.length;

  isEmpty = () => this.sizeArr === -1;
  isHead = () => this.tail === undefined
}
