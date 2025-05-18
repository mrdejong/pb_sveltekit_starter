import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1, 'Please enter your password')
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

        await locals.users.authWithPassword(form.data.email, form.data.password);

        return redirect(303, '/');
    }
}
