import { Service } from 'typedi';

@Service()
export default class MailerService {
    constructor(

    ) { }

    public async SendWelcomeEmail(email: string) {
        /**
         * @TODO Call Amazon SES/Mailchimp/Sendgrid or whatever
         */
    }

}
