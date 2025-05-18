import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

const schema = z.object({
    name: z.string().nonempty(),
    email: z.string().nonempty().email(),
    password: z.string().min(6),
    passwordConfirm: z.string().min(6)
}).refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords didn\'t match',
    path: ['passwordConfirm']
});

export const load = async ({ request }) => {
    const form = await superValidate(request, zod(schema));

    return { form };
}

export const actions = {
    async default({ request, locals }) {
        const form = await superValidate(request, zod(schema));

        if (!form.valid) {
            return fail(400, { form });
        }

        try {
            await locals.users.create(form.data);
        }
        catch (err: any) {
            console.error(err)
            return message(form, 'Something went wrong while trying to create your account.')
        }

        return redirect(303, '/login');
    }
}
