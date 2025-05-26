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
export const getEnquiry=async (req,res)=>
    {
        try {
            const enquiry=await Enquiry.find().sort({ createdAt: -1 });
            res.status(200).json(enquiry);
            } catch (err) {
                console.error('Error fetching enquiry:', err.message);
                res.status(500).json({ success: false, message: 'Server Error' });
                }
                }
            