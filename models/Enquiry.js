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
  status:{
type:String,
default:"pending"
  },
  callBackDate:{
    type:Date,
    default:Date.now
  },
comment:{
  type:String,
  default:""
},
contacted:{
  whatsapp:{
    type:Boolean,
    default:false},
  email:{
    type:Boolean,
    default:false},
  phone:{
    type:Boolean,
    default:false
  }
},
confirmation:{
  done:{
    type:Boolean,
    default:false
  },
  payment:{
    deadline:{
      type:Date,
      default:Date.now
    },
    amount:{
      type:Number,
      default:0
    },
    priceQuoted:{
      type:Number,
      default:0,
    },
    payedAmount:{
      type:Number,
      default:0
    },
    remainingAmount:{
      type:Number,
      default:0
    },
    transactionType:{
      type:String,
      default:""
    },
    transactionId:{
      type:String,
      default:""
    }
  }
},


  createdAt: {
    type: Date,
    default: Date.now,
  },
    
     
    
})
export const Enquiry=mongoose.model('Enquiry',EnquiryModel);
