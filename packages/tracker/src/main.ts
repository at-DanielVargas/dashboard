import { MongoClient, Db } from 'mongodb'
import axios from 'axios'
import cron from 'node-cron'

async function updateDocuments() {
  const uri = 'mongodb://dev:root@localhost:27017'
  const databaseName = 'ecommerce'
  const client = new MongoClient(uri)

  try {
    await client.connect()
    const db: Db = client.db(databaseName)
    const collection = db.collection('tracking')

    const batchSize = 100
    const totalDocuments = await collection.countDocuments()
    let processedDocuments = 0

    while (processedDocuments < totalDocuments) {
      const documentsToUpdate = await collection.find().limit(batchSize).toArray()

      for (const document of documentsToUpdate) {
        const pakkeResponse = await axios.get(
          `https://seller.pakke.mx/api/v1/Shipments/tracking?trackingNumber=${document.TrackingNumber}`
        )

        const updatedDocument = {
          ...pakkeResponse.data[0],
          TrackingNumber: document.TrackingNumber
        }

        await collection.updateOne({ _id: document._id }, { $set: updatedDocument })

        processedDocuments++
        console.log(`Actualizado el documento ${processedDocuments} de ${totalDocuments}.`)
        // await delay(1000);
      }
    }

    console.log('Actualización completada.')
  } catch (err) {
    console.error('Error al actualizar los documentos:', err)
  } finally {
    client.close()
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// cron.schedule('*/15 * * * *', () => {
updateDocuments()
// }).start()

// // Inicia el cron job
// cron.start();
