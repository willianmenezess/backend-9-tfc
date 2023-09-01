import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { matches } from './mocks/MatchMock';
import { teams } from './mocks/TeamMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste do LEADERBOARD endpoint', () => {
  afterEach(sinon.restore);
  it('Retorna status 200 e as performances dos times em casa (home) com sucesso, em ordem decrescente com base nos critérios estabelecidos', async function () {
		sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any)
		sinon.stub(SequelizeMatch, 'findAll').resolves(matches as any)
		const httpRespose = await chai.request(app).get('/leaderboard/home');
		const { status, body } = httpRespose;
		expect(status).to.equal(200);
  });
});