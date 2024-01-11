/**
 * Send an error JSON
 * @param res - response object
 * @param code - status code
 * @param message - error message
 * @returns {Object} - JSON response
 */
 const errorResMsg = (res:any, code: number, message: string) =>
 res.status(code).json({
   status: "error",
   error: message,
 });

/**
* Success JSON to be sent
* @param res - response Object
* @param code - status code
* @param responseData - data to be sent, it requires a message object
* @returns {Object} - JSON response
*/
const successResMsg = (res: any, code: number, responseData: any) => {
 const { message, data } = responseData;
 return res.status(code).json({
   status: "success",
   message,
   data,
 });
};

/**
* Success JSON to be sent
* @param res - response Object
* @param code - status code
* @param responseData - data to be sent, it requires a message object
* @returns {Object} - JSON response
*/
const customResMsg = (res: any, code: number, status: string, responseData: any) => {
 const { message, data, error } = responseData;
 return res.status(code).json({
   status,
   message,
   data,
   error,
 });
};

const redirect = (res: any, url: string) => res.status(302).redirect(url);

export { errorResMsg, successResMsg, customResMsg, redirect };
