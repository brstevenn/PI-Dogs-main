const jest = require('jest');
const router = require('../src/app.js')
const request = from 'supertest'

describe('GET /dogs', () => {
	test('should respond with a 200 status code', async () => {
		const response await request(index).get('/dogs').send()
		expect(response.statusCode).toBe(200)
	})
})