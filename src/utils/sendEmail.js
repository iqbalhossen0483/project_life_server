const nodemailer = require("nodemailer");
const config = require("../config/config");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: config.emailHost,
    port: config.emailPort,
    secure: config.env === "production",
    auth: {
      user: config.smptUser,
      pass: config.smptPass,
    },
  });

  const mailOptions = {
    from: `Dropshopping <${config.smptUser}>`,
    to: options.email,
    subject: options.subject,
    html: genarateHtml(options.name, options.otp, options.type),
  };

  const result = await transporter.sendMail(mailOptions);

  if (!result.messageId) {
    throw { message: "Email not sent", status: 500 };
  }
};

const genarateHtml = (name, otp, type) => {
  return `<html>
  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #f6f9fc;
      font-family: sans-serif;
    "
  >
    <table
      cellpadding="0"
      cellspacing="0"
      style="width: 100%; max-width: 600px; margin: 0 auto; padding: 45px 20px"
    >
      <tr>
        <td
          style="
            background-color: #ffffff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          "
        >
          <table cellpadding="0" cellspacing="0" style="width: 100%">
            <!-- Logo -->
            <tr>
              <td style="padding-bottom: 32px">
                <div style="display: flex; justify-content: center">
                  <img
                    src="https://iqbalhossen-c5422.web.app/skills/tailwind.webp"
                    alt="Stripe"
                    style="width: 150px"
                  />
                </div>
              </td>
            </tr>

            <!-- Main Content -->
            <tr>
              <td style="padding-bottom: 24px">
                <h3>${
                  type === "reset" ? "Forgot Password" : "Email Varification"
                }</h3>
                <p>Hi, ${name}</p>
                <p
                  style="
                    margin: 0;
                    font-size: 16px;
                    line-height: 24px;
                    color: #525f7f;
                  "
                >
                  Your ${
                    type === "verify"
                      ? "email verification code"
                      : "reset password"
                  } is <strong>${otp}</strong>.
                </p>
              </td>
            </tr>

            

            <!-- Help Text -->
            <tr>
              <td style="padding-bottom: 32px">
                <p
                  style="
                    margin: 0;
                    font-size: 14px;
                    line-height: 20px;
                    color: #525f7f;
                  "
                >
                  If you did not request this, please ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="border-top: 1px solid #e6ebf1; padding-top: 24px">
                <p
                  style="
                    margin: 0 0 8px;
                    font-size: 12px;
                    line-height: 16px;
                    color: #8898aa;
                  "
                >
                  Best regards, <br />
                  GariBD Team
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

module.exports = sendEmail;
