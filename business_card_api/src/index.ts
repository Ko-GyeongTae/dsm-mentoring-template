import express from 'express'
import cors from 'cors'
import { cardPath, cardRouter } from './card/router'

const app = express()

app.use(express.json())
app.use(cors({
  origin: '*'
}))

app.use(cardPath, cardRouter)


const port = Number(process.env.PORT)

app.listen(port, () => {
  console.log(`🚀 Server is running on port: ${port} 🚀`)
})
