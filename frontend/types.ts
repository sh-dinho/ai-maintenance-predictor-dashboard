/**
 * File: src/types.ts
 * Purpose: Shared type definitions for the AI Maintenance Predictor Dashboard
 * Version: 1.0
 */

export type RiskRow = {
  equipment_id: string;
  failure_probability: number;
  risk_level: "High" | "Medium" | "Low";
  lastMaintenanceDate?: string;
  sensorLocation?: string;
};

export type ValidationIssue = {
  equipment_id?: string;
  reason: string;
};