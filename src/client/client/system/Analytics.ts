import { getAnalytics, logEvent } from "firebase/analytics";
import { FirebaseApp } from "../FirebaseApp";
import ReactGA from "react-ga4";
import { User } from "../user/User";

export class Analytics
{
    static analytics: any;
    static TRACKING_ID = "G-S4TW6QRR2Y";
    static defaultPayload: Map<string, any> = new Map<string, any>();

    static Initialize()
    {
        this.analytics = getAnalytics(FirebaseApp.app);
        ReactGA.initialize(this.TRACKING_ID);
        ReactGA.send("pageview")
    }
    
    static GetPayload(noUniversal: boolean, payload?: Map<string, any>): any
    {
        let returnPayload: { [key: string]: string | number | boolean } = {};

        // this.defaultPayload.set("uuid", User.Model?.uuid);
        // this.defaultPayload.set("credits", User.Model?.credits);
        // this.defaultPayload.set("user_type", User.Model?.userType);
        // this.defaultPayload.set("user_status", User.Model?.isPaidUser);
        // this.defaultPayload.set("email_verified", User.CheckEmailVerificationStatus());
        // this.defaultPayload.set("is_test_account", User.Model?.isTestAccount ? 1 : 0);

        if (!noUniversal)
        {
            returnPayload["uuid"] = User.Model?.uuid;
            returnPayload["credits"] = User.Model?.credits;
            returnPayload["user_type"] = User.Model?.userType;
            returnPayload["user_status"] = User.Model?.isPaidUser ? "paid" : "free";
            returnPayload["email_verified"] = User.CheckEmailVerificationStatus();
            returnPayload["is_test_account"] = User.Model?.isTestAccount ? 1 : 0;
        }

        if (payload)
        {
            payload.forEach((value, key) => {
                returnPayload[key] = value;
            });
        }
        
        return returnPayload;
    }

    static SendUIAnalyticsEvent(ui_id: string) 
    {
        let payload: Map<string, any> = new Map<string, any>();

        payload.set("ui_id", ui_id);
        this.SendAnalyticsEvent(AnalyticsId.UI_CLICKED, payload);
    }

    static SendAnalyticsEvent(eventId: string, payload?: Map<string, any>, noUniversal: boolean = false)
    {
        let newPayload: { [key: string]: string | number | boolean } = {};

        newPayload = this.GetPayload(noUniversal, payload);

        logEvent(this.analytics, eventId, newPayload);
        ReactGA.event(eventId, newPayload)
    }
}

export class AnalyticsId {
    // General Events
    public static get UI_CLICKED(): string { return "ui_clicked"; }
    public static get SIGN_UP(): string { return "sign_up"; }
    public static get VERIFY_EMAIL(): string { return "verify_email"; }

    // Purchase Events
    public static get PURCHASE_CLICKED(): string {return "purchase_clicked"; }
    public static get PURCHASE_SUCCESS(): string { return "purchase_success"; }
    public static get PURCHASE_CANCELLED(): string { return "purchase_cancelled"; }

    // Engagement Events
    public static get VIEW_PROFILE(): string { return "view_profile"; }

    // Chat Events
    public static get SEND_CHAT_MESSAGE(): string { return "send_chat_message"; }

    // Mail Events
    public static get SEND_EMAIL(): string { return "send_email"; }

    // Social Events
    public static get LOGIN(): string { return "login"; }
    public static get FORGOT_PASSWORD(): string { return "forgot_password"; }
}

export class AnalyticsUIId {
    public static get BTN_CREDITS(): string { return "btn_credits"; }
    public static get BTN_PURCHASE_CREDITS(): string { return "btn_purchase_credits"; }
    // public static get BTN_MY_PROFILE(): string { return "btn_my_profile"; }
    // public static get BTN_SEND_MESSAGE(): string { return "btn_send_message"; }
    // public static get BTN_VIEW_PROFILE_THUMB(): string { return "btn_view_profile_thumb"; }
    // public static get BTN_VIEW_PROFILE_NAME(): string { return "btn_view_profile_name"; }
    // public static get BTN_HOME(): string { return "btn_home"; }
    // public static get BTN_LOGIN(): string { return "btn_login"; }
    // public static get BTN_REGISTER(): string { return "btn_register"; }
}