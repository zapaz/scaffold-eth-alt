// Importing the elliptic library
import ELLIPTIC from 'elliptic';
const EC = ELLIPTIC.ec;

export const main = (params) => {
  const { path } = params;

  // Using secp256k1 curve, commonly used in Ethereum
  const ec = new EC('secp256k1');

  // Your message hash to be signed
  const msg = path?.slice(1) || "Bonjour!";

  // Generate a random private key and derive the public key
  const key = ec.genKeyPair();

  // Sign the message hash
  const sig = key.sign(msg).toDER('hex');

  return `${msg}\n${key.getPublic(true, 'hex')}\n${sig}\n`;
}
