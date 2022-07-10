export interface ICalculator {
    calculate: (command: string) => number;
}

export enum OperatorsEnum {
    "*" = "*",
    "/" = "/",
    "+" = "+",
    "-" = "-"
}

class Calculator implements ICalculator {
    private leftOperand: string | number | null;
    private rightOperand: string | number | null;
    private operator: OperatorsEnum | null;
    private result: number;
    private command: string;

    calculate(command: string) {
        this.initCalculator(command);
        const firstOperationEnd = this.findOperationEnd(0);
        this.calculateOperation(0, firstOperationEnd);

        let start = firstOperationEnd;
        while (start < this.command.length) {
            const end = this.findOperationEnd(start);
            this.calculateOperation(start, end);
            start = end;
        }

        this.roundResult();
        return this.result;
    }

    initCalculator(command: string) {
        this.command = command;
        this.result = 0;
        this.leftOperand = null;
        this.rightOperand = null;
        this.operator = null;
    }

    findOperationEnd(start: number) {
        let operatorIndex;
        let itsBrackets = false;

        for (let i = start; i < this.command.length; i++) {
            const symbolIsLast = i === this.command.length - 1;
            const symbol = this.command[i];

            if (symbol === "(") itsBrackets = true;
            if (symbol === ")") itsBrackets = false;

            if (!this.checkIsSymbolOperator(symbol) && !symbolIsLast) continue;
            if (itsBrackets) continue;

            if (operatorIndex) return symbolIsLast ? i + 1 : i;
            operatorIndex = i;
        }
    }

    checkIsSymbolOperator(symbol: string) {
        return isNaN(+symbol) && symbol !== "." && symbol !== "," && symbol !== ")" && symbol !== "(";
    }

    calculateOperation(start: number, end: number) {
        this.resetOperation();

        const partCommand = this.command.slice(start, end);
        for (let i = 0; i < partCommand.length; i++) {
            this.parseSymbol(partCommand[i]);
        }

        this.calculateResult();
    }

    resetOperation() {
        this.leftOperand = this.result.toString();
        this.rightOperand = null;
        this.operator = null;
    }

    parseSymbol(symbol: string) {
        if (this.checkIsSymbolOperator(symbol)) {
            this.operator = symbol as OperatorsEnum;
            return;
        }
        if (!this.operator) {
            this.leftOperand = this.leftOperand ? this.leftOperand + symbol : symbol;
            return;
        }

        this.rightOperand = this.rightOperand ? this.rightOperand + symbol : symbol;
    }

    calculateResult() {
        this.assertOperandsToNumber();
        this.leftOperand = this.leftOperand as number;
        this.rightOperand = this.rightOperand as number;

        switch (this.operator) {
            case OperatorsEnum["*"]:
                this.result = this.leftOperand * this.rightOperand;
                break;
            case OperatorsEnum["/"]:
                this.result = this.leftOperand / this.rightOperand;
                break;
            case OperatorsEnum["+"]:
                this.result = this.leftOperand + this.rightOperand;
                break;
            case OperatorsEnum["-"]:
                this.result = this.leftOperand - this.rightOperand;
                break;
        }
    }

    assertOperandsToNumber() {
        if (this.leftOperand && typeof this.leftOperand !== "number") {
            this.leftOperand = +(this.leftOperand.replace(",", "."));
        }
        if (this.rightOperand && typeof this.rightOperand !== "number") {
            this.rightOperand = +(this.rightOperand.replace(",", "."));
        }
    }

    roundResult() {
        this.result = +this.result.toFixed(4)
    }
}

export default Calculator;