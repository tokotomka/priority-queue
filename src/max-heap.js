const Node = require('./node');

class MaxHeap {
    constructor() {
        this.root = null;
        this.parentNodes = [];
    }

    push(data, priority) {
        let node = new Node(data, priority);
        this.insertNode(node);
        this.shiftNodeUp(node);
    }

    pop() {
        if (!this.isEmpty()) {
            let detached = this.detachRoot();
            this.restoreRootFromLastInsertedNode(detached);
            this.shiftNodeDown(this.root);
            return detached.data;
        }
    }

    detachRoot() {
        let detachedRoot = this.root;
        if (detachedRoot === this.parentNodes[0]) this.parentNodes.splice(0, 1);
        this.root = null;
        return detachedRoot;
    }

    restoreRootFromLastInsertedNode(detached) {
        if (this.parentNodes.length === 1) {
            this.root = this.parentNodes[0];
        } else if (this.parentNodes.length > 1) {
            let lastInsertedNode = this.parentNodes.pop();
            let parent = lastInsertedNode.parent;
            if (parent) {
                lastInsertedNode.remove();
                this.root = lastInsertedNode;
                if (detached.left) this.root.appendChild(detached.left);
                if (detached.right) this.root.appendChild(detached.right);
                if (parent === detached) parent = this.root;
                if (parent && parent.left && !parent.right) this.parentNodes.unshift(parent);
            }
        }
    }

    size() {
        let heapSize = 0;
        if (this.root) {
            let helper = [this.root], currentNode = this.root;
            while (helper.length > 0) {
                if (currentNode.left) helper.push(currentNode.left);
                if (currentNode.right) helper.push(currentNode.right);
                helper.shift();
                currentNode = helper[0];
                heapSize++;
            }
        }
        return heapSize;
    }

    isEmpty() {
        return !this.root;
    }

    clear() {
        this.root = null;
        this.parentNodes = [];
    }

    insertNode(node) {
        if (this.isEmpty()) {
            this.root = node;
            this.parentNodes = [node];
        } else {
            this.parentNodes.push(node);
            let parent = this.parentNodes[0];
            parent.appendChild(node);
            if (parent.left && parent.right) {
                this.parentNodes.shift();
            }
        }
    }

    shiftNodeUp(node) {
        if (node.parent) {
            if (node.parent.priority < node.priority) {
                if (node.parent === this.root) {
                    this.root = node;
                }
                if (!node.left || !node.right) {
                    if (node === this.parentNodes[0]) {
                        if (node.parent.left && node.parent.right) {
                            this.parentNodes.shift();
                            this.parentNodes.unshift(node.parent);
                        }
                    } else {
                        if (node.parent.left && node.parent.right) {
                            this.parentNodes[this.parentNodes.length - 1] = node.parent;
                        } else {
                            let parent = this.parentNodes[0];
                            this.parentNodes[0] = node;
                            this.parentNodes[this.parentNodes.length - 1] = parent;
                        }
                    }
                }
                node.swapWithParent();
                this.shiftNodeUp(node);
            }
        }
    }

    shiftNodeDown(node) {
        if (!this.isEmpty()) {
            if (node.left && node.priority < node.left.priority || node.right && node.priority < node.right.priority) {
                let direction;
                if (node.right) {
                    direction = node.left.priority > node.right.priority ? node.left : node.right
                } else {
                    direction = node.left;
                }
                if (node === this.root) this.root = direction;
                direction.swapWithParent();
                let nodeIndex = this.parentNodes.indexOf(node),
                    parentIndex = this.parentNodes.indexOf(node.parent);
                if (nodeIndex > -1) this.parentNodes.splice(nodeIndex, 1, node.parent);
                if (parentIndex > -1) this.parentNodes.splice(parentIndex, 1, node);
                this.shiftNodeDown(node);
            }
        }
    }
}

module.exports = MaxHeap;
