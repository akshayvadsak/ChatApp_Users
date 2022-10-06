import { collection, doc, getDoc, getDocs, getFirestore, orderBy, query, where } from "firebase/firestore";
import { Chat } from "../chat/Chat";
import { HttpsHandler, HttpsActionNames } from "./HttpsHandler";
import { SessionHandler, SessionKeys } from "./SessionHandler";
import { Utils } from "./Utils";

export class ProductModel
{
    id: string = "";
    productName: string = "";
    priceId: string = "";
    priceValue: number = 0;
    value: number = 0;
    discountRef: string = "";
    testPriceId: string="";

    constructor(params: any)
    {
        this.productName = params.productName;
        this.priceId = params.priceId;
        this.priceValue = params.priceValue;
        this.value = params.value;
        this.discountRef = params.discountRef;
        this.testPriceId = params.testPriceId;
    }
}

export class DiscountModel
{
    id: string = "";
    priceId: string = "";
    description: string = "";
    name: string = "";
    value: number = 0;
    testPriceId: string="";
    priceValue: number = 0;
    
    constructor(params: any)
    {
        this.id = params.id;
        this.priceId = params.priceId
        this.description = params.description;
        this.name = params.name;
        this.value = params.value;
        this.testPriceId = params.testPriceId;
        this.priceValue = params.priceValue
    }
}

export class ProductType
{
    public static get PLANS(): string { return "plans"; }
    public static get UNLIMITED(): string { return "unlimited"; }
}

export class Products
{
    public static async GetProductPlanByPriceId(priceId: string): Promise<ProductModel>
    {
        const firestore = getFirestore();
        const productsRef = collection(firestore, "products/plans/offers");
        const productsQuery = query(productsRef, where("price_id", "==", priceId));

        let productModel: ProductModel = null as any;
        const productsSnap = await getDocs(productsQuery);
        if (productsSnap.size > 0)
        {
            //let data = productsSnap.docs[0].data();
            let doc = productsSnap.docs[0];
            let model = Utils.ParseDataToProductModel(doc);
            productModel = model;
        }

        return Promise.resolve(productModel);
    }

    public static async GetAllProductsByType(type: ProductType): Promise<ProductModel[]>
    {
        const firestore = getFirestore();
        const productsRef = collection(firestore, `products/${type}/offers`);
        const productsQuery = query(productsRef, orderBy('value', 'asc'));

        let productModels: ProductModel[] = [];
        const productsSnap = await getDocs(productsQuery);
        productsSnap.forEach((doc) => {
            //let data = doc.data();
            let model = Utils.ParseDataToProductModel(doc);
            productModels.push(model);
        })

        return Promise.resolve(productModels);
    }

    public static async TryPurchaseProductById(priceId: string, creditValue:number, currentRoute: string,isDiscount=false,discountRef='')
    {
        let creditsValue = creditValue;
        let successUrl = isDiscount?`${Chat.ORIGIN}/post-checkout/${priceId}/true/${creditsValue}/${discountRef}`:`${Chat.ORIGIN}/post-checkout/${priceId}/true/${creditsValue}`;
        let cancelledUrl = isDiscount?`${Chat.ORIGIN}/post-checkout/${priceId}/false/cancelled/${discountRef}`:`${Chat.ORIGIN}/post-checkout/${priceId}/false/cancelled`;
        let url = `${HttpsHandler.BASE_URL}/${HttpsActionNames.FETCH_CHECKOUT_SESSION}?priceId=${priceId}&successUrl=${successUrl}&cancelledUrl=${cancelledUrl}`;
        HttpsHandler.SendGetRequest(url, false, (success, data, message) => {
            SessionHandler.SetItem(SessionKeys.SESSION_REDIRECT_ROUTE, currentRoute);
            window.location.replace(data);
        }, (success, message) => {
        })
    }

    //#region Discount Related
    public static async GetDiscountById(discountId: string): Promise<DiscountModel>
    {
        const firestore = getFirestore();
        const discountsRef = collection(firestore, "products/discounts/offers");
        const discountDoc = doc(discountsRef, discountId);

        const discountSnap = await getDoc(discountDoc);
        const data = discountSnap.data();
        let discountModel: DiscountModel = null as any;
        if (data)
        {
            discountModel = Utils.ParseDataToDiscountModel(data);
            discountModel.id = discountSnap.id;
        }

        return Promise.resolve(discountModel);
    }
    //#endregion
}