import { MongoClient, ServerApiVersion } from 'mongodb'

const uri =  'mongodb://localhost:27017/'


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
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

export class WishModel{
    static async getAll () {
        const db = await connect()  
        return db.find({}).toArray()
    }
    static async create ({ input }) {
        const db = await connect()    
        const { insertedId } = await db.insertOne(input)

        return {
            _id: insertedId,
            ...input
        }
    }

    static async delete ({ id }) {
        const db = await connect()
        const intId = parseInt(id, 10)
        const filter = { id: intId }
        const { deletedCount } = await db.deleteOne(filter)
        return deletedCount > 0
    }

    static async update ({ id, input }) {
        const db = await connect()
        const intId = parseInt(id, 10)
        const filter = { id: intId }
        const { deletedCount } = await db.updateOne(filter, input )
        return {
            ...input
        }
    }

    static async cantidadDocumentos(){
        const db = await connect();
        return db.countDocuments()
    }
}