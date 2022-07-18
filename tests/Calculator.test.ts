import Calculator from "../src/Calculator";

describe("Class Calculator should calculate", () => {
    it("one symbol addition operation", () => {
        const calculator = new Calculator("5+5");
        expect(calculator.calculate()).toBe(10);
    });

    it("one symbol subtraction operation", () => {
        const calculator = new Calculator("1-5");
        expect(calculator.calculate()).toBe(-4);
    });

    it("one symbol multiplication operation", () => {
        const calculator = new Calculator("7*7");
        expect(calculator.calculate()).toBe(49);
    });

    it("one symbol division operation", () => {
        const calculator = new Calculator("8/4");
        expect(calculator.calculate()).toBe(2);
    });

    it("many symbol addition operation", () => {
        const calculator = new Calculator("10+22");
        expect(calculator.calculate()).toBe(32);
    });

    it("many symbol subtraction operation", () => {
        const calculator = new Calculator("12-92");
        expect(calculator.calculate()).toBe(-80);
    });

    it("many symbol multiplication operation", () => {
        const calculator = new Calculator("22*10");
        expect(calculator.calculate()).toBe(220);
    });

    it("many symbol division operation", () => {
        const calculator = new Calculator("40/20");
        expect(calculator.calculate()).toBe(2);
    });

    it("operations with float operands with dots", () => {
        let calculator = new Calculator("10.1+10.2");
        expect(calculator.calculate()).toBe(20.3);

        calculator = new Calculator("49.99-12.333");
        expect(calculator.calculate()).toBe(37.657);

        calculator = new Calculator("9.01*0.123");
        expect(calculator.calculate()).toBe(1.1082);

        calculator = new Calculator("78.42/5.5");
        expect(calculator.calculate()).toBe(14.2582);
    });

    it("operations with float operands with commas", () => {
        let calculator = new Calculator("10,1+10,2");
        expect(calculator.calculate()).toBe(20.3);

        calculator = new Calculator("49,99-12,333");
        expect(calculator.calculate()).toBe(37.657);

        calculator = new Calculator("9,01*0,123");
        expect(calculator.calculate()).toBe(1.1082);

        calculator = new Calculator("78,42/5,5");
        expect(calculator.calculate()).toBe(14.2582)
    });

    it("operations with many +, - operators", () => {
        let calculator = new Calculator("5+2+5-10");
        expect(calculator.calculate()).toBe(2);

        calculator = new Calculator("55+2-3");
        expect(calculator.calculate()).toBe(54);

        calculator = new Calculator("90-12-34-12-1");
        expect(calculator.calculate()).toBe(31);

        calculator = new Calculator("40+10+2-1");
        expect(calculator.calculate()).toBe(51);
    });

    it("operations with many all operators", () => {
        let calculator = new Calculator("5+2*12/3+5-10");
        expect(calculator.calculate()).toBe(8);

        calculator = new Calculator("50/55+2*2-3");
        expect(calculator.calculate()).toBe(1.9091);

        calculator = new Calculator("90-12-34*12*1");
        expect(calculator.calculate()).toBe(-330);

        calculator = new Calculator("40+10/2-1*2+2/4+79");
        expect(calculator.calculate()).toBe(122.5);
    });

    it("operation with brackets", () => {
        let calculator = new Calculator("10+(55+1)*99");
        expect(calculator.calculate()).toBe(5554);
    });

    it("operation with unary minus", () => {
        const calculator = new Calculator("10*44+(-3)");
        expect(calculator.calculate()).toBe(437);
    });
})