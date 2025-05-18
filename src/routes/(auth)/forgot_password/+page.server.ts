import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

const schema = z.object({
    email: z.string().nonempty().email(),
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

        await locals.users.requestPasswordReset(form.data.email);

        return message(form, 'Please check your email');
    }
}
