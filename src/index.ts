import Calculator from "./Calculator";

process.stdin.on("data", (data: Buffer) => {
    const payloadString = data.toString();

    const calculator = new Calculator();
    console.log(calculator.calculate(payloadString));

    process.exit();
});