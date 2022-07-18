import Calculator from "./Calculator";

process.stdin.on("data", (data: Buffer) => {
    const payloadString = data.toString();

    const calculator = new Calculator(payloadString);
    console.log(calculator.calculate());

    process.exit();
});