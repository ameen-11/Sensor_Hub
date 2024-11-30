interface SensorDataResponse {
  timestamp: string;
  id: string;
  ax: number;
  ay: number;
  az: number;
  pitch: number;
  roll: number;
  azimuth: number;
  avx: number;
  avy: number;
  avz: number;
  mfx: number;
  mfy: number;
  mfz: number;
  latitude: number;
  longitude: number;
  altitude: number;
  hacc: number;
  synced: boolean;
}


interface sensorDataType {
  timestamp: string;
  ax: number | null;
  ay: number | null;
  az: number | null;
  pitch: number | null;
  roll: number | null;
  azimuth: number | null;
  avx: number | null;
  avy: number | null;
  avz: number | null;
  mfx: number | null;
  mfy: number | null;
  mfz: number | null;
  latitude: number | null;
  longitude: number | null;
  altitude: number | null;
  hacc: number | null;
}
