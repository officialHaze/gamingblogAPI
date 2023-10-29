import { devLogger, logger } from "../logger.config";
import Crypto from "./Crypto";

interface TokenObj {
  expiry: number;
  data: any;
}

export default class JWT {
  private static signature(returntype: string) {
    const sign = process.env.JWT_SIGN;
    if (returntype === "plain-text") return sign;
    try {
      const signEncrypted = Crypto.encrypt(sign);
      return signEncrypted;
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  private static isExpired(token: string): boolean {
    try {
      const decToken = Crypto.decrypt(token);
      devLogger.log({ decTokenString: decToken });
      const tokenData: TokenObj = JSON.parse(decToken);
      const expiry = tokenData.expiry;

      const currentMs = new Date().getMilliseconds();

      devLogger.log({ currentTime: currentMs, expiryTime: expiry });

      return currentMs >= expiry ? true : false;
    } catch (err) {
      logger.error(err);
      return true;
    }
  }

  private static isValidSignature(sign: string): boolean {
    const signature = this.signature("plain-text");

    if (!signature) return false;
    else {
      try {
        const decSign = JSON.parse(Crypto.decrypt(sign));
        return decSign === signature ? true : false;
      } catch (err) {
        logger.error(err);
        return false;
      }
    }
  }

  static tokenize(object: any) {
    const expiryLimit = process.env.EXPIRY;
    const sign = this.signature("encrypted");

    if (sign && expiryLimit) {
      const tokenObj: TokenObj = {
        expiry: new Date().getMilliseconds() + parseInt(expiryLimit),
        data: object,
      };
      try {
        const token = Crypto.encrypt(tokenObj);
        // Log the token and the signature seperately before concating
        devLogger.log({
          token: token,
          sign: sign,
        });
        const signedToken = `${token}.${sign}`;
        devLogger.log({
          signed_token: signedToken,
        });
        return signedToken;
      } catch (err) {
        throw err;
      }
    } else {
      throw new Error("Error while creating JWT please check the env variables!");
    }
  }

  static isVerified(signedtoken: string): boolean {
    const token = signedtoken.split(".")[0];
    const sign = signedtoken.split(".")[1];

    const isExpired = this.isExpired(token);
    const isValidSign = this.isValidSignature(sign);

    devLogger.log({
      token_expired: isExpired,
      token_valid_sign: isValidSign,
    });

    return !isExpired && isValidSign ? true : false;
  }
}
