import express from 'express';
import mysql from 'mysql2/promise';
import mongoose, { Schema } from 'mongoose'
import { v4 } from 'uuid';

const app = express();

const port = 3000;

// const client = mysql.createPool({
//   host: 'localhost',
//   port: 3307,
//   user: 'root',
//   password: '1234'
// })

// const response = await client.query('select 1+1')
// console.log(response);

const mongoConnection = await mongoose.connect('mongodb://mymongo:27017/holamongo')
console.log(mongoConnection.connection.db.databaseName);


const productSchema = new Schema({
  name: String
})

const ProductModel = mongoose.model('Product', productSchema)

app.get('/', (req, res) => {

  const product = await ProductModel.create({name: 'Laptop'})

  res.json({
    id: v4(),
    product
  })
})

app.listen(port);
console.log('server on port ' + port);
