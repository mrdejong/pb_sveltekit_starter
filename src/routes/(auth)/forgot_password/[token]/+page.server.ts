import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

const schema = z.object({
    password: z.string().nonempty().min(6),
    passwordConfirm: z.string().nonempty().min(6),
});

export const load = async ({ request }) => {
    const form = await superValidate(request, zod(schema));

    return { form };
}

export const actions = {
    async default({ request, locals, params }) {
        const form = await superValidate(request, zod(schema));

        if (!form.valid) {
            return fail(400, { form });
        }

        await locals.users.confirmPasswordReset(params.token, form.data.password, form.data.passwordConfirm);

        return redirect(303, '/login');
    }
}
