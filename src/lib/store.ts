import { writable, type Writable } from "svelte/store";

export const auth_title: Writable<string> = writable('string');

