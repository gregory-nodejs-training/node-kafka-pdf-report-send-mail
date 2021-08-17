import { HTTP400Error } from '@exceptions/HTTP400Error';
import { validateOrReject } from 'class-validator';

class Validators {
  static async validateObject<T extends Object>(t: T) {
    try {
      await validateOrReject(t);
    } catch (errors) {
      throw new HTTP400Error(`Caught promise rejection (validation failed).\n Errors: ${errors}`);
    }
  }
}

export { Validators };
