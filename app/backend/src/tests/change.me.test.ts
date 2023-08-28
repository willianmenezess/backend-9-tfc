import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { team, teams } from './mocks/TeamMock';
import SequelizeUser from '../database/models/SequelizeUser';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

// describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

//   it('Seu sub-teste', () => {
//     expect(false).to.be.eq(true);
//   });
// });

describe('Server', () => {
  it('testa se está tudo OK nos testes de integração', async function () {
    const { status } = await chai.request(app).get('/');
    expect(status).to.equal(200);
  });
})

describe('Teste do TEAMS endpoint', () => {
  afterEach(sinon.restore);
  it('Retorna todos os times com sucesso', async function () {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);
    const httpResponse = await chai.request(app).get('/teams');
    const { status, body } = httpResponse;
    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });
  it('Retorna um time com sucesso', async function () {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(team as any);
    const httpResponse = await chai.request(app).get('/teams/12');
    const { status, body } = httpResponse;
    expect(status).to.equal(200);
    expect(body).to.deep.equal(team);
  });
  it('Retorna erro 404 quando não encontra um time', async function () {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
    const httpResponse = await chai.request(app).get('/teams/12');
    const { status, body } = httpResponse;
    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'Team not found.' });
  });
})

// describe('Teste do LOGIN endpoint', () => {
//   afterEach(sinon.restore);
//   it('Retorna um token de acesso com sucesso', async function () {
//     sinon.stub(SequelizeTeam, 'findByPk').resolves(user as any);
//     sinon.stub(JWT, 'sign').returns('validToken');
//     sinon.stub(Validations, 'validateUser').returns();

//     const httpResponse = await chai.request(app).post('/login').set('authorization', 'validToken').send(user);
//     const { status, body } = httpResponse;
//     expect(status).to.equal(200);
//     expect(body).to.deep.equal({ token: 'validToken' });
//   });
// });
