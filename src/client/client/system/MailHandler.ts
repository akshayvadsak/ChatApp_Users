import aws from 'aws-sdk';

const ses = new aws.SES({
    accessKeyId: "AKIATSLP3XGQ2HLXDV73",
    secretAccessKey: "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",
    region: "us-east-1",
});

export class MailHandler
{
    public static async sendEmailCredentialsAWS(name: string, userType: string, email: string, password: string): Promise<void> {
        let senderName = "FlirtyBum";
        let senderEmail = "hello@flirtybum.com";

        const params = {
            Source: `${senderName} <${senderEmail}>`,
            Template: "CredentialsSent",
            Destination: {
                ToAddresses: [email],
            },
            TemplateData: `{ "sitename": "FlirtyBum", "name": "${name}", "usertype": "${userType}", "email": "${email}", "password": "${password}"}`,
        };
        
        let success = false;
        await ses.sendTemplatedEmail(params).promise().then(() => {
            success = true
        });

        if (success)
            return Promise.resolve();
        else
            return Promise.reject();
    }

    public static async SendPasswordChangeNotifAWS(name: string, email: string): Promise<void>
    {
        let senderName = "FlirtyBum";
        let senderEmail = "hello@flirtybum.com";

        const params = {
            Source: `${senderName} <${senderEmail}>`,
            Template: "PasswordChangeNotif",
            Destination: {
                ToAddresses: [email],
            },
            TemplateData: `{ "name": "${name}" }`,
        };

        let success = false;
        await ses.sendTemplatedEmail(params).promise().then(() => {
            success = true
        });

        if (success)
            return Promise.resolve();
        else
            return Promise.reject();
    }

    public static async SendAccountDeletionNotifAWS(name: string, email: string): Promise<void> {
        let senderName = "FlirtyBum";
        let senderEmail = "hello@flirtybum.com";

        const params = {
            Source: `${senderName} <${senderEmail}>`,
            Template: "AccountDeletionNotif",
            Destination: {
                ToAddresses: [email],
            },
            TemplateData: `{ "name": "${name}" }`,
        };

        let success = false;
        await ses.sendTemplatedEmail(params).promise().then(() => {
            success = true
        });

        if (success)
            return Promise.resolve();
        else
            return Promise.reject();
    }
}