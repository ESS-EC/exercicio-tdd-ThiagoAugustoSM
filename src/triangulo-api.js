let express = require('express');
let app = express();
const triangulo = require('./triangulo');

let bodyParser = require('body-parser');
app.use(bodyParser.json());       
let port = 8080;

app.get('/temperatura', (req, res) => {
  const {lado1, lado2, lado3} = req.query;

  if(lado1 == undefined) {res.status(400).json({missing: "lado1"}); return}
  else if(lado2 == undefined) {res.status(400).json({missing: "lado2"}); return}
  else if(lado3 == undefined) {res.status(400).json({missing: "lado3"}); return}

  if(isNaN(lado1)) {res.status(400).json({wrongValue: "lado1"}); return}
  else if(isNaN(lado2)) {res.status(400).json({wrongValue: "lado2"}); return}
  else if(isNaN(lado3)) {res.status(400).json({wrongValue: "lado3"}); return}

  if(triangulo.valido(lado1, lado2, lado3)){
    return ({tipo: triangulo.tipo(lado1, lado2, lado3)})
  }else{
    res.status(400).json({wrongValue: 'Triangulo não válido'});
    return
  }
});

// app.listen(port)

module.exports = app;