export interface patientEntry  {
id:string,
name:string,
dateOfBirth:string,
ssn:string,
gender:string,
occupation:string
}

export type newPatientEntry = Omit<patientEntry, 'ssn'>;