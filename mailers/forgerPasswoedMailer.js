const transporter=require("../config/nodemailer");

exports.passwordLink = (user) => {
    let add="localhost:9000/users/changepassword"
    console.log('inside forgetpassword mailer',user );
        transporter.sendMail({
       from: 'no-reply@gmail.com',
       to: user.email,
       subject: "forget password!",
       html: `
       <p>You requested for password reset!! </p>
       <h5>click here to reset ypur password <a href="http://localhost:9000/users/changepassword/${user.resetToken}">click</a> </h5>
       `
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent booom', info);
        return;
    });
}