export const Register = (req, res) => {
  console.log(req.body);
  res.status(200);
  res.send('Register');
};

export const Login = (req, res) => {
  console.log(req.body);
  res.send('Login');
};
