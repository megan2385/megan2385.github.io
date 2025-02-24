window.addEventListener("DOMContentLoaded", () => {
    const tree = new BinaryTree(
        [
            0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,
            0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,
            0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,
            0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,
            0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
            0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            0,1,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,1,0,
            0,1,0,0,0,1,0,1,1,0,1,1,0,1,0,0,0,1,0,
            0,0,1,0,0,0,1,0,0,1,0,0,1,0,0,0,1,0,0,
            0,0,0,1,0,0,0,1,1,0,1,1,0,0,0,1,0,0,0,
            0,0,0,0,1,1,0,0,1,0,1,0,0,1,1,0,0,0,0,
            0,0,0,0,0,0,1,1,1,0,1,1,1,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,
            0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0
        ],
        19,
        24
    );
    const display = () => {
        const pre = document.querySelector("pre");

        if (pre) pre.textContent = tree.structureToString;
    };
    display();

    document.querySelector("button")?.addEventListener("click", () => {
        tree.invert();
        display();
    });
});

class BinaryTree {
    structure = [];
    cols;
    rows;

    constructor(structure, cols, rows) {
        this.structure.push(...structure);
        this.cols = cols;
        this.rows = rows;
    }

    get structureToString() {
        const { structure, cols, rows } = this;
        const asStrings = structure.map(n => n.toString());

        for (let r = 1; r < rows; ++r) {
            asStrings.splice(r * cols + (r - 1), 0, "\n");
        }

        return asStrings.join("");
    }

    invert() {
        this.structure = this.structure.map(n => +!n);
    }
}