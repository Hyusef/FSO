export {};

interface myValues {
  firstValue: number;
  secondValue: number;
}

let parseArguments = (args): myValues => {
  if (args.length > 4) throw new Error("Too many arguments");
  if (args.length < 3) throw new Error("Not enough arguments");

  if (!isNaN(args[2]) && !isNaN(args[3])) {
    var firstValue = args[2];
    var secondValue = args[3];
  }

  const values: myValues = {
    firstValue: firstValue,
    secondValue: secondValue,
  };

  return values;
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi = (weight / (height * height)) * 10000;
  console.log(bmi);
  if (weight <= 0 || height <= 0 || bmi <= 0) {
    throw new Error("Enter real height and weight values");
  }
  if (bmi < 15) {
    return "Very Severely underweight";
  } else if (bmi >= 15 && bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi <= 25) {
    return "Healthy Weight";
  } else {
    return "Overweight";
  }
};

try {
  const { firstValue, secondValue } = parseArguments(process.argv);
  console.log(calculateBmi(firstValue, secondValue));
} catch {
  throw new Error("ERROR");
}
