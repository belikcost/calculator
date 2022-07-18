import Parser from "../src/Parser";

const checkParser = (command: string, results: (string | number)[]) => {
    const parser = new Parser(command);

    parser.parse();
    for (let i = 0; i < results.length; i++) {
        if (typeof results[i] === "number") {
            expect(parser.operand).toBe(results[i]);
        } else {
            expect(parser.operator).toBe(results[i]);
        }
        parser.parse();
    }
};

describe("Class Parser should parse", () => {
    it("operations with many all operators", () => {
        checkParser("5+2*12/3+5-10", [5, "+", 2, "*", 12, "/", 3, "+", 5, "-", 10]);
    });

    it("operations with unary minus", () => {
        checkParser("-10-5*3+(-3)", [-10, "-", 5, "*", 3, "+", "(", -3, ")"]);
    })
});