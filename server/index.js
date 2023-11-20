const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

const MERKLE_ROOT = '86d6085c29f8ccad5c4a95f3db65d081e4b74ebda976b4bed89f1d27c137f99b';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end
  const {proof, name} = req.body;

  // prove that a name is in the list 
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
