import { Enquiry } from "../models/Enquiry.js";

export const postEnquiry=async (req,res)=>{
 try {
    const {
      FullName,
      CountryCode,
      PhoneNumber,
      Email,
      Subject,
      State,
      ResearchField,
      Message,
    } = req.body;
console.log({
      FullName,
      CountryCode,
      PhoneNumber,
      Email,
      Subject,
      State,
      ResearchField,
      Message,
    } )
    const enquiry = new Enquiry({
      fullName: FullName,
      countryCode: CountryCode,
      phoneNumber: PhoneNumber,
      email: Email,
      subject: Subject,
      state: State,
      researchField: ResearchField,
      message: Message,

    });

    await enquiry.save();

    // Redirect after success (for WordPress form _next param)
    res.redirect(302, 'https://thesislikho.com/form-success');
  } catch (err) {
    console.error('❌ Error saving form:', err.message);
    res.status(500).send('Server Error');
  }
}
export const getEnquiry = async (req, res) => {
  try {
    const total=await Enquiry.countDocuments()
   const page=req.query.p||1;
   const limit=req.query.limit||10;
   const skip=(page-1)*limit;
   const processed=await Enquiry.find({
    processed:true
   }).countDocuments();
   const unprocessed=total-processed;
   const enquiry=await Enquiry.find().sort({
    createdAt: -1
   }).skip(skip).limit(limit)


    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      processed:processed,
      unprocessed:unprocessed,
      data: enquiry,
    });
  } catch (err) {
    console.error('Error fetching enquiry:', err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
export const getEnquiryById=async(req,res)=>{
    try {
        const enquiry=await Enquiry.findById(req.params.id)
        if(!enquiry){
            return res.status(404).json({success:false,message:'Enquiry not found'})
            }
            res.status(200).json(enquiry)
            } catch (err) {
                console.error('Error fetching enquiry by id:', err.message);
            }
}
export const updateEnquiry=async(req,res)=>
    {
        try {
          const {id}=req.params;
          const dat=await Enquiry.findById(id);
          const enquiry=await Enquiry.findByIdAndUpdate(id,{
            processed:!dat.processed
          },{new:true})
          if(!enquiry){
            return res.status(404).json({success:false,message:'Enquiry not found'})
            }
            res.status(200).json(enquiry)
          

        }
    catch(err){
        console.error('Error updating enquiry:', err.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}
export const DeleteEnquiry=async(req,res)=>{
    try {
        const {id}=req.params;
        const enquiry=await Enquiry.findByIdAndDelete(id)
        console.log(enquiry)
        if(!enquiry){
            return res.status(404).json({success:false,message:'Enquiry not found'})
            }
            res.status(200).json(enquiry)
    }
    catch(err){
        console.error('Error deleting enquiry:', err.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}
export const getProcessedEnquiry=async(req,res)=>{
    try {
    const total=await Enquiry.find({processed:true}).countDocuments()
   const page=req.query.p||1;
   const limit=req.query.limit||10;
   const skip=(page-1)*limit;



   
    const enquiry=await Enquiry.find({processed:true}).sort({
    createdAt: -1
   }).skip(skip).limit(limit)
    if(!enquiry){
        return res.status(404).json({success:false,message:'Enquiry not found'})
        }
 res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      data: enquiry,
    });    
    }
        catch(err){
            console.error('Error fetching enquiry by status:', err.message);
            res.status(500).json({ success: false, message: 'Server Error' });
            }
}
export const getUnprocessedEnquiry=async(req,res)=>{
        try {
    const total=await Enquiry.find({processed:false}).countDocuments()
   const page=req.query.p||1;
   const limit=req.query.limit||10;
   const skip=(page-1)*limit;

    const enquiry=await Enquiry.find({processed:false}).sort({
    createdAt: -1
   }).skip(skip).limit(limit)

    if(!enquiry){
        return res.status(404).json({success:false,message:'Enquiry not found'})
        }
 res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      data: enquiry,
    });    
    }
        catch(err){
            console.error('Error fetching enquiry by status:', err.message);
            res.status(500).json({ success: false, message: 'Server Error' });
            }
}
export const searchEnquiryByName=async(req,res)=>{
  try{
    const name=req.query.name||'';
        const regex = new RegExp('^' + name, 'i');
    const data=await Enquiry.find({fullName:{$regex:regex}})

    return res.status(200).json({
      success: true,
      data: data
  
    })

  }
  catch(err){
    console.error('Error fetching enquiry by name:', err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
}
export const remarkUpdate=async(req,res)=>{
  try{
    const id=req.params.id;
    const {comment,status,callBackDate,contacted}=req.body;
    const enquiry=await Enquiry.findById(id);
    if(!enquiry){
      return res.status(404).json({success:false,message:'Enquiry not found'})
      }


      enquiry.status=status||"pending";
      enquiry.comment=comment||"no comment";
      enquiry.callBackDate=callBackDate||false;
      enquiry.contacted.whatsapp=contacted.whatsapp||false;
      enquiry.contacted.email=contacted.email||false;
      enquiry.contacted.phone=contacted.phone||false;
      await enquiry.save();
      return res.status(200).json({
        success: true,
        message: 'Enquiry updated successfully',
        });

    }
    catch(err){
      console.error('Error updating enquiry remark:', err.message);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
}
export const confirmationUpdate=async(req,res)=>{
  try{
    const id=req.params.id;
    const {done,deadline,totalAmount,priceQuoted,paidAmount,remainingAmount,transactionId,transactionType}=req.body;
    const enquiry=await Enquiry.findById(id);
    if(!enquiry){
      return res.status(404).json({success:false,message:'Enquiry not found'})
      }
    
      enquiry.confirmation.done=done;
      enquiry.confirmation.payment.deadline=deadline;
      enquiry.confirmation.payment.amount=totalAmount||0;
      enquiry.confirmation.payment.priceQuoted=priceQuoted||0;
      enquiry.confirmation.payment.payedAmount=paidAmount||0;
      enquiry.confirmation.payment.remainingAmount=remainingAmount||0;
      enquiry.confirmation.payment.transactionId=transactionId||""
      enquiry.confirmation.payment.transactionType=transactionType||""

      await enquiry.save();
return res.status(200).json({
  success: true,
  message: 'Enquiry updated successfully',
  });

}
catch(err) {
  console.error('Error updating enquiry confirmation:', err.message);
  res.status(500).json({ success: false, message: 'Server Error' });
}
}
export const getServicesCounts = async (req, res) => {
  try {
    const serviceLabels = [
      "Thesis Writing",
      "Proofreading & Formatting",
      "Research Article Writing",
      "Plagiarism Checker",
      "Literature Review & Thesis Analysis",
      "Methodology Assist",
      "PhD Data Analysis",
      "Dissertation Assistance"
    ];

    const counts =[];

    for (const service of serviceLabels) {
      const count = await Enquiry.countDocuments({ researchField: service });
      counts.push({
        label: service,
        count: count
      })
      //counts[serice] = count;
    }

    return res.status(200).json({
      success: true,
      counts,
    });

  } catch (error) {
    console.error("Error getting service counts:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

