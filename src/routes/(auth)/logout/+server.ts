import { redirect, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ locals, cookies }) => {
    locals.pb.authStore.clear();
    locals.user = null;

    cookies.delete('pb_auth', { path: '/' });

    return redirect(303, '/login');
}
