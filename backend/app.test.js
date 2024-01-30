const request = require('supertest');
const app = require('./app'); // Assuming your app is exported from app.js
const Customer = require('./models/Customer'); // Import the Customer model

// Mock the Customer model methods
jest.mock('./models/Customer', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));

describe('POST /customers/signup', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock function calls after each test
  });

  it('should return 201 and register a new user', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'testpassword',
    };

    // Mock Customer.findOne to return null, indicating no existing user
    Customer.findOne.mockResolvedValueOnce(null);

    // Mock Customer.create to return the created user
    const createdUser = { ...userData, id: 1 };
    Customer.create.mockResolvedValueOnce(createdUser);

    const response = await request(app)
      .post('/customers/signup')
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: 'User registered successfully',
      user: createdUser,
    });
  });

  it('should return 400 if email is already in use', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'testpassword',
    };

    // Mock Customer.findOne to return an existing user
    Customer.findOne.mockResolvedValueOnce({ email: userData.email });

    const response = await request(app)
      .post('/customers/signup')
      .send(userData);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Email is already in use' });
  });

  it('should return 500 if an error occurs during registration', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'testpassword',
    };

    // Mock Customer.findOne to throw an error
    Customer.findOne.mockRejectedValueOnce(new Error('Database error'));

    const response = await request(app)
      .post('/customers/signup')
      .send(userData);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Internal server error' });
  });
});
