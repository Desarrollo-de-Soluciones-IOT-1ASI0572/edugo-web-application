export interface DriverAnalytics {
    driverUserId: string;
    driverName: string;
    incidentSummary: IncidentSummary;
    arrivalTimesAtSchool: ArrivalTime[];
    distanceTraveled: DistanceTraveled[];
}

export interface IncidentSummary {
    detour: number;
    lateness: number;
    speeding: number;
}

export interface ArrivalTime {
    date: string;
    time: string;
}

export interface DistanceTraveled {
    date: string;
    kilometers: number;
} 