/* 
  interface myValues {
    array: number[];
    target: number;
  }
const parseArguments = (args:Array<string>): myValues => {
  if (args.length < 2) {
    throw new Error("Not enough arguments");
  }
  let target;
  if (!isNaN(args[2])) {
     target = parseInt(args[2]);
  }

  const myArr = [];
  for (let i = 3; i < args.length; i++) {
    myArr.push(parseFloat(args[i]));
  }

  if (myArr.some((e) => isNaN(e))) {
    throw new Error("All values should be numbers");
  }

  const parameters: myValues = {
    array: myArr,
    target: target,
  };

  return parameters;
}; */

interface evaluation {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const exerciseCalculator = (
  exercises: number[],
  target: number
): evaluation => {
  const numberOfDays = exercises.length;
  let total = 0;
  for (let i = 0; i < numberOfDays; i++) {
    total += exercises[i];
    console.log(total);
  }
  const average = total / numberOfDays;
  const trainingArr = exercises.filter((e) => e > 0);
  const daysOfTraining = trainingArr.length;
  const success = average >= target;
  let description;
  let rate;
  if (average / target < 0.5) {
    description = "Not amazing";
    rate = 1;
  } else if (average / target <= 1) {
    description = "Not too bad but could be better";
    rate = 2;
  } else {
    description = "amazing";
    rate = 3;
  }

  const myEvaluation: evaluation = {
    periodLength: numberOfDays,
    trainingDays: daysOfTraining,
    success: success,
    rating: rate,
    ratingDescription: description,
    target: target,
    average: average,
  };

  return myEvaluation;
};

/* try {
  const { array, target } = parseArguments(process.argv);
  console.log(exerciseCalculator(array, target));
} catch {
  throw new Error("Error");
}
 */
