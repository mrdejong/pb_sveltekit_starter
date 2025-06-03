import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals }) => {
    if (locals.user === null && !locals.pb.authStore.isValid) {
        return redirect(303, '/login');
    }
    return {
        user: locals.user!
    };
}) satisfies LayoutServerLoad;
