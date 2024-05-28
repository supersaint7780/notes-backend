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

export { asyncHandler };
