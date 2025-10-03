const { handler } = require('../../functions/create');

// Mock AWS SDK
const mockDynamoDB = {
  send: jest.fn()
};

jest.mock('@aws-sdk/client-dynamodb', () => ({
  DynamoDBClient: jest.fn(() => mockDynamoDB)
}));

jest.mock('@aws-sdk/lib-dynamodb', () => ({
  DynamoDBDocumentClient: {
    from: jest.fn(() => mockDynamoDB)
  },
  PutCommand: jest.fn()
}));

describe('Create Task Lambda Function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.TASKS_TABLE = 'test-tasks-table';
  });

  test('should create a task successfully', async () => {
    const event = {
      body: JSON.stringify({
        title: 'Test Task',
        description: 'Test Description',
        priority: 'HIGH',
        category: 'WORK'
      })
    };

    mockDynamoDB.send.mockResolvedValue({});

    const result = await handler(event);

    expect(result.statusCode).toBe(201);
    expect(JSON.parse(result.body).message).toBe('Task created successfully');
    expect(JSON.parse(result.body).task.title).toBe('Test Task');
  });

  test('should return 400 for missing title', async () => {
    const event = {
      body: JSON.stringify({
        description: 'Test Description'
      })
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body).error).toBe('Name is required');
  });

  test('should return 400 for empty body', async () => {
    const event = {};

    const result = await handler(event);

    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body).error).toBe('Request body is required');
  });

  test('should handle DynamoDB errors', async () => {
    const event = {
      body: JSON.stringify({
        title: 'Test Task'
      })
    };

    mockDynamoDB.send.mockRejectedValue(new Error('DynamoDB Error'));

    const result = await handler(event);

    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body).error).toBe('Could not create task');
  });
});
