const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const KEYS_DIR = path.join(__dirname, "..", "keys");
const PRIVATE_KEY_PATH = path.join(KEYS_DIR, "jwt_private.pem");
const PUBLIC_KEY_PATH = path.join(KEYS_DIR, "jwt_public.pem");

// Ensure the keys directory exists
if (!fs.existsSync(KEYS_DIR)) {
  fs.mkdirSync(KEYS_DIR, { recursive: true });
}

// Generate keys if not present
if (!fs.existsSync(PRIVATE_KEY_PATH) || !fs.existsSync(PUBLIC_KEY_PATH)) {
  console.log("[JWT Keys] Key pair not found on disk. Generating new RSA 2048-bit keys...");
  try {
    const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
      },
    });

    fs.writeFileSync(PRIVATE_KEY_PATH, privateKey, "utf8");
    fs.writeFileSync(PUBLIC_KEY_PATH, publicKey, "utf8");
    console.log("[JWT Keys] Key pair successfully generated and saved to keys/ directory.");
  } catch (err) {
    console.error("[JWT Keys] Failed to generate RSA key pair:", err);
    throw err;
  }
}

const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, "utf8");
const publicKey = fs.readFileSync(PUBLIC_KEY_PATH, "utf8");

module.exports = {
  privateKey,
  publicKey,
};
