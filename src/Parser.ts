class Parser {
    readonly command: string;
    operator: string | null;
    operand: string | number;
    private cursor: number;

    constructor(command: string) {
        this.command = command.trim();
        this.operator = null;
        this.operand = "";
        this.cursor = 0;
    }

    parse() {
        this.reset();
        if (this.checkCursorOutOfCommand()) return;

        if (this.checkIsCursorSymbolOperand() || this.cursor === 0) {
            this.parseOperand();
            this.leadOperandToNumberIfNot();
        } else {
            this.operator = this.command[this.cursor];
            this.cursor += 1;
        }
    }

    private reset() {
        this.operand = "";
        this.operator = null;
    }

    private parseOperand() {
        while (!this.checkCursorOutOfCommand() && this.checkIsCursorSymbolOperand()) {
            this.operand += this.command[this.cursor];
            this.cursor += 1;
        }
    }

    private checkCursorOutOfCommand() {
        return this.cursor >= this.command.length;
    }

    private checkIsCursorSymbolOperand() {
        const symbol = this.command[this.cursor];
        if (this.cursor === 0) return true;
        if (this.command[this.cursor - 1] === "(") return true;

        return !isNaN(+symbol) || symbol === "." || symbol === ",";
    }

    private leadOperandToNumberIfNot() {
        if (typeof this.operand === "number") return;
        this.operand = +(this.operand.replace(",", "."))
    }
}

export default Parser;