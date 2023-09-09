"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var forge = require("node-forge");
var crypto = require("crypto");
var pem_jwk_1 = require("pem-jwk");
var dotenv = require("dotenv");
dotenv.config();
var _a = forge.pki.rsa.generateKeyPair({
    bits: 2048,
    algorithm: "RSA256",
}), publicKey = _a.publicKey, privateKey = _a.privateKey;
var privatePem = forge.pki.privateKeyToPem(privateKey);
var publicPem = forge.pki.publicKeyToPem(publicKey);
fs.writeFileSync(process.cwd() + "/src/certs/private.pem", privatePem, "utf8");
fs.writeFileSync(process.cwd() + "/src/certs/public.pem", publicPem, "utf8");
var public_key = fs.readFileSync(process.cwd() + "/src/certs/public.pem", "utf8");
var jwkPublicKey = (0, pem_jwk_1.pem2jwk)(public_key);
console.log("public key generated", public_key);
var public_hash = crypto
    .createHash("sha256")
    .update(public_key)
    .digest("base64");
console.log("JWKS kid generated", public_hash);
var jwk = __assign(__assign({ alg: "RS256", use: "sig" }, jwkPublicKey), { kid: public_hash });
fs.writeFileSync(process.cwd() + "/public/.well-known/jwks.json", JSON.stringify(jwk, null, 2));
