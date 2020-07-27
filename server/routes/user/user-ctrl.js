exports.getUserController = (req, res) => {
  res.status(200).json({ name: 'bong', age: 900 });
};

exports.postUserController = (req, res) => {
  const { name } = req.body;
  console.log(name);
  res.status(201).json('');
};
