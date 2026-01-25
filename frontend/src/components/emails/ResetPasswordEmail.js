export const ResetPasswordEmail = ({ resetLink, name = 'User' }) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Reset Your Venuity Password</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .button { 
          display: inline-block; 
          padding: 12px 24px; 
          background-color: #2563eb; 
          color: white; 
          text-decoration: none; 
          border-radius: 4px; 
          font-weight: bold; 
          margin: 20px 0; 
        }
        .footer { 
          margin-top: 30px; 
          font-size: 12px; 
          color: #666; 
          border-top: 1px solid #eee; 
          padding-top: 20px; 
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://your-venuity-logo-url.png" alt="Venuity Logo" style="max-width: 150px;" />
        </div>
        
        <h1>Reset Your Venuity Password</h1>
        
        <p>Hello ${name},</p>
        
        <p>You recently requested to reset your Venuity password. Click the button below to set a new password.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" class="button">Reset Password</a>
        </div>
        
        <p>This link will expire in 1 hour for security reasons.</p>
        
        <p>If you didn't request this, please ignore this email or contact our support team if you have any questions.</p>
        
        <p>Thanks,<br>The Venuity Team</p>
        
        <div class="footer">
          <p>If you're having trouble with the button above, copy and paste the URL below into your web browser:</p>
          <p>${resetLink}</p>
          <p>© ${new Date().getFullYear()} Venuity. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};