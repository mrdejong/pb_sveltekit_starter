import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals }) => {
    if (locals.user === null && !locals.pb.authStore.isValid) {
        return redirect(303, '/login');
    }

    if (locals.user!.avatar !== '' && !locals.user!.avatar.startsWith('http')) {
        const original = locals.user!.avatar;
        locals.user!.avatar = locals.pb.files.getURL(locals.user!, original);
    }

    return {
        user: locals.user!
    };
}) satisfies LayoutServerLoad;
