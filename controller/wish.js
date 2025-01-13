// *** wishController.js ***

import { WishModel } from '../model/wish.js';

export class WishController {
  /**
   * Get all wishes
   */
  static async getAll(req, res) {
    try {
      const wishes = await WishModel.getAll();
      res.json(wishes);
    } catch (error) {
      console.error('Error fetching wishes:', error);
      res.status(500).json({ message: 'Error fetching wishes' });
    }
  }

  /**
   * Create a new wish
   */
  static async create(req, res) {
    try {
      const cantidad = await WishModel.cantidadDocumentos();
      const data = { id: cantidad + 1, title: req.body.title };
      const newWish = await WishModel.create({ input: data });
      res.status(201).json(newWish);
    } catch (error) {
      console.error('Error creating wish:', error);
      res.status(500).json({ message: 'Error creating wish' });
    }
  }

  /**
   * Delete a wish by ID
   */
  static async delete(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const result = await WishModel.delete({ id });
      if (!result) {
        return res.status(404).json({ message: 'Wish not found' });
      }
      res.json({ message: 'Wish deleted' });
    } catch (error) {
      console.error('Error deleting wish:', error);
      res.status(500).json({ message: 'Error deleting wish' });
    }
  }

  /**
   * Update a wish by ID
   */
  static async update(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const data = { title: req.body.title };
      const updatedWish = await WishModel.update({ id, input: data });
      if (!updatedWish) {
        return res.status(404).json({ message: 'Wish not found' });
      }
      res.json(updatedWish);
    } catch (error) {
      console.error('Error updating wish:', error);
      res.status(500).json({ message: 'Error updating wish' });
    }
  }
}
