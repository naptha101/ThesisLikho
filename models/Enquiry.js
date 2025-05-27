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
  processed:{
    type:Boolean,
    default:false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
    
     
    
})
export const Enquiry=mongoose.model('Enquiry',EnquiryModel);
