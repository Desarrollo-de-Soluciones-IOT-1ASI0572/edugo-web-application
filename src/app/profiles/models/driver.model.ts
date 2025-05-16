export class Driver {
  userId: string;
  role: string;
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
  photoUrl: string;
  dni: string;
  licenseNumber: string;
  insuranceNumber: string;
  vehicle: {
    plateNumber: string;
    brand: string;
    model: string;
  };
  studentIds: string[];

  constructor(data: any) {
    this.userId = data.userId;
    this.role = data.role;
    this.username = data.username;
    this.name = data.name;
    this.email = data.email;
    this.phoneNumber = data.phoneNumber;
    this.photoUrl = data.photoUrl;
    this.dni = data.dni;
    this.licenseNumber = data.licenseNumber;
    this.insuranceNumber = data.insuranceNumber;
    this.vehicle = data.vehicle;
    this.studentIds = data.studentIds;
  }
}
