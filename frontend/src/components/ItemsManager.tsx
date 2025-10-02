import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Chip,
  IconButton,
  Alert,
  Snackbar,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { itemsApi, Item } from '../services/api';

// Helper function to format dates
const formatDate = (dateString: string, isMobile: boolean = false): string => {
  try {
    if (!dateString || dateString === '') return 'N/A';
    
    // Handle the ISO date string from your API
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', dateString);
      return 'Invalid Date';
    }
    
    return date.toLocaleDateString('en-US', {
      year: '2-digit',
      month: 'short',
      day: 'numeric',
      ...(isMobile ? {} : { hour: '2-digit', minute: '2-digit' }),
    });
  } catch (error) {
    console.error('Date formatting error:', error, 'for date:', dateString);
    return 'Invalid Date';
  }
};

interface ItemsManagerProps {}

const ItemsManager: React.FC<ItemsManagerProps> = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // State management
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [itemName, setItemName] = useState('');
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // Load items on component mount
  useEffect(() => {
    loadItems();
  }, []);

  // API Functions
  const loadItems = async () => {
    setLoading(true);
    try {
      const response = await itemsApi.getAll();
      setItems(response.items);
      showSnackbar(`Loaded ${response.count} items`, 'success');
    } catch (error) {
      console.error('Error loading items:', error);
      showSnackbar('Failed to load items', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateItem = async () => {
    if (!itemName.trim()) {
      showSnackbar('Item name is required', 'error');
      return;
    }

    setLoading(true);
    try {
      const newItem = await itemsApi.create({ name: itemName.trim() });
      setItems(prev => [...prev, newItem]);
      setDialogOpen(false);
      setItemName('');
      showSnackbar('Item created successfully', 'success');
    } catch (error) {
      console.error('Error creating item:', error);
      showSnackbar('Failed to create item', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateItem = async () => {
    if (!editingItem || !itemName.trim()) {
      showSnackbar('Item name is required', 'error');
      return;
    }

    setLoading(true);
    try {
      const updatedItem = await itemsApi.update(editingItem.id, { name: itemName.trim() });
      setItems(prev => prev.map(item => 
        item.id === editingItem.id ? updatedItem : item
      ));
      setDialogOpen(false);
      setEditingItem(null);
      setItemName('');
      showSnackbar('Item updated successfully', 'success');
    } catch (error) {
      console.error('Error updating item:', error);
      showSnackbar('Failed to update item', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    setLoading(true);
    try {
      await itemsApi.delete(id);
      setItems(prev => prev.filter(item => item.id !== id));
      showSnackbar('Item deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting item:', error);
      showSnackbar('Failed to delete item', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const openCreateDialog = () => {
    setEditingItem(null);
    setItemName('');
    setDialogOpen(true);
  };

  const openEditDialog = (item: Item) => {
    setEditingItem(item);
    setItemName(item.name);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingItem(null);
    setItemName('');
  };

  // DataGrid columns configuration
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'createdAt',
      headerName: 'Created',
      width: isMobile ? 120 : 180,
      valueFormatter: (params: any) => {
        return formatDate(params.value, isMobile);
      },
    },
    {
      field: 'updatedAt',
      headerName: 'Updated',
      width: isMobile ? 120 : 180,
      valueFormatter: (params: any) => {
        return formatDate(params.value, isMobile);
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => openEditDialog(params.row)}
          color="primary"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon color="error" />}
          label="Delete"
          onClick={() => handleDeleteItem(params.row.id)}
        />,
      ],
    },
  ];

  return (
    <Box>
      {/* Header with Actions */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'stretch', sm: 'center' },
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h6" component="h2" gutterBottom>
                Items Overview
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                  label={`Total: ${items.length}`}
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  label={loading ? 'Loading...' : 'Ready'}
                  color={loading ? 'warning' : 'success'}
                  variant="outlined"
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={loadItems}
                disabled={loading}
                size={isMobile ? 'small' : 'medium'}
              >
                Refresh
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={openCreateDialog}
                disabled={loading}
                size={isMobile ? 'small' : 'medium'}
              >
                Add Item
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Data Grid */}
      <Card>
        <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
          <Box sx={{ height: { xs: 400, sm: 500, md: 600 }, width: '100%' }}>
            <DataGrid
              rows={items}
              columns={columns}
              loading={loading}
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: isMobile ? 5 : 10 },
                },
              }}
              disableRowSelectionOnClick
              sx={{
                border: 'none',
                '& .MuiDataGrid-cell': {
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                },
                '& .MuiDataGrid-columnHeader': {
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  fontWeight: 600,
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>
          {editingItem ? 'Edit Item' : 'Create New Item'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Item Name"
            fullWidth
            variant="outlined"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                editingItem ? handleUpdateItem() : handleCreateItem();
              }
            }}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={editingItem ? handleUpdateItem : handleCreateItem}
            variant="contained"
            disabled={loading || !itemName.trim()}
            startIcon={loading ? <CircularProgress size={16} /> : null}
          >
            {editingItem ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ItemsManager;
