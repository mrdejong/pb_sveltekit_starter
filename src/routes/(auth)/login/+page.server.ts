import { fail, redirect } from '@sveltejs/kit';
import { message, setMessage, superValidate } from 'sveltekit-superforms';
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
            setMessage(form, 'Please correct all inputs')
            return fail(400, { form });
        }

        try {
            await locals.users.authWithPassword(form.data.email, form.data.password);
        } catch (e: any) {
            setMessage(form, 'Please enter the correct email or password');
            return fail(400, { form })
        }

        return redirect(303, '/');
    }
}
