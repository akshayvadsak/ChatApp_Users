import { collection, addDoc, arrayUnion } from "@firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { User } from "../user/User";
import { Analytics, AnalyticsId } from "./Analytics";

export class Mail
{
    public static async SendCredentialsSentEmail(password: string): Promise<void>
    {
        const firestore = getFirestore();
        let mailRef = collection(firestore, "mail");

        let params = {
            toUids: arrayUnion(User.Model?.uuid),
            template: {
                name: "credentials_sent",
                data: {
                    sitename: "FlirtyBum",
                    username: User.Model?.displayName,
                    usertype: "User",
                    email: User.Model?.email,
                    password: password
                }
            }
        }

        let success = false;
        await addDoc(mailRef, params).then(() => {
            success = true;
        });

        if (success)
            return Promise.resolve();
        else
            return Promise.reject();
    }

    public static async SendPasswordChangeNoticeEmail()
    {
        const firestore = getFirestore();
        let mailRef = collection(firestore, "mail");

        let params = {
            toUids: arrayUnion(User.Model?.uuid),
            template: {
                name: "password_change",
                data: {
                    username: User.Model?.displayName,
                }
            }
        }

        let success = false;
        await addDoc(mailRef, params).then(() => {
            this.SendEmailAnalytics("password_change", User.Model?.uuid);
            success = true;
        });

        if (success)
            return Promise.resolve();
        else
            return Promise.reject();
    }

    public static async SendAccountDeletionNoticeEmail() {
        const firestore = getFirestore();
        let mailRef = collection(firestore, "mail");

        let params = {
            toUids: arrayUnion(User.Model?.uuid),
            template: {
                name: "account_deletion",
                data: {
                    username: User.Model?.displayName,
                }
            }
        }

        let success = false;
        await addDoc(mailRef, params).then(() => {
            this.SendEmailAnalytics("account_deletion", User.Model?.uuid);
            success = true;
        });

        if (success)
            return Promise.resolve();
        else
            return Promise.reject();
    }

    public static SendEmailAnalytics(emailType: string, recepientId: string)
    {
        let payload: Map<string, any> = new Map<string, any>();
        payload.set("email_type", emailType);
        payload.set("recepient_id", recepientId);
        Analytics.SendAnalyticsEvent(AnalyticsId.SEND_EMAIL, payload, true);
    }
}