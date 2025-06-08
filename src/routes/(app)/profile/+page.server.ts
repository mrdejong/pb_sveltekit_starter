import { setSuperMessage } from '$lib';
import { fail, redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const schema = z.object({
    name: z.string().min(1),
    avatar: z.instanceof(File, { message: 'Please upload a file' }).optional(),
});

export const load = async ({ locals }) => {
    const form = await superValidate({
        name: locals.user!.name,
    }, zod(schema))
    return { user: locals.user!, form };
}

export const actions = {
    async default({ request, locals }) {
        const form = await superValidate(request, zod(schema));

        if (!form.valid) {
            setSuperMessage(form, 'error', 'Please correct all inputs')
            return fail(400, { form });
        }

        let data: { [key: string]: string | File } = {};

        if (locals.user!.name !== form.data.name) {
            data['name'] = form.data.name;
        }

        if (form.data.avatar) {
            data['avatar'] = form.data.avatar;
        }

        if (Object.keys(data).length > 0) {
            try {
                locals.user = await locals.users.update(locals.user!.id, data)
            }
            catch (e: any) {
                console.error("error updating profile", e);
                setSuperMessage(form, 'error', "Something went wrong, please contact support.");
                return fail(400, { form });
            }

            setSuperMessage(form, 'success', "Your profile has been saved!");
            return { form };
        }
        else {
            setSuperMessage(form, 'none', "No changes have been made nor saved");
        }

        return { form };
    }
}
