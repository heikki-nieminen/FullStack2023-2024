import express from 'express'
import bodyParser from 'body-parser'

import cors from 'cors'

import { PORT } from './config'
import { errorHandler } from './utils/middleware'
import { userRouter } from './routes/userRouter'
import { adminRouter } from './routes/adminRouter'

const app = express()
const port = PORT

app.use(bodyParser.json())
app.use(cors())
app.use('/', userRouter)
app.use('/admin/', adminRouter)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
