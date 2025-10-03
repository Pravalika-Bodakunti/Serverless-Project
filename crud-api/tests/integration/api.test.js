const axios = require('axios');

// Integration tests for Task Management API
describe('Task Management API Integration Tests', () => {
  const BASE_URL = process.env.API_BASE_URL || 'https://jf043lb8n8.execute-api.us-east-2.amazonaws.com/prod';
  let createdTaskId;

  test('should create a new task', async () => {
    const taskData = {
      title: 'Integration Test Task',
      description: 'Testing task creation',
      priority: 'MEDIUM',
      category: 'WORK',
      status: 'TODO'
    };

    const response = await axios.post(`${BASE_URL}/tasks`, taskData);
    
    expect(response.status).toBe(201);
    expect(response.data.message).toBe('Task created successfully');
    expect(response.data.task.title).toBe(taskData.title);
    expect(response.data.task.id).toBeDefined();
    
    createdTaskId = response.data.task.id;
  });

  test('should list all tasks', async () => {
    const response = await axios.get(`${BASE_URL}/tasks`);
    
    expect(response.status).toBe(200);
    expect(response.data.tasks).toBeDefined();
    expect(Array.isArray(response.data.tasks)).toBe(true);
    expect(response.data.count).toBeGreaterThanOrEqual(0);
  });

  test('should get a specific task', async () => {
    if (!createdTaskId) {
      // Create a task first if none exists
      const createResponse = await axios.post(`${BASE_URL}/tasks`, {
        title: 'Test Task for Get',
        description: 'Test Description'
      });
      createdTaskId = createResponse.data.task.id;
    }

    const response = await axios.get(`${BASE_URL}/tasks/${createdTaskId}`);
    
    expect(response.status).toBe(200);
    expect(response.data.id).toBe(createdTaskId);
    expect(response.data.title).toBeDefined();
  });

  test('should update a task', async () => {
    if (!createdTaskId) {
      // Create a task first if none exists
      const createResponse = await axios.post(`${BASE_URL}/tasks`, {
        title: 'Test Task for Update',
        description: 'Test Description'
      });
      createdTaskId = createResponse.data.task.id;
    }

    const updateData = {
      title: 'Updated Task Title',
      status: 'IN_PROGRESS',
      priority: 'HIGH'
    };

    const response = await axios.put(`${BASE_URL}/tasks/${createdTaskId}`, updateData);
    
    expect(response.status).toBe(200);
    expect(response.data.message).toBe('Item updated successfully');
    expect(response.data.item.title).toBe(updateData.title);
  });

  test('should delete a task', async () => {
    if (!createdTaskId) {
      // Create a task first if none exists
      const createResponse = await axios.post(`${BASE_URL}/tasks`, {
        title: 'Test Task for Delete',
        description: 'Test Description'
      });
      createdTaskId = createResponse.data.task.id;
    }

    const response = await axios.delete(`${BASE_URL}/tasks/${createdTaskId}`);
    
    expect(response.status).toBe(200);
    expect(response.data.message).toBe('Item deleted successfully');
  });

  test('should return 404 for non-existent task', async () => {
    const nonExistentId = 'non-existent-id';
    
    try {
      await axios.get(`${BASE_URL}/tasks/${nonExistentId}`);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });
});
