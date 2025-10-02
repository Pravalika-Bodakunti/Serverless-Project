import axios from 'axios';

// API Configuration - Update this URL after deployment
const API_BASE_URL = 'https://zg6y5ynqd0.execute-api.us-east-2.amazonaws.com/dev';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
export interface Item {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateItemRequest {
  name: string;
  id?: string;
}

export interface UpdateItemRequest {
  name: string;
}

export interface ApiResponse<T> {
  message?: string;
  item?: T;
  items?: T[];
  count?: number;
  error?: string;
}

// API Functions
export const itemsApi = {
  // Create a new item
  create: async (data: CreateItemRequest): Promise<Item> => {
    const response = await api.post<ApiResponse<Item>>('/items', data);
    if (response.data.item) {
      return response.data.item;
    }
    throw new Error(response.data.error || 'Failed to create item');
  },

  // Get all items
  getAll: async (): Promise<{ items: Item[]; count: number }> => {
    const response = await api.get<ApiResponse<Item>>('/items');
    return {
      items: response.data.items || [],
      count: response.data.count || 0,
    };
  },

  // Get a specific item by ID
  getById: async (id: string): Promise<Item> => {
    const response = await api.get<Item>(`/items/${id}`);
    return response.data;
  },

  // Update an item
  update: async (id: string, data: UpdateItemRequest): Promise<Item> => {
    const response = await api.put<ApiResponse<Item>>(`/items/${id}`, data);
    if (response.data.item) {
      return response.data.item;
    }
    throw new Error(response.data.error || 'Failed to update item');
  },

  // Delete an item
  delete: async (id: string): Promise<void> => {
    await api.delete(`/items/${id}`);
  },
};

export default api;
