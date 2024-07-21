const fs = require('fs');

class No {
    constructor(value = null) {
        this.value = value;
        this.next = null;
    }
}

class linkedList {
    constructor(){
        this.root = new No();
    }

    print() {
        let current = this.root;
        while (current !== null && current.value !== null) {
            console.log(current.value);
            current = current.next;
        }
    }

    add(value, no = this.root) {
        if (no.value === null) {
            no.value = value;
            no.next = new No();
        } else if (no.next === null) {
            no.next = new No(value);
        } else {
            this.add(value, no.next);
        }
    }

    addAtPosition(value, position) {
        let current = this.root;
        for (let i = 0; i < position - 1 && current.next !== null; i++) {
            current = current.next;
        }

        const newNode = new No(value);
        newNode.next = current.next;
        current.next = newNode;
    }

    remove(value) {
        if (this.root.value === value) {
            if (this.root.next !== null) {
                this.root = this.root.next;
            } else {
                this.root = new No();
            }
        } else {
            this.removeRecursive(value, this.root);
        }
    }

    removeRecursive(value, no) {
        if (no.next !== null && no.next.value === value) {
            no.next = no.next.next !== null ? no.next.next : new No();
        } else if (no.next !== null) {
            this.removeRecursive(value, no.next);
        }
    }
}

const arq = fs.readFileSync('arq-novo.txt', { encoding: 'utf8' });

const lines = arq.split('\n');

const initialList = lines[0].split(' ').map(num => parseInt(num, 10));

const lineList = lines.slice(1);

const linked = new linkedList();

const readLines = (lineList) => {
    lineList.forEach(line => {
        const actualLine = line.split(' ');
        const command = actualLine[0];
        const value = parseInt(actualLine[1], 10);
        const position = actualLine.length > 2 ? parseInt(actualLine[2], 10) : null;

        if (command === 'P') {
            linked.print();
        } else if (command === 'A' && position !== null) {
            linked.addAtPosition(value, position);
        } else if (command === 'A') {
            linked.add(value);
        } else if (command === 'R') {
            linked.remove(value);
        }
    });
};

initialList.forEach(num => {
    linked.add(num);
});

readLines(lineList);
