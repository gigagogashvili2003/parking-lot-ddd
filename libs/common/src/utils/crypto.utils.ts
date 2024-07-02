import * as crypto from 'crypto';
import { UUID } from '../types';

export class CryptoUtils {
  public static generateUUID(): UUID {
    const uuid = crypto.randomBytes(16).toString('hex') as UUID;
    return uuid;
  }
}
