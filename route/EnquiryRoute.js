import Express from 'express'
import { confirmationUpdate, DeleteEnquiry, getEnquiry, getEnquiryById, getProcessedEnquiry, getServicesCounts, getUnprocessedEnquiry, postEnquiry, remarkUpdate, searchEnquiryByName, updateEnquiry } from '../controller/EnquiryController.js'
const EnquiryRouter=Express.Router()

EnquiryRouter.post('/post',postEnquiry)
EnquiryRouter.get('/get',getEnquiry)
EnquiryRouter.get('/get/:id',getEnquiryById)
EnquiryRouter.put('/update/:id',updateEnquiry)
EnquiryRouter.delete('/delete/:id',DeleteEnquiry)
EnquiryRouter.get('/processed',getProcessedEnquiry)
EnquiryRouter.get('/unprocessed',getUnprocessedEnquiry)
EnquiryRouter.get('/search',searchEnquiryByName)
EnquiryRouter.put('/remark/:id',remarkUpdate)
EnquiryRouter.put('/confirmation/:id',confirmationUpdate)
EnquiryRouter.get('/service/count',getServicesCounts)

export default EnquiryRouter