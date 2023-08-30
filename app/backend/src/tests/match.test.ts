import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import JWT from '../utils/JWT';
// import Validations from '../middlewares/Validations';
import { matches, matchesInProgressTrue, matchesInProgressFalse, newMatchInput, newMatchFromDB, newMatchInputRepeatedTeam, matchWithInvalidTeamId } from '../tests/mocks/MatchMock';
// import * as bcrypt from 'bcrypt';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste do MATCH endpoint', () => {
  afterEach(sinon.restore);
  it('Retorna um status 200 e todas as partidas (matches) com sucesso', async function () {
		sinon.stub(SequelizeMatch, 'findAll').resolves(matches as any);
    const httpResponse = await chai.request(app).get('/matches');
		const { status, body } = httpResponse;
		expect(status).to.equal(200);
		expect(body).to.deep.equal(matches);
  });
  it('Retorna um status 200 e todas as partidas (matches) em andamento com sucesso', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesInProgressTrue as any);
    const httpResponse = await chai.request(app).get('/matches?inProgress=true');
    const { status, body } = httpResponse;
    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesInProgressTrue);
  });
  it('Retorna um status 200 e todas as partidas (matches) terminadas com sucesso', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesInProgressFalse as any);
    const httpResponse = await chai.request(app).get('/matches?inProgress=false');
    const { status, body } = httpResponse;
    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesInProgressFalse);
  });
  it('Retorna um status 200 a mensagem "Finished" ao finalizar uma partida (match) com sucesso', async function () {
    sinon.stub(JWT, 'verify').resolves();
    sinon.stub(SequelizeMatch, 'update').resolves();
    const httpResponse = await chai.request(app).patch('/matches/1/finish').set('authorization', 'validToken').send();
    const { status, body } = httpResponse;
    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: 'Finished' });
  });
  it('Retorna um status 200 a mensagem "Updated" ao atualizar uma partida (match) com sucesso', async function () {
    sinon.stub(JWT, 'verify').resolves();
    sinon.stub(SequelizeMatch, 'update').resolves();
    const httpResponse = await chai.request(app).patch('/matches/1').set('authorization', 'validToken').send({
      "homeTeamGoals": 3,
      "awayTeamGoals": 1
    });
    const { status, body } = httpResponse;
    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: 'Updated' });
  });
  it('Retorna um status 201 e os dados da partida (match) criada com sucesso', async function () {
    sinon.stub(JWT, 'verify').resolves();
    sinon.stub(SequelizeTeam, 'findByPk').onFirstCall().resolves({ homeTeam: 'simula retorno do time da casa' } as any).onSecondCall().resolves({ awayTeam: 'simula retorno do time visitante' } as any);
    sinon.stub(SequelizeMatch, 'create').resolves(newMatchFromDB as any);
    
    const httpResponse = await chai.request(app).post('/matches').set('authorization', 'validToken').send(newMatchInput);
    const { status, body } = httpResponse;
    expect(status).to.equal(201);
    expect(body).to.deep.equal(newMatchFromDB);
  });
  it('Retorna um status 422 e uma msg de erro ao inserir partida com 2 times iguais', async function() {
    sinon.stub(JWT, 'verify').resolves();
    sinon.stub(SequelizeTeam, 'findByPk').onFirstCall().resolves({ homeTeam: 'simula retorno do time da casa' } as any).onSecondCall().resolves({ awayTeam: 'simula retorno do time da casa' } as any);

    const httpResponse = await chai.request(app).post('/matches').set('authorization', 'validToken').send(newMatchInputRepeatedTeam);
    const { status, body } = httpResponse;
    expect(status).to.equal(422);
    expect(body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
  })
  it('Retorna um status 404 e uma msg de erro ao inserir partida com time inexistente', async function() {
    sinon.stub(JWT, 'verify').resolves();
    sinon.stub(SequelizeTeam, 'findByPk').onFirstCall().resolves({ homeTeam: 'simula retorno do time da casa' } as any).onSecondCall().resolves(null);

    const httpResponse = await chai.request(app).post('/matches').set('authorization', 'validToken').send(matchWithInvalidTeamId);
    const { status, body } = httpResponse;
    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'There is no team with such id!' });
  });
});