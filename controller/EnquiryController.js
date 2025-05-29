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
   const enquiry=await Enquiry.find().sort({
    createdAt: -1
   }).skip(skip).limit(limit)


    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
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
          const enquiry=await Enquiry.findByIdAndUpdate(id,{
            processed:true
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
