/**
 * Script: generate_model_ready_csv.js
 * Purpose: Generate random CSV compatible with the backend dummy ML model
 * Usage:   node generate_model_ready_csv.js
 */

const fs = require("fs");

// Utility: random float in a range
function randomFloat(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

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

// Generate CSV rows
function generateRows(count) {
  let rows = "equipment_id,temperature,vibration,pressure,runtime,lastMaintenanceDate,sensorLocation\n";
  for (let i = 1; i <= count; i++) {
    rows += `Equip-${i},${randomFloat(20, 100)},${randomFloat(0, 10)},${randomFloat(1, 50)},${randomFloat(0, 1000)},${randomDate()},${randomLocation()}\n`;
  }
  return rows;
}

// Write file
const filename = "model_ready_random.csv";
fs.writeFileSync(filename, generateRows(20));

console.log(`✅ CSV generated: ${filename}`);
console.log(" - 20 rows with 4 numeric features + equipment_id, lastMaintenanceDate, sensorLocation");
