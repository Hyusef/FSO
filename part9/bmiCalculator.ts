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

console.log(calculateBmi(180, 74));
