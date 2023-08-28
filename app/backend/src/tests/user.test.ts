import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import JWT from '../utils/JWT';
import Validations from '../middlewares/Validations';
import { validLoginBody, userFromDB } from './mocks/UserMock';
import * as bcrypt from 'bcrypt';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste do LOGIN endpoint', () => {
  afterEach(sinon.restore);
  it('Retorna um token de acesso e status 200 para um login com sucesso', async function () {
    sinon.stub(SequelizeUser, 'findOne').resolves(userFromDB as any);
		sinon.stub(bcrypt, 'compareSync').returns(true);
    sinon.stub(JWT, 'sign').returns('validToken');
    sinon.stub(Validations, 'validateLogin').returns();

    const httpResponse = await chai.request(app).post('/login').send(validLoginBody);
    const { status, body } = httpResponse;
    expect(status).to.equal(200);
    expect(body).to.have.key('token');
		expect(body).to.deep.equal({ token: 'validToken' });
  });
});