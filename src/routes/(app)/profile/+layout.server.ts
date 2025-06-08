import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals: { user, pb } }) => {
    if (user!.avatar !== '' && !user!.avatar.startsWith('http')) {
        const original = user!.avatar;
        user!.avatar = pb.files.getURL(user!, original);
    }
    return {
        user: user!
    };
}) satisfies LayoutServerLoad;
