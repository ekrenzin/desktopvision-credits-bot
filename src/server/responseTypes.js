import { Response } from 'node-fetch';

/**
 * JsonResponse class extending Response.
 * Transforms input to JSON string.
 */
class JsonResponse extends Response {
  /**
   * @param {Object} body - JSON serializable object
   * @param {Object} [init] - Optional init settings
   */
  constructor(body, init = {}) {
    const jsonBody = JSON.stringify(body);
    init.headers = { 'content-type': 'application/json;charset=UTF-8', ...init.headers };
    super(jsonBody, init);
  }
}

export { JsonResponse };
