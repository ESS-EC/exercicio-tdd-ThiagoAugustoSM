const chai = require('chai')
  , chaiHttp = require('chai-http');
  chai.use(chaiHttp);
const expect = chai.expect;
let should = chai.should();

const app = require('../triangulo-api');

describe('Verificando se a saida é valida', () => {
  it('deveria retornar um triangulo valido', (done) => {
    chai.request(app)
      .get('/triangulo?lado1=3&lado2=4&lado3=5')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('tipo', 'Escaleno');
        done();
      });
  });
  it('deveria retornar um trianglo não valido', (done) => {
    chai.request(app)
      .get('/triangulo?lado1=50&lado2=4&lado3=5')
      .end((err, res) => {
        console.log(typeof res.body)
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('wrongValue', 'Triangulo não válido');
        done();
      });
  });
});

describe('Verificando se parametro eh valido', () => {
  it('deveria retornar erro no lado1', (done) => {
    chai.request(app)
      .get('/triangulo?lado1=CAVALO&lado2=4&lado3=4')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('wrongValue', 'lado1');
        done();
      });
  });
  it('deveria retornar erro no lado2', (done) => {
    chai.request(app)
    .get('/triangulo?lado1=2&lado2=CAVALO&lado3=4')
    .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('wrongValue', 'lado2');
        done();
      });
  });
  it('deveria retornar erro no lado3', (done) => {
    chai.request(app)
      .get('/triangulo?lado1=2&lado2=4&lado3=CAVALO')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('wrongValue', 'lado3');
        done();
      });
  });
});

describe('Verificando se retonar erro com requisição sem parâmetro', () => {
  it('deveria retornar status 400 e parametro lado3 que faltou', (done) => {
    chai.request(app)
    .get('/triangulo?lado1=2&lado2=4')
    .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('missing', 'lado3');
        done();
      });
  });
  it('deveria retornar status 400 e parametro "de" que faltou', (done) => {
    chai.request(app)
      .get('/triangulo?lado1=2&lado3=4')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('missing', 'lado2');
        done();
      });
  });
  it('deveria retornar status 400 e parametro que faltou', (done) => {
    chai.request(app)
      .get('/triangulo?lado2=4&lado3=4')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('missing', 'lado1');
        done();
      });
  });
});