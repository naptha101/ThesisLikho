import Express from 'express'
import { getEnquiry, postEnquiry } from '../controller/EnquiryController.js'
const EnquiryRouter=Express.Router()

EnquiryRouter.post('/post',postEnquiry)
EnquiryRouter.get('/get',getEnquiry)
export default EnquiryRouter