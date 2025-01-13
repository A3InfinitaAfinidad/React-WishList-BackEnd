import { WishModel } from "../model/wish.js";
export class WishController{
    

    static async getAll (req, res) {
        const wish = await WishModel.getAll()
        res.json(wish)
    }
    static async create (req, res) {
        const cantidad = await WishModel.cantidadDocumentos()
        const data = {'id':cantidad+1, 'title':req.body.title}
        const newWish = await WishModel.create({ input: data })
        res.status(201).json(newWish)
    }

    static async delete (req, res) {
        const id  = parseInt(req.params.id)
        const result = await WishModel.delete({ id })
        if (result === false) {
            return res.status(404).json({ message: 'Wish not found' })
        }
        return res.json({ message: 'Wish deleted' })
    }
}