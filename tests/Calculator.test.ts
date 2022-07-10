import Calculator from "../src/Calculator";

describe("Class Calculator should calculate", () => {
    it("operations with one operator and one symbol operands", () => {
        const calculator = new Calculator();
        expect(calculator.calculate("5+5")).toBe(10);
        expect(calculator.calculate("2-3")).toBe(-1);
        expect(calculator.calculate("9*1")).toBe(9);
        expect(calculator.calculate("4/2")).toBe(2);
    });

    it("operations with one operator and many symbol operands", () => {
        const calculator = new Calculator();
        expect(calculator.calculate("10+22")).toBe(32);
        expect(calculator.calculate("1292-33")).toBe(1259);
        expect(calculator.calculate("540*98")).toBe(52920);
        expect(calculator.calculate("10/23")).toBe(0.4348);
    });

    it("operations with float operands with dots", () => {
        const calculator = new Calculator();
        expect(calculator.calculate("10.1+10.2")).toBe(20.3);
        expect(calculator.calculate("49.99-12.333")).toBe(37.657);
        expect(calculator.calculate("9.01*0.123")).toBe(1.1082);
        expect(calculator.calculate("78.42/5.5")).toBe(14.2582)
    });

    it("operations with float operands with commas", () => {
        const calculator = new Calculator();
        expect(calculator.calculate("10,1+10,2")).toBe(20.3);
        expect(calculator.calculate("49,99-12,333")).toBe(37.657);
        expect(calculator.calculate("9,01*0,123")).toBe(1.1082);
        expect(calculator.calculate("78,42/5,5")).toBe(14.2582)
    });

    it("operations with many +, - operators", () => {
        const calculator = new Calculator();
        expect(calculator.calculate("5+2+5-10")).toBe(2);
        expect(calculator.calculate("55+2-3")).toBe(54);
        expect(calculator.calculate("90-12-34-12-1")).toBe(31);
        expect(calculator.calculate("40+10+2-1")).toBe(51);
    });

    it("operations with many all operators", () => {
        const calculator = new Calculator();
        expect(calculator.calculate("5+2*12/3+5-10")).toBe(23);
        expect(calculator.calculate("50/55+2*2-3")).toBe(2.8182);
        expect(calculator.calculate("90-12-34*12*1")).toBe(528);
        expect(calculator.calculate("40+10/2-1*2+2/4+79")).toBe(91.5);
    });
})