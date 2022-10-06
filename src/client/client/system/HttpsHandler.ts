import { GeolocationDetails } from "../../../_metronic/helpers";

export class HttpsActionNames 
{
    public static get LAST_MESSAGE_HANDLER(): string { return "lastMessageHandler" }
    public static get SEND_EMAIL_TEMPLATE(): string { return "sendEmailTemplate" }
    public static get FETCH_CHECKOUT_SESSION(): string { return "fetchCheckoutSession" }
    public static get ON_USER_SIGN_UP(): string { return "onUserSignUp"; }
    public static get BLUR_IMAGE(): string { return "blurImage"; }
    public static get ON_SEND_PASWORD_RESET_EMAIL(): string { return "onSendPasswordResetEmail"; }
    public static get ON_SEND_EMAIL_VERIFICATION_EMAIL(): string { return "onSendEmailVerificationEmail"; }
    public static get GET_USER_DATA_BY_NAME(): string { return "getUserDataByName"; }
    public static get FETCH_TEST_CHECKOUT_SESSION(): string { return "fetchTestCheckoutSession"; }
}

export class HttpsHandler 
{
    // FOR USE WITH FIREBASE CLOUD FUNCTIONS
    public static get BASE_URL(): string { return "https://us-central1-chat-hub-1.cloudfunctions.net"; }
    public static get CHAT_HUB_1(): string { return "chat-hub-1"; }
    public static get US_CENTRAL_1() : string { return "us-central1"; }

    private static TOKEN: string = "6d41ca31-971f-46b2-8017-1d72b7699d20";

    public static async SendGetRequest(url: string, noParams: boolean, onSuccess: (success: boolean, data: any, message: string) => void | null, onFail: (success: boolean, message: string) => void | null)
    {
        let getUrl: string = `${url}${noParams ? "?" : "&"}token=${this.TOKEN}`;
        await fetch(getUrl)
            .then(response => response.json())
            .then((object) => {
                onSuccess(object.success, object.data, object.message);
            }).catch((reason) => {
                onFail(false, reason.message);
            })
    }

    public static async SendPostRequest(url: string, data: any, noParams: boolean, onSuccess: (success: boolean, data: any, message: string) => void | null | Promise<void>, onFail: (success: boolean, message: string) => void | null)
    {
        let postUrl: string = `${url}${noParams ? "?" : "&"}token=${this.TOKEN}`;

        await fetch(postUrl, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then((object) => {
                onSuccess(object.success, object.data, object.message);
            }).catch((reason) => {
                onFail(false, reason.message);
            })
    }

    public static async GetGeolocation(): Promise<GeolocationDetails | undefined>
    {
        let geolocation: GeolocationDetails | undefined = undefined;
        await fetch("https://geolocation-db.com/json/")
            .then(response => response.json())
            .then((object) => {
                geolocation = new GeolocationDetails({
                    countryCode: object.country_code,
                    countryName: object.country_name,
                    city: object.city,
                    postal: object.postal,
                    latitude: object.latitude,
                    longitude: object.longitude,
                    ipv4: object.IPv4,
                    state: object.state
                }); 
            });
        
        return Promise.resolve(geolocation);
    }
}