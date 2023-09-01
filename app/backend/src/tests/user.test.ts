import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import JWT from '../utils/JWT';
import Validations from '../middlewares/Validations';
import { validLoginBody, userFromDB, invalidEmailLoginBody, invalidPasswordLoginBody } from './mocks/UserMock';

import * as bcrypt from 'bcryptjs';

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
	it('Retorna um erro 400 para um login com dados inválidos', async function () {
		const httpResponse = await chai.request(app).post('/login').send({ email: '', password: '' });
		const { status, body } = httpResponse;
		expect(status).to.equal(400);
		expect(body).to.have.key('message');
		expect(body).to.deep.equal({ message: 'All fields must be filled' });
	});
	it('Retorna um erro 404 para um login com usuário não encontrado (email inválido)', async function () {
		sinon.stub(SequelizeUser, 'findOne').resolves(null);
		const httpResponse = await chai.request(app).post('/login').send(invalidEmailLoginBody);
		const { status, body } = httpResponse;
		expect(status).to.equal(401);
		expect(body).to.have.key('message');
	});
	it('Retorna um erro 400 para um login com senha incorreta', async function () {
		sinon.stub(SequelizeUser, 'findOne').resolves(userFromDB as any);
		sinon.stub(bcrypt, 'compareSync').returns(false);
		const httpResponse = await chai.request(app).post('/login').send(invalidPasswordLoginBody);
		const { status, body } = httpResponse;
		expect(status).to.equal(401);
		expect(body).to.have.key('message');
	});
	it('Retorna um erro 401 para um email no formato inválido', async function () {
		const httpResponse = await chai.request(app).post('/login').send({...validLoginBody, email: 'email_invalido'});
		const { status, body } = httpResponse;
		expect(status).to.equal(401);
		expect(body).to.have.key('message');
	});
	it('Retorna um erro 401 para uma senha com menos de 6 caracteres', async function () {
		const httpResponse = await chai.request(app).post('/login').send({...validLoginBody, password: '12345'});
		const { status, body } = httpResponse;
		expect(status).to.equal(401);
		expect(body).to.have.key('message');
	});
	it('Retorna um erro 401 se não for enviado um token no Authorization', async function () {
		const httpResponse = await chai.request(app).get('/login/role').send();
		const { status, body } = httpResponse;
		expect(status).to.equal(401);
		expect(body).to.have.key('message');
	});
	it('Retorna um erro 401 se for enviado um token inválido no Authorization', async function () {
		sinon.stub(JWT, 'verify').returns('Token must be a valid token');
		const httpResponse = await chai.request(app).get('/login/role').set('authorization', 'invalidToken').send();
		const { status, body } = httpResponse;
		expect(status).to.equal(401);
		expect(body).to.deep.equal({ message: 'Token must be a valid token' });
	});
	it('Retorna status 200 e o role do usuário para um token válido', async function () {
		sinon.stub(JWT, 'verify').returns('validToken');
		sinon.stub(SequelizeUser, 'findOne').resolves(userFromDB as any);
		const httpResponse = await chai.request(app).get('/login/role')
		.set('authorization', 'validToken')
		.send();
		const { status, body } = httpResponse;
		expect(status).to.equal(200);
		expect(body).to.deep.equal({ role: 'admin' });
	});
});