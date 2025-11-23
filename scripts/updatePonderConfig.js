// scripts/updatePonderConfig.js
// This script reads the deployment addresses from `scripts/deployment.json`
// and updates the address fields in `ponder/ponder.config.ts` accordingly.

import fs from "fs";
import path from "path";

// Resolve paths
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const deploymentPath = path.resolve(__dirname, "deployment.json");
const configPath = path.resolve(__dirname, "../ponder/ponder.config.ts");

// Load deployment info
if (!fs.existsSync(deploymentPath)) {
    console.error("Deployment file not found at", deploymentPath);
    process.exit(1);
}
const deploymentInfo = JSON.parse(fs.readFileSync(deploymentPath, "utf-8"));

// Load current config
if (!fs.existsSync(configPath)) {
    console.error("Ponder config not found at", configPath);
    process.exit(1);
}
let configContent = fs.readFileSync(configPath, "utf-8");

// Mapping from contract name in config to key in deploymentInfo
const mapping = {
    AgentIdentityRegistry: "identityRegistry",
    AgentReputationRegistry: "reputationRegistry",
    AgentServiceRegistry: "serviceRegistry",
    AgentValidationRegistry: "validationRegistry",
    AgentJuryRegistry: "juryRegistry",
};

for (const [contractName, deploymentKey] of Object.entries(mapping)) {
    const address = deploymentInfo[deploymentKey];
    if (!address) {
        console.warn(`No address found for ${deploymentKey} in deployment.json`);
        continue;
    }
    // Replace the address line for this contract
    const regex = new RegExp(`(${contractName}\s*:\s*{[^}]*address:\s*")[^"]+(")`, "s");
    configContent = configContent.replace(regex, `$1${address}$2`);
}

// Write the updated config back
fs.writeFileSync(configPath, configContent, "utf-8");
console.log("Ponder config addresses updated successfully.");
