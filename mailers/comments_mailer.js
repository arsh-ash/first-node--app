const transporter=require("../config/nodemailer");

// this is another way of exporting a method
exports.newComment = (comment) => {
    console.log('inside newComment mailer', comment);
        transporter.sendMail({
       from: 'no-reply@gmail.com',
       to: comment.user.email,
       subject: "New Comment Published!",
       html: `<h1>hiii your comment is now published! </h1> `
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent booom', info);
        return;
    });
}


