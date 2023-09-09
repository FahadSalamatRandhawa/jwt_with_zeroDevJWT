import * as fs from "fs";
import * as forge from "node-forge";
import * as crypto from "crypto";
import { pem2jwk } from "pem-jwk";
import * as dotenv from "dotenv";
dotenv.config();

const { publicKey, privateKey } = forge.pki.rsa.generateKeyPair({
  bits: 2048,
  algorithm: "RSA256",
});

const privatePem = forge.pki.privateKeyToPem(privateKey);
const publicPem = forge.pki.publicKeyToPem(publicKey);

fs.writeFileSync(process.cwd() + "/src/certs/private.pem", privatePem, "utf8");
fs.writeFileSync(process.cwd() + "/src/certs/public.pem", publicPem, "utf8");

const public_key = fs.readFileSync(
  process.cwd() + "/src/certs/public.pem",
  "utf8"
);
const jwkPublicKey = pem2jwk(public_key);
console.log("public key generated", public_key);
const public_hash = crypto
  .createHash("sha256")
  .update(public_key)
  .digest("base64");
console.log("JWKS kid generated", public_hash);

const jwk = {
  alg: "RS256",
  use: "sig",
  ...jwkPublicKey,
  kid: public_hash,
};

fs.writeFileSync(
  process.cwd() + "/public/.well-known/jwks.json",
  JSON.stringify(jwk, null, 2)
);
