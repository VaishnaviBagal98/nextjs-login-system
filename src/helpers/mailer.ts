import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs' 


export const sendEmail = async({email ,emailType, userId}
  :any) => 
{
    try {
      const hashedToken = await bcryptjs.hash(userId.toString(), 10)
      console.log("verifying")
       if(emailType === "VERIFY"){
        const updatedUser = await User.findByIdAndUpdate
        (userId, {
          $set: {
          verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000}
       });

       console.log("Updated user for VERIFY", updatedUser)

       } else if(emailType === "REST"){
          await User.findByIdAndUpdate(userId,{
            $set: {
              forgotPasswordToken: hashedToken, 
          forgotPasswordTokenExpiry: new Date(Date.now() + 3600000)
          }
        });

}

       
        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
                user: "9ab92f415d50f6", //remove
                pass: "f5ada91a2b2b1a"  //remove
              }
        });

          const mailOptions = {
            from: 'vaishnavibagal1998@gmail.com',
            to: email, 
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password", 
            html: `<p>Click <a href="${process.env.DOMAIN}/
            verifymail?token=${hashedToken}">here</a> to $
            {emailType === "VERIFY" ? "Verify your email" :
              "reset your password"}
            or copy and paste the link below in your browser.
            <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`,
          }

          const  mailResponse = await transport.sendMail(mailOptions)
          return mailResponse
        
        
    } catch (error:any) {
        throw new Error(error.message)
    }
}   