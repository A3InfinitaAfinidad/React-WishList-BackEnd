// *** wishRoutes.js ***

import { Router } from 'express'
import { WishController } from '../controller/wish.js' // Asegúrate de que la ruta sea correcta

const router = Router()

// GET all wishes
router.get('/', async (req, res, next) => {
  try {
    await WishController.getAll(req, res)
  } catch (error) {
    next(error) // Pasa el error al middleware de manejo de errores
  }
})

// POST a new wish
router.post('/', async (req, res, next) => {
  try {
    await WishController.create(req, res)
  } catch (error) {
    next(error)
  }
})

// DELETE a wish by ID
router.delete('/:id', async (req, res, next) => {
  try {
    await WishController.delete(req, res)
  } catch (error) {
    next(error)
  }
})

// PUT (update) a wish by ID
router.put('/:id', async (req, res, next) => {
  try {
    await WishController.update(req, res)
  } catch (error) {
    next(error)
  }
})

export default router
