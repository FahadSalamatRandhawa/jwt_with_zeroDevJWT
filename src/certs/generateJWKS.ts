import * as fs from 'fs';
import * as forge from 'node-forge';
import * as crypto from 'crypto'
import {pem2jwk} from 'pem-jwk'

const {publicKey, privateKey}=forge.pki.rsa.generateKeyPair({bits:2048,algorithm:'RSA256'})

const privatePem = forge.pki.privateKeyToPem(privateKey);
const publicPem = forge.pki.publicKeyToPem(publicKey);

fs.writeFileSync(process.cwd()+'/src/certs/private.pem', privatePem, 'utf8');
fs.writeFileSync(process.cwd()+'/src/certs/public.pem', publicPem, 'utf8');

const jwkPublicKey = pem2jwk(publicPem);
const public_key=fs.readFileSync(process.cwd()+'/src/certs/public.pem','utf8')
const kid=crypto.createHash('sha256').update(public_key).digest('base64')

const jwk={
    alg:"RS256",
    use:"sig",
    ...jwkPublicKey,
    kid
}


fs.writeFileSync(process.cwd()+'/public/.well-known/jwks.json',JSON.stringify(jwk,null,2))
