import Express from 'express'
import { DeleteEnquiry, getEnquiry, getEnquiryById, getProcessedEnquiry, getUnprocessedEnquiry, postEnquiry, searchEnquiryByName, updateEnquiry } from '../controller/EnquiryController.js'
const EnquiryRouter=Express.Router()

EnquiryRouter.post('/post',postEnquiry)
EnquiryRouter.get('/get',getEnquiry)
EnquiryRouter.get('/get/:id',getEnquiryById)
EnquiryRouter.put('/update/:id',updateEnquiry)
EnquiryRouter.delete('/delete/:id',DeleteEnquiry)
EnquiryRouter.get('/processed',getProcessedEnquiry)
EnquiryRouter.get('/unprocessed',getUnprocessedEnquiry)
EnquiryRouter.get('/search',searchEnquiryByName)
export default EnquiryRouter