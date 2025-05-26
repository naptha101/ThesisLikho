import mongoose from "mongoose";
const EnquiryModel=new mongoose.Schema({
    fullName: String,
  countryCode: String,
  phoneNumber: String,
  email: String,
  subject: String,
  state: String,
  researchField: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
    
     
    
})
export const Enquiry=mongoose.model('Enquiry',EnquiryModel);
