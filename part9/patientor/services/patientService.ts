import patientData from "../data/patients.json";
import { newPatientEntry, patientEntry } from "../types/patientEntry";
import { v1 as uuid } from "uuid";

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

const addPatient = (
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string
): patientEntry => {
  const id = uuid();
  const newPatient = {
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    id,
  };
  patientData.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  findById,
};
