//*** wishModel.js ***/
import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = 'mongodb+srv://dbAlina:<infinitaafinidad10>@proyectofinal.t7ec7.mongodb.net/'

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function connect() {
  try {
    await client.connect()
    const database = client.db('WishListDb')
    return database.collection('wishlist')
  } catch (error) {
    console.error('Error connecting to the database')
    console.error(error)
    await client.close()
  }
}

export class WishModel {
  static async getAll() {
    const db = await connect()
    return db.find({}).toArray()
  }

  static async create({ input }) {
    const db = await connect()
    const { insertedId } = await db.insertOne(input)

    return {
      _id: insertedId,
      ...input,
    }
  }

  static async delete({ id }) {
    const db = await connect()
    const intId = parseInt(id, 10)
    const filter = { id: intId }
    const { deletedCount } = await db.deleteOne(filter)
    return deletedCount > 0
  }

  static async update({ id, input }) {
    const db = await connect()
    const intId = parseInt(id, 10)
    const filter = { id: intId }
    const { matchedCount, modifiedCount } = await db.updateOne(filter, { $set: input })

    if (matchedCount === 0) {
      return false // Documento no encontrado
    }

    return {
      _id: intId,
      ...input,
    }
  }

  static async cantidadDocumentos() {
    const db = await connect()
    return db.countDocuments()
  }
}
