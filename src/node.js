class Node {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
        this.parent = null;
        this.left = null;
        this.right = null;
    }

    appendChild(node) {
        if (!this.left) {
            this.left = node;
            node.parent = this;
        } else if (!this.right) {
            this.right = node;
            node.parent = this;
        }
    }

    removeChild(node) {
        if (this.left === node) {
            this.left = null;
            node.parent = null;
        } else if (this.right === node) {
            this.right = null;
            node.parent = null;
        } else {
            throw Error;
        }
    }

    remove() {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }

    swapWithParent() {
        if (this.parent) {
            if (this.parent.parent) {
                if (this.parent.parent.left === this.parent) {
                    this.parent.parent.left = this;
                } else {
                    this.parent.parent.right = this;
                }
            }
            let temp = {
                parent: this.parent,
                parentsParent: this.parent.parent,
                parentsLeft: this.parent.left,
                parentsRight: this.parent.right
            };
            if (this.left) this.left.parent = this.parent;
            if (this.right) this.right.parent = this.parent;
            this.parent.left = this.left;
            this.parent.right = this.right;
            this.parent.parent = this;
            this.parent = temp.parentsParent;
            if (temp.parentsLeft === this) {
                this.left = temp.parent;
                this.right = temp.parentsRight;
                this.left.parent = this;
                if (this.right) {
                    this.right.parent = this;
                }
            } else {
                this.right = temp.parent;
                this.left = temp.parentsLeft;
                this.right.parent = this;
                if (this.left) {
                    this.left.parent = this;
                }
            }
        }
    }
}

module.exports = Node;
