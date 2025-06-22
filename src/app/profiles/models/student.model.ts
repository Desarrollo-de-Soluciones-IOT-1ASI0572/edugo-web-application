export interface Student {
  id: number;
  name: string;
  lastName: string;
  homeAddress: string;
  schoolAddress: string;
  studentPhotoUrl: string;
  driverId: number;
  parentProfile: {
    id: number;
    userId: number;
    fullName: string;
    email: string;
    mobileNumber: string;
    address: string;
    gender: string;
    photoUrl: string;
    role: string;
  };
}
