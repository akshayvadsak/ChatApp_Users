import { getDatabase, ref, onValue, onDisconnect, set, serverTimestamp, Database, DatabaseReference } from "firebase/database";
import { Chat } from "../chat/Chat";
import { FirebaseApp } from "../FirebaseApp";
import { User } from "../user/User";
import { SessionHandler, SessionKeys } from "./SessionHandler";

export class Presence {
    static isInitialized: boolean = false;
    static isOnline: boolean = SessionHandler.GetItem(SessionKeys.SESSION_PRESENCE_ONLINE_STATUS, false);
    static db: Database;
    static connectedRef: DatabaseReference;
    static statusRef: DatabaseReference;

    static site = Chat.SITE;

    static isOnlineForDatabase = {
        online: true,
        last_changed: serverTimestamp()
    };

    static isOfflineForDatabase = {
        online: false,
        last_changed: serverTimestamp()
    };


    public static async Initialize() {
        this.db = getDatabase(FirebaseApp.app);

        this.connectedRef = ref(this.db, '.info/connected');

        this.isInitialized = true;
    }

    public static async Connect(): Promise<void> {
        if (!User.Model || !User.Model?.uuid)
            return;

        this.statusRef = ref(this.db, `${this.site}/users/${User.Model?.uuid}/status`)

        let success = false;

        await onValue(this.connectedRef, async (snap) => {
            if (snap.val() === false) {
                this.isOnline = false;
                await User.UpdateOnlineStatus(false);
                await Chat.UpdateChatterFeedOnlineStatus(false);
                await Chat.UpdateAdminFeedOnlineStatus(false);
                return;
            }

            await onDisconnect(this.statusRef).set(this.isOfflineForDatabase).then(async () => {
                this.isOnline = false;
            });
        });

        await set(this.statusRef, this.isOnlineForDatabase).then(async () => {
            await User.UpdateOnlineStatus(true);
            if (!this.isOnline) {
                await Chat.UpdateChatterFeedOnlineStatus(true);
                await Chat.UpdateAdminFeedOnlineStatus(true);
                this.isOnline = true;
            }
            success = true;
        });

        SessionHandler.SetItem(SessionKeys.SESSION_PRESENCE_ONLINE_STATUS, this.isOnline);

        if (success)
            return Promise.resolve();
        else
            return Promise.reject();
    }

    public static async Disconnect(): Promise<void> {
        if (!User.Model || !User.Model?.uuid || !this.isOnline)
            return;

        SessionHandler.DeleteItem(SessionKeys.SESSION_PRESENCE_ONLINE_STATUS);

        let success = false;
        await set(this.statusRef, this.isOfflineForDatabase).then(async () => {
            await User.UpdateOnlineStatus(false);
            await Chat.UpdateChatterFeedOnlineStatus(false);
            await Chat.UpdateAdminFeedOnlineStatus(false);
            this.isOnline = false;
            console.log(`Presence - Set Online Status to False: ${this.isOnline}`);
            success = true;
        });

        if (success)
            return Promise.resolve();
        else
            return Promise.reject();
    }
}