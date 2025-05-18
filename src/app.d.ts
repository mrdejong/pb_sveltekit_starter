// See https://svelte.dev/docs/kit/types#app.d.ts

import type PocketBase, { AuthRecord, RecordModel, RecordService } from "pocketbase";

//type CollFunction = (): =>

// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            pb: PocketBase;
            user: AuthRecord | null;
            users: RecordService;
        }
        // interface PageData {
        //     user: AuthRecord | undefined;
        // }
        // interface PageState {}
        // interface Platform {}
    }
}

export { };
