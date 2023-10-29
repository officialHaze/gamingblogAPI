import { AES, Rabbit, TripleDES, enc, mode, pad } from "crypto-js";

export default class Crypto {
  private static nonce() {
    const nonce = process.env.ENC_NONCE;
    return nonce ?? "";
  }

  static encrypt(object: any) {
    const objString = JSON.stringify(object);

    if (!this.nonce())
      throw new Error("No secret key found in env file, cannot proceed with encryption");

    const cipher = AES.encrypt(objString, this.nonce(), {
      mode: mode.ECB,
      padding: pad.Iso97971,
    });
    const encryption = cipher.toString().split("=")[0];
    return encryption;
  }

  static decrypt(encryptedString: string) {
    if (!this.nonce())
      throw new Error("No secret key found in env file, cannot proceed with encryption");

    const cipher = AES.decrypt(encryptedString, this.nonce(), {
      mode: mode.ECB,
      padding: pad.Iso97971,
    });
    const decryptedString = cipher.toString(enc.Utf8);
    return decryptedString;
  }
}
