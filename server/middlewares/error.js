exports.errorHandler = (err, req, res) => {
  const status = err.status ? err.status : 500;
  res.status(status).send(err);
};
