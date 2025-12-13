/**
 * Script: generate_test_csv.js
 * Purpose: Generate sample CSV files for testing Upload & Validation
 * Usage:   node generate_test_csv.js
 */

const fs = require("fs");

// CSV with valid + invalid rows
const mixedCsv = `equipment_id,failure_probability,risk_level,lastMaintenanceDate,sensorLocation
Pump-001,0.85,High,2025-05-01,Boiler Room
Valve-002,0.45,Medium,2025-04-15,Main Line
Motor-003,0.10,Low,2025-03-20,Assembly Area
Fan-004,1.20,High,2025-05-10,Storage Room
Sensor-005,0.50,InvalidRisk,2025-04-01,Control Panel
Compressor-006,abc,Medium,2025-02-28,Workshop
Pipe-007,0.70,High,not-a-date,Underground
`;

// CSV with only valid rows
const validCsv = `equipment_id,failure_probability,risk_level,lastMaintenanceDate,sensorLocation
Pump-101,0.90,High,2025-05-05,Boiler Room
Valve-102,0.40,Medium,2025-04-12,Main Line
Motor-103,0.15,Low,2025-03-18,Assembly Area
Fan-104,0.70,High,2025-05-08,Storage Room
Sensor-105,0.25,Low,2025-04-02,Control Panel
Compressor-106,0.55,Medium,2025-02-25,Workshop
Pipe-107,0.65,High,2025-03-30,Underground
`;

// Write files
fs.writeFileSync("sample_mixed.csv", mixedCsv);
fs.writeFileSync("sample_valid.csv", validCsv);

console.log("✅ CSV files generated:");
console.log(" - sample_mixed.csv (valid + invalid rows)");
console.log(" - sample_valid.csv (only valid rows)");