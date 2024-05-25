// const asyncHandler = function (requestHandler) {
//   return async (req, res, next) => {
//     try {
//       await Promise.resolve(requestHandler(req, res, next));
//     } catch (error) {
//       return next(error);
//     }
//   };
// };

const asyncHandler = function (requestHandler) {
  return async (req, res, next) => {
    try {
      const result = await requestHandler(req, res, next);
      return result;
    } catch (error) {
      return next(error);
    }
  };
};

// const asyncHandler2 = (requestHandler) => {
//   return (req, res, next) => {
//     Promise.resolve(requestHandler(req, res, next)).catch((error) =>
//       next(error)
//     );
//   };
// };

export { asyncHandler };
