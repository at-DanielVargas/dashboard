import 'reflect-metadata'
import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { ApiRouter } from './routers/index'
import mongoose from 'mongoose'
import passport from 'passport'
import './helpers/passport'

const host = process.env.HOST ?? 'localhost'
const port = process.env.PORT ? Number(process.env.PORT) : 3001

class App {
  private app: Application

  constructor() {
    this.app = express()
    this.config()
    this.setupRouters()
  }

  private config() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(morgan('dev'))
    this.app.use(cors())
    this.app.use(passport.initialize())
  }

  private setupRouters() {
    const apiRouter = new ApiRouter()
    this.app.use('/api/v1', apiRouter.router)
  }

  public start(port: number, host: string): void {
    mongoose
      .connect('mongodb://dev:root@localhost:27017/?retryWrites=true&w=majority', {
        dbName: 'ecommerce'
      })
      .then(() => {
        this.app.listen(port, host, () => {
          console.log(`[ ready ] http://${host}:${port}`)
        })
      })
  }
}

const server = new App()
server.start(port, host)
