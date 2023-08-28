export const userFromDB = {
	id: 1,
	username: 'Admin',
	role: 'admin',
	email: 'admin@admin.com',
	password: 'senha_criptografada'
}

export const validLoginBody = {
	email: 'admin@admin.com',
	password: 'senha_nao_criptografada'
}

export const invalidEmailLoginBody = { email: 'errado@.com', password: '123456' }

export const invalidPasswordLoginBody = { email: 'admin@admin.com', password: 'senha_errada' }