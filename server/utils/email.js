const { BrevoClient } = require("@getbrevo/brevo");
const pug = require("pug");
const htmlToText = require("html-to-text");

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Archiv <${process.env.EMAIL_FROM}>`;
  }

  async send(template, subject) {
    // 1. Render HTML from Pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    // 2. Define Brevo email
    const emailData = {
      sender: {
        name: "Archiv",
        email: process.env.EMAIL_FROM,
      },
      to: [
        {
          email: this.to,
          name: this.firstName,
        },
      ],
      subject,
      htmlContent: html,
      textContent: htmlToText.convert(html),
    };

    // 3. Send through Brevo Web API
    try {
      const response =
        await brevo.transactionalEmails.sendTransacEmail(emailData);

      console.log("Brevo email sent:", response);
    } catch (err) {
      console.error("Brevo error:", {
        message: err.message,
        statusCode: err.statusCode,
        response: err.response,
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
