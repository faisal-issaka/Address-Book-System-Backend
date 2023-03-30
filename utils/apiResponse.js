export const successResponse = (res, msg) => {
  const data = {
    status: 1,
    message: msg,
  };
  return res.status(200).json(data);
};

export const successResponseWithData = (res, message, data) => {
  const resData = {
    status: 1,
    success: true,
    message,
    data,
  };
  return res.status(200).json(resData);
};

export const errorResponse = (res, msg) => {
  const data = {
    status: 0,
    message: msg,
  };
  return res.status(400).json(data);
};

export const errorResponseWithData = (res, msg, data) => {
  const resp = {
    status: 0,
    message: msg,
    data,
  };
  return res.status(400).json(resp);
};

export const notFoundResponse = (res, msg) => {
  const data = {
    status: 0,
    message: msg,
  };
  return res.status(404).json(data);
};

export const validationErrorWithData = (res, msg, data) => {
  const resData = {
    status: 0,
    message: msg,
    data,
  };
  return res.status(400).json(resData);
};

export const validationErrorOnly = (res, msg) => {
  const resData = {
    status: 0,
    success: false,
    error: msg,
  };
  return res.status(400).json(resData);
};

export const unauthorizedResponse = (res, msg) => {
  const data = {
    status: 0,
    message: msg,
  };
  return res.status(401).json(data);
};
