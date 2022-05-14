import patientData from "../data/patients.json";
import { newPatientEntry } from "../types/patientEntry";

const newPatientData: Array<newPatientEntry> = patientData;

const getEntries = () => {
  return newPatientData;
};

const findById = (id: string): newPatientEntry | undefined => {
  const entry = patientData.find((d) => d.id === id);
  return entry;
};

const getNonSensitiveEntries = (): newPatientEntry[] => {
  return patientData.map(({ id, name, gender, dateOfBirth, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = () => {
  return null;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  findById
};
