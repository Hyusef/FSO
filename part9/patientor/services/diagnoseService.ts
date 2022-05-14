import diagnosesData from "../data/diagnoses.json";
import { diagnoseEntry } from "../types/diagnoseEntry";

const diagnoses: Array<diagnoseEntry> = diagnosesData;

const getEntries = () => {
  return diagnoses;
};

const addDiagnoses = () => {
  return null;
};

export default {
  getEntries,
  addDiagnoses,
};
