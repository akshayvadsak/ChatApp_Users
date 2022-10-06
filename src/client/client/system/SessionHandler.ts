export class SessionKeys
{
    public static get SESSION_USER_MODEL():string { return "SESSION_USER_MODEL"; }
    public static get SESSION_PROFILE_MODEL():string { return "SESSION_PROFILE_MODEL"; }
    public static get SESSION_REDIRECT_ROUTE(): string { return "SESSION_REDIRECT_ROUTE"; }

    public static get SESSION_PURCHASE_STATE(): string { return "SESSION_PURCHASE_STATE"; }
    public static get SESSION_PURCHASE_PRICE_ID(): string { return "SESSION_PURCHASE_PRICE_ID"; }
    public static get SESSION_DISCOUNT_REF(): string {return "SESSION_DISCOUNT_REF"}

    public static get SESSION_PRESENCE_ONLINE_STATUS(): string { return "SESSION_PRESENCE_ONLINE_STATUS"; }
}

export class SessionHandler
{
    public static SetItem(key: string, value: any)
    {
        var jsonValue: string = JSON.stringify(value);
        sessionStorage.setItem(key, jsonValue);
    }

    public static GetItem<Type>(key: string, defaultItem: Type) : Type
    {
        let object: Type = defaultItem;

        let jsonObj = sessionStorage.getItem(key);
        if (jsonObj) {
            object = JSON.parse(jsonObj);
        } 

        return object;
    }

    public static DeleteItem(key: string)
    {
        sessionStorage.removeItem(key);
    }

    public static ClearItems()
    {
        sessionStorage.clear();
    }
}