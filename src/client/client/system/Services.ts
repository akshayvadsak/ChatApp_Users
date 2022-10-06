export type HttpMethods = "GET" | "POST";
export class Services
{   
    static async CallAction<T>(action:string, data:any, onSuccess:(result: T)=>any = null as any, onFail:(error: string)=>any = null as any)
    {
        const serverUrl = "https://us-central1-chat-hub-1.cloudfunctions.net/app/"
        //const serverUrl = "http://localhost:5001/chat-hub-1/us-central1/app/"
        await this.Fetch<T>(serverUrl + action, "POST", data)
            .then(result=>{
                onSuccess?.(result);
            })
            .catch(error=>{
                onFail?.(error.json());
            });
    }
    
    static async Fetch<T>(url:string, method:HttpMethods = "GET", data:any = undefined) : Promise<T>
    {
        const requestOptions = {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: data ? JSON.stringify(data) : undefined
        };
        let err = null;
        let result:T = null as any;

        await fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                result = data as T;
            })
            .catch((error) => {
                err = error;
            });
        if (err)
        {
            return Promise.reject(err);
        }
        else
        {
            return Promise.resolve(result);
        }
    }
}