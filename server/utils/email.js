const sgMail = require("@sendgrid/mail");
const nodeMailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Archiv <${process.env.EMAIL_FROM}>`;
  }

  // newTransport() {
  //   if (process.env.NODE_ENV === "production") {
  //     // SENDGRID
  //     // return nodeMailer.createTransport({
  //     //   host: "smtp.sendgrid.net",
  //     //   port: 587,
  //     //   secure: false,
  //     //   auth: {
  //     //     user: process.env.SENDGRID_USERNAME,
  //     //     pass: process.env.SENDGRID_PASSWORD,
  //     //   },
  //     // });

  //     const transport = nodeMailer.createTransport({
  //       host: "smtp.sendgrid.net",
  //       port: 587,
  //       secure: false,
  //       auth: {
  //         user: process.env.SENDGRID_USERNAME,
  //         pass: process.env.SENDGRID_PASSWORD,
  //       },
  //       connectionTimeout: 10000,
  //       greetingTimeout: 10000,
  //       socketTimeout: 10000,
  //     });

  //     return transport;
  //   }

  //   // return nodeMailer.createTransport({
  //   //   host: process.env.EMAIL_HOST,
  //   //   port: process.env.EMAIL_PORT,
  //   //   auth: {
  //   //     user: process.env.EMAIL_USERNAME,
  //   //     pass: process.env.EMAIL_PASSWORD,
  //   //   },
  //   // });
  //   // SENDGRID

  //   return nodeMailer.createTransport({
  //     service: "SendGrid",
  //     auth: {
  //       user: process.env.SENDGRID_USERNAME,
  //       pass: process.env.SENDGRID_PASSWORD,
  //     },
  //   });
  // }

  async send(template, subject) {
    // 1. Render HTML based on a Pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    // 2. Define email options
    const mailOptions = {
      from: this.from,
      replyTo: process.env.EMAIL_FROM,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html),
    };

    // 3. Send through SendGrid Web API
    await sgMail.send(mailOptions);
  }
  async sendWelcome() {
    await this.send("welcome", "Welcome to the Archiv family");
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token (Valid for only 10 minutes)",
    );
  }

  async sendEmailVerification() {
    await this.send("verification", "Verify your Archiv account");
  }
}

module.exports = Email;
