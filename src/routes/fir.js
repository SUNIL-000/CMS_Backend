import express from 'express';
import {
  createFir,
  getAllFirs,
  getFirById,
  searchFirs,
  updateFir,
  deleteFir,
} from '../controller/fir.js';

export const firRoutes = express.Router();

firRoutes.post('/fir', createFir);
firRoutes.get('/firs', getAllFirs);
firRoutes.get('/fir/:id', getFirById);
firRoutes.get('/firs/search', searchFirs);
firRoutes.put('/fir/:id', updateFir);
firRoutes.delete('/fir/:id', deleteFir);


