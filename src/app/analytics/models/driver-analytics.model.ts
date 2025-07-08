export interface DriverAnalytics {
  driverUserId: number;
  week: string;
  speedPerDay: SpeedPerDay[];
  arrivalTimes: ArrivalTime[];
  incidentSummary: IncidentSummary;
}

export interface SpeedPerDay {
  day: string;
  averageSpeed: number;
}

export interface ArrivalTime {
  day: string;
  time: string;
}

export interface IncidentSummary {
  detour: number;
  lateness: number;
  speeding: number;
}
