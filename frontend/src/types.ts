// src/types.ts
export type RiskRow = {
  equipment_id: string;
  failure_probability: number;
  risk_level: "High" | "Medium" | "Low";
  lastMaintenanceDate?: string;   
  sensorLocation?: string;        
};