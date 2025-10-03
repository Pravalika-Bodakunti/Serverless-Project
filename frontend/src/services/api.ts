import axios from 'axios';

// API Configuration - Production API URL (Task Management System)
const API_BASE_URL = 'https://jf043lb8n8.execute-api.us-east-2.amazonaws.com/prod';

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
  // Create a new book
  create: async (data: CreateItemRequest): Promise<Item> => {
    const response = await api.post<ApiResponse<Item>>('/items', { name: data.name });
    if (response.data.item) {
      return response.data.item;
    }
    throw new Error(response.data.error || 'Failed to create book');
  },

  // Get all books
  getAll: async (): Promise<{ items: Item[]; count: number }> => {
    const response = await api.get<ApiResponse<Item>>('/items');
    return {
      items: response.data.items || [],
      count: response.data.count || 0,
    };
  },

  // Get a specific book by ID
  getById: async (id: string): Promise<Item> => {
    const response = await api.get<Item>(`/items/${id}`);
    return response.data;
  },

  // Update a book
  update: async (id: string, data: UpdateItemRequest): Promise<Item> => {
    const response = await api.put<ApiResponse<Item>>(`/items/${id}`, { name: data.name });
    if (response.data.item) {
      return response.data.item;
    }
    throw new Error(response.data.error || 'Failed to update book');
  },

  // Delete a book
  delete: async (id: string): Promise<void> => {
    await api.delete(`/items/${id}`);
  },
};

export default api;
