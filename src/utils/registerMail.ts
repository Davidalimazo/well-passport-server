import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';

interface Props {
  reciever: string;
  role: string;
  from: string;
  name: string;
  url: { code: string; base: string };
}

export class MailNotification {
  constructor(private configService: ConfigService) {}

  async sendVerificationRequest(
    reciever: string,
    passwordToken: string,
    role: string,
    name: string,
  ) {
    const { href } = new URL('login', 'http://localhost:3000');

    const transport = createTransport({
      host: this.configService.get('emailHost'),
      port: this.configService.get('emailPort'),
      secure: this.configService.get('emailSecure'),
      auth: {
        user: this.configService.get('emailServer'),
        pass: this.configService.get('emailPassword'),
      },
    });
    const result = await transport.sendMail({
      to: reciever,
      from: this.configService.get('mailFrom'),
      subject: `Zamam | New Account`,
      text: 'Your account has being created',
      html: this.html(href, passwordToken, reciever, role, name),
    });
    const failed = result.rejected.concat(result.pending).filter(Boolean);
    if (failed.length) {
      throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`);
    }
    return true;
  }

  html(url: string, token: string, email: string, role: string, name: string) {
    //  const escapedHost = host.replace(/\./g, "&#8203;.");

    return `
        <body>
        <table width="100%" class="" border="0" cellspacing="20" cellpadding="0"
       style="max-width: 600px; margin: auto; border-radius: 10px; font-family: 'Urbanist', sans-serif;">
       <tr>
         <td align="center"
           style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; height: 80px; background-color: #FAFAFA;">
           <strong style="color: #D72617;">Zamam | Well-Passport</strong>
         </td>
       </tr>
       <tr>
         <td align="center"
           style="padding:0px; font-size: 14px; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600;">
           Welcome to Well-Passport🎉
         </td>
       </tr>
       <tr style="margin-top: 15px;">
         <td style="padding:0; font-family: 'Nunito', sans-serif; font-size: 14px; font-weight: bold;">
           Hi ${name}, 
         </td>
       </tr>
       <tr>
         <td
           style="font-family: 'Nunito', sans-serif; font-size: 12px;">
           <p>Your email is <strong><em>${email}</em></strong></p>
           <p>Your password is <strong><em>${token}</em></strong></p>
           <p>Your role is <strong><em>${role}</em></strong></p>
           <br/>
           <p>You can change your system generated password whenever you want after successfully loggin into the application</p>
         </td>
       </tr>
       <tr>
         <td
           style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; color: #06C149; text-decoration: underline;">  
           <a href="${url}" style="text-decoration: none; color: inherit;">Login with your email and password here</a>
         </td>
       </tr>
       <tr>
           <td
             style="font-family: 'Nunito', sans-serif; font-size: 12px;">
             Alternatively, If you are having trouble with this link, try copying and pasting this URL in your  web browser.
           </td>
         </tr>
         <tr>
           <td
             style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; text-decoration: underline;">  
            ${url}
           </td>
         </tr>
         <tr>
           <td
             style="font-family: 'Nunito', sans-serif; font-size: 12px;">
             <p class="padding-bottom:10px;">Cheers,</p> 
             <p>Zamam Well-Passport Team</p> 
           </td>
         </tr>
      </table>
      </body>
      `;
  }
}
