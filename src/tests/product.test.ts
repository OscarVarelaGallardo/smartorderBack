import request from 'supertest';
import app from '../server'; // Tu instancia de Express

describe('GET /api/products', () => {
    it('debe responder con un array de productos', async () => {
        const res = await request(app).get('/api/products');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
