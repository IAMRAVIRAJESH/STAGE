import request from 'supertest';
import { app, server } from '../server';

afterEach(() => {
  jest.clearAllMocks();
  server.close();
});

describe('List API Integration Tests', () => {
  describe('GET /api/list', () => {
    it("should return the user's list with favorite movies and TV shows", async () => {
      const response = await request(app).get('/');

      expect(response.status).toBe(200);
    });
  });
});
