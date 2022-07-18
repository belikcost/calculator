import Parser from "./Parser";

enum OperatorsEnum {
    "*" = "*",
    "/" = "/",
    "+" = "+",
    "-" = "-",
    "(" = "("
}

const OPERATORS_PRIORITIES = {
    [OperatorsEnum["*"]]: 2,
    [OperatorsEnum["/"]]: 2,
    [OperatorsEnum["+"]]: 1,
    [OperatorsEnum["-"]]: 1,
}

class Calculator {
    private readonly command: string;
    private readonly operands: number[];
    private readonly operators: OperatorsEnum[];

    constructor(command: string) {
        this.command = command;
        this.operands = [];
        this.operators = [];
    }

    calculate() {
        const parser = new Parser(this.command);
        parser.parse();

        while (parser.operand !== "" || parser.operator !== null) {
            if (parser.operand !== "") {
                this.calculateWithOperand(+parser.operand);
            } else if (parser.operator === ")") {
                this.calculateInBracketsOperations();
            } else {
                this.calculateWithOperator(parser.operator as OperatorsEnum);
            }
            parser.parse();
        }

        return this.calculateResult();
    }

    private calculateWithOperand(operand: number) {
        this.operands.push(operand);
    }

    private calculateWithOperator(operator: OperatorsEnum) {
        if (this.operators.length === 0 || operator === "(") {
            this.operators.push(operator);
            return;
        }

        const lastOperator = this.operators[this.operators.length - 1];
        if (lastOperator !== "(" && OPERATORS_PRIORITIES[operator] <= OPERATORS_PRIORITIES[lastOperator]) {
            this.calculateOperation();
            this.calculateWithOperator(operator);
            return;
        }
        this.operators.push(operator);
    }

    private calculateInBracketsOperations() {
        while (this.operators[this.operators.length - 1] !== "(") {
            this.calculateOperation()
        }
        this.operators.pop();
    }

    private calculateOperation() {
        const [rightOperand, operator, leftOperand] = [this.operands.pop(), this.operators.pop(), this.operands.pop()]

        let operationResult = 0;
        switch (operator) {
            case OperatorsEnum["*"]:
                operationResult = leftOperand * rightOperand;
                break;
            case OperatorsEnum["/"]:
                operationResult = leftOperand / rightOperand;
                break;
            case OperatorsEnum["+"]:
                operationResult = leftOperand + rightOperand;
                break;
            case OperatorsEnum["-"]:
                operationResult = leftOperand - rightOperand;
                break;
        }
        this.operands.push(operationResult);
    }

    private calculateResult() {
        while (this.operators.length !== 0) {
            this.calculateOperation();
        }
        return +this.operands[0].toFixed(4);
    }
}

export default Calculator;