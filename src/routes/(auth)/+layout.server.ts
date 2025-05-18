import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals, url }) => {
    if (locals.user !== null && locals.pb.authStore.isValid && url.pathname !== 'logout') {
        return redirect(303, '/');
    }
    return {};
}) satisfies LayoutServerLoad;
