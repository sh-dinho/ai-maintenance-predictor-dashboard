/**
 * Script: generate_random_csv.js
 * Purpose: Generate random CSV files for testing Upload & Validation
 * Usage:   node generate_random_csv.js
 */

const fs = require("fs");

// Utility: random date in 2025
function randomDate() {
  const start = new Date(2025, 0, 1);
  const end = new Date(2025, 11, 31);
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.toISOString().split("T")[0];
}

// Utility: random location
const locations = ["Boiler Room", "Main Line", "Assembly Area", "Storage Room", "Control Panel", "Workshop", "Underground"];
function randomLocation() {
  return locations[Math.floor(Math.random() * locations.length)];
}

// Utility: random risk level
const riskLevels = ["High", "Medium", "Low"];
function randomRisk() {
  return riskLevels[Math.floor(Math.random() * riskLevels.length)];
}

// Generate valid rows
function generateValidRows(count) {
  let rows = "equipment_id,failure_probability,risk_level,lastMaintenanceDate,sensorLocation\n";
  for (let i = 1; i <= count; i++) {
    rows += `Equip-${i},${(Math.random()).toFixed(2)},${randomRisk()},${randomDate()},${randomLocation()}\n`;
  }
  return rows;
}

// Generate mixed rows (valid + invalid)
function generateMixedRows(count) {
  let rows = "equipment_id,failure_probability,risk_level,lastMaintenanceDate,sensorLocation\n";
  for (let i = 1; i <= count; i++) {
    const invalidChance = Math.random();
    let failureProb = (Math.random()).toFixed(2);
    let risk = randomRisk();
    let date = randomDate();

    if (invalidChance < 0.25) failureProb = "abc"; // invalid number
    else if (invalidChance < 0.5) failureProb = "1.5"; // >1 invalid
    else if (invalidChance < 0.75) risk = "InvalidRisk"; // invalid risk
    else if (invalidChance < 1.0) date = "not-a-date"; // invalid date

    rows += `Equip-${i},${failureProb},${risk},${date},${randomLocation()}\n`;
  }
  return rows;
}

// Write files
fs.writeFileSync("random_valid.csv", generateValidRows(20));
fs.writeFileSync("random_mixed.csv", generateMixedRows(20));

console.log("✅ Random CSV files generated:");
console.log(" - random_valid.csv (20 valid rows)");
console.log(" - random_mixed.csv (20 mixed valid + invalid rows)");