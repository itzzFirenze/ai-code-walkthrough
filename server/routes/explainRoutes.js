import express from 'express'
const router = express.Router()
import { explainCode } from '../controllers/explainController.js'

router.post('/', explainCode)

export default router