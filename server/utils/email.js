const sgMail = require("@sendgrid/mail");
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
    try {
      await sgMail.send(mailOptions);
    } catch (err) {
      console.error("SendGrid error:", {
        message: err.message,
        code: err.code,
        response: err.response?.body,
      });

      throw err;
    }
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
