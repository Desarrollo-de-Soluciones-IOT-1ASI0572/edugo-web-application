export class Student {
  studentId: string;
  name: string;
  school: string;
  degree: string;
  rfidCode: string;
  photoUrl: string;
  parentUserId: string;
  driverUserId: string;

  constructor(data: any) {
    this.studentId = data.studentId;
    this.name = data.name;
    this.school = data.school;
    this.degree = data.degree;
    this.rfidCode = data.rfidCode;
    this.photoUrl = data.photoUrl;
    this.parentUserId = data.parentUserId;
    this.driverUserId = data.driverUserId;
  }
}
