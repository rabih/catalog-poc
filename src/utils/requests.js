import queryString from 'query-string';

export const getRequest = (endpoint, params, headers = {}, options = {}, arrayFormat = 'comma') => {
    //hack up these requests
    headers = {
      'Accept': 'application/json',
      'Authorization': '5eGcelJUaBarpELnB8t91ZaTVrmxgGAk',
      'Access-Control-Allow-Origin': '*',      
      ...headers,
    }
    let queryStr = '';
    if (params && Object.keys(params).length > 0) {
      queryStr = `?${queryString.stringify(params, { arrayFormat, encode: false })}`;
    }
    const url = `https://api.convictional.com` + endpoint + queryStr;
    return submitRequest(url, getJSONOptions(headers, options));
  };

export const getJSONOptions = (headers = {}, options = {}) => ({
  method: 'GET',
  //credentials: 'include',
  headers: {
      Accept: 'application/json',
      ...headers,
  },
  ...options,
});

export const submitRequest = async (url, options, responseType) => {
  const [data, err] = await to(request(url, options, responseType));
  if (data) return data; // successful request, return result
}

// utility to easily return [data, error] tuple from promise
// allows us to use multiple awaits in a similar fashion as golang error handling (and not have to wrap in many try-catch blocks)
// example: let [data, error] = await to(callAPI())
export const to = (promise) =>
  promise.then((result) => [result, null]).catch((err) => [undefined, err]);


export const request = async (url, options, responseType = 'json') => {

  try {
    const res = await window.fetch(url, options);
    // either json or blob on success
    if (res.ok) {
      const body =
        responseType === 'json'
          ? await res.json().catch((error) => {
              if (!(error instanceof SyntaxError)) {
                // Workaround because not all of backend API endpoints return a JSON response
                throw error;
              }
            })
          : await res.blob();
      return body;
    }

    // on error status, try to parse JSON response even if blob was requested
    const body = await res.json().catch((err) => {
      if (!(err instanceof SyntaxError)) {
        // Workaround because not all of backend API endpoints return a JSON response
        throw err;
      } else if (res.status === 404) {
        // 404s will throw a syntax error (JSON is not returned)
        throw new Error('Not Found', 404);
      }
    });
    let errMsg = 'An unexpected error occurred, please contact support@convictional.com';
    let errors = [];
    if (body && typeof body.error === 'string') {
      errMsg = body.error;
    } else if (body && body.error && body.error.length > 0) {
      errMsg = body.error[0].message; // main error message is set as message of first error
      errors = body.error; // pass the whole errors list to the ApiError constructor
    }

    // Attach an authenticate error header to the APIError
    const authErr = body.code ? body.code : '';
    throw new Error(errMsg, res.status, authErr, errors);
  } catch (error) {
    if (error.name === 'AbortError' || error instanceof DOMException) {
      throw new Error('Request timed out');
    }
    throw error;
  }
};