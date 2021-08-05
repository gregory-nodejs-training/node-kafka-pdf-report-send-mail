import { ResponseObject } from '../../useCases/ResponseObject';

class ApiUtil {
  static createResponseError<T>(error: string) : ResponseObject<T> {
    return this.createResponseErrors<T>([error]);
  }

  static createResponseErrors<T>(errors: string[]): ResponseObject<T> {
    const responseObject = new ResponseObject<T>();
    responseObject.errors = errors;
    return responseObject;
  }

  static createResponseData<T>(data: T): ResponseObject<T> {
    const responseObject = new ResponseObject<T>();
    responseObject.data = data;
    return responseObject;
  }
}

export { ApiUtil };
