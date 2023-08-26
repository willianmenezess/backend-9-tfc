import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { team, teams } from './mocks/TeamMock';

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
})
