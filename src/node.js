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
            this.left.parent = this;
        } else if (!this.right) {
            this.right = node;
            this.right.parent = this;
        }
    }

    removeChild(node) {
        if (this.left === node) {
            this.left = null;
            node.parent = null;
        } else if (this.right === node) {
            this.right = null;
            node.parent = null;
        } else if (this.left !== node && this.right !== node) {
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
            Node.updateOutsideNodes(this);
            Node.updateTargetNodes(this);
        }
    }

    static updateOutsideNodes(node) {
        if (node.parent.parent) {
            if (node.parent.parent.left === node.parent) {
                node.parent.parent.left = node;
            } else {
                node.parent.parent.right = node;
            }
        }
    }

    static updateTargetNodes(node){
        let tempParent = node.parent;
        let tempParentsParent = node.parent.parent;
        let tempParentsLeft = node.parent.left;
        let tempParentsRight = node.parent.right;

        node.parent.left = node.left;
        node.parent.right = node.right;
        node.parent.parent = node;

        node.parent = tempParentsParent;
        if (tempParentsLeft === node) {
            node.left = tempParent;
            node.right = tempParentsRight;
            if (node.right) {
                node.right.parent = node;
            }

        } else {
            node.right = tempParent;
            node.left = tempParentsLeft;
            if (node.left) {
                node.left.parent = node;
            }
        }
    }

}

module.exports = Node;
