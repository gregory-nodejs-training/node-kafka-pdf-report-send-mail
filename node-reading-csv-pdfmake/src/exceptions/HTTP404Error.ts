import { HttpStatusCode } from '@sharedEntities/HttpStatusCode';
import { BaseError } from './BaseError';

class HTTP404Error extends BaseError {
  constructor(description = 'not found') {
    super('NOT_FOUND', HttpStatusCode.NOT_FOUND, description, true);
  }
}

export { HTTP404Error };
