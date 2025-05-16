export interface Alert {
  id: number;
  description: string;
  timestamp: string;
  trip_analytics_id: number;
  type: 'Lateness' | 'Detour' | 'Speeding';
}
