import { FirebaseApp } from "../FirebaseApp";
import { checkActionCode, getAuth } from "firebase/auth";
import { applyActionCode, verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { Analytics, AnalyticsId } from "./Analytics";

export class AccountManagementMode {
    public static get RESET_PASSWORD(): string { return "resetPassword"; }
    public static get RECOVER_EMAIL(): string { return "recoverEmail"; }
    public static get VERIFY_EMAIL(): string { return "verifyEmail"; }
}

export class AccountManagement
{
    static auth = getAuth(FirebaseApp.app);

    //#region Password Handling
    static async VerifyPasswordResetCode(actionCode: string): Promise<void>
    {
        let success = false;
        await verifyPasswordResetCode(this.auth, actionCode).then(async (email) => {
            success = true;
        }).catch((error) => {
            
        });

        if (success)
            return Promise.resolve();
        else
            return Promise.reject();
    }

    static async ConfirmPasswordReset(actionCode: string, newPassword: string): Promise<void>
    {
        let success = false;
        await confirmPasswordReset(this.auth, actionCode, newPassword).then((res) => {
            success = true;
        }).catch((error) => {

        });

        if (success)
            return Promise.resolve();
        else
            return Promise.reject();
    }
    //#endregion

    //#region Email Handling
    static async VerifyEmailAddress(actionCode: string): Promise<void>
    {
        let success = false;
        let email;
        await checkActionCode(this.auth, actionCode).then((info) => {
            email = info['data']['email'];
        });

        await applyActionCode(this.auth, actionCode).then(() => {
            success = true;
        }).catch((error) => {
            
        });

        let payload: Map<string, any> = new Map<string, any>();
        payload.set("email", email);        
        Analytics.SendAnalyticsEvent(AnalyticsId.VERIFY_EMAIL, payload, true);

        if (success)
            return Promise.resolve();
        else
            return Promise.reject();
    }
    //#endregion
}