import PocketBase, { type RecordModel } from 'pocketbase';

interface User extends RecordModel {
    name: string;
    email: string;
}

export const handle = async ({ event, resolve }) => {
    if (event.url.pathname.startsWith('/.well-known/appspecific/com.chrome.devtools')) {
        return new Response(null, { status: 204 });
    }

    const url = 'http://localhost:8090';
    const cookie = event.request.headers.get('cookie') || '';
    const pb = new PocketBase(url);

    event.locals.users = pb.collection('users');

    event.locals.pb = pb
    pb.authStore.loadFromCookie(cookie);

    event.locals.users = event.locals.pb.collection<User>('users');

    try {
        pb.authStore.isValid && (await pb.collection('users').authRefresh());
        event.locals.user = pb.authStore.record;
    }
    catch (err: any) {
        console.error(err);
        pb.authStore.clear();
        event.locals.user = null;
    }

    const response = await resolve(event);
    if (pb.authStore.isValid)
        response.headers.set('set-cookie', pb.authStore.exportToCookie({ httpOnly: false, secure: false }))

    return response;
}
