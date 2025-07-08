export interface Wristband {
  id?: number;
  rfidCode: string;
  wristbandStatus: 'ACTIVE' | 'INACTIVE';
  studentId?: number;
  student?: {
    id: number;
    name: string;
    lastName: string;
    homeAddress: string;
    schoolAddress: string;
    studentPhotoUrl: string;
  };
  sensorScans?: Array<{
    id: number;
    scanTime: string;
    scanType: 'ENTRY' | 'EXIT';
    wristbandId: number;
  }>;
}

export interface CreateWristbandRequest {
  rfidCode: string;
  wristbandStatus: string;
  studentId: number;
}
