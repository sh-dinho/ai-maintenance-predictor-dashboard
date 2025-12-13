/**
 * File: src/utils/validateRiskRow.ts
 * Purpose: Validation logic for parsed CSV rows
 * Version: 1.0
 */

import { RiskRow, ValidationIssue } from "../../../types";

export function validateRiskRow(row: Partial<RiskRow>): { valid: RiskRow | null; issue?: ValidationIssue } {
  if (!row.equipment_id || typeof row.equipment_id !== "string") {
    return { valid: null, issue: { reason: "Missing or invalid equipment_id" } };
  }

  const prob = Number(row.failure_probability);
  if (isNaN(prob) || prob < 0 || prob > 1) {
    return { valid: null, issue: { equipment_id: row.equipment_id, reason: "failure_probability must be between 0 and 1" } };
  }

  if (!["High", "Medium", "Low"].includes(row.risk_level as string)) {
    return { valid: null, issue: { equipment_id: row.equipment_id, reason: "Invalid risk_level" } };
  }

  if (row.lastMaintenanceDate) {
    const date = new Date(row.lastMaintenanceDate);
    if (isNaN(date.getTime())) {
      return { valid: null, issue: { equipment_id: row.equipment_id, reason: "Invalid lastMaintenanceDate format" } };
    }
  }

  return {
    valid: {
      equipment_id: row.equipment_id,
      failure_probability: prob,
      risk_level: row.risk_level as "High" | "Medium" | "Low",
      lastMaintenanceDate: row.lastMaintenanceDate,
      sensorLocation: row.sensorLocation,
    },
  };
}