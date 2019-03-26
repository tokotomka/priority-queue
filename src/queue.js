const MaxHeap = require('./max-heap.js');

class PriorityQueue {
    constructor(maxSize) {
        this.maxSize = maxSize || 30;
        this.heap = new MaxHeap()
    }

    push(data, priority) {
        if (this.heap.size() !== this.maxSize) {
            this.heap.push(data, priority);
        } else {
            throw Error;
        }
    }

    shift() {
        if (!this.isEmpty()) {
            return this.heap.pop();
        } else {
            throw Error;
        }
    }

    size() {
        return this.heap.size();
    }

    isEmpty() {
        return this.heap.isEmpty();
    }
}

module.exports = PriorityQueue;
