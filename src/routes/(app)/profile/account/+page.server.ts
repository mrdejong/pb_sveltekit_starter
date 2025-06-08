import { setSuperMessage } from '$lib';
import { fail, redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const emailSchema = z.object({
    email: z.string().email(),
});

const passwordSchema = z.object({
    oldPassword: z.string().min(1),
    password: z.string().min(1),
    confirmPassword: z.string().min(1),
}).superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
        ctx.addIssue({
            code: 'custom',
            message: 'Passwords do not match',
            path: ['confirmPassword']
        })
    }
});

export const load = async ({ locals }) => {
    const email_form = await superValidate({
        email: locals.user!.email
    }, zod(emailSchema))
    const password_form = await superValidate(zod(passwordSchema))
    return { user: locals.user!, email_form, password_form };
}

export const actions = {
    async change_email({ request, locals: { user, users, pb }, cookies }) {
        const form = await superValidate(request, zod(emailSchema));

        if (!form.valid) {
            setSuperMessage(form, "error", "You're input has some errors");
            return fail(400, { email_form: form });
        }

        try {
            await users.requestEmailChange(form.data.email);
        }
        catch (e: any) {
            console.error('email form errored', e);
            setSuperMessage(form, "error", "Something went wrong, please contact support.");
            return fail(400, { email_form: form });
        }

        pb.authStore.clear();
        user = null;
        cookies.delete('pb_auth', { path: '/' });

        return redirect(302, '/update_email')
    },
    async change_password({ request, locals: { user, users } }) {
        const form = await superValidate(request, zod(passwordSchema));

        if (!form.valid) {
            setSuperMessage(form, "error", "You're input has some errors");
            return fail(400, { password_form: form });
        }

        try {
            await users.update(user!.id, {
                oldPassword: form.data.oldPassword,
                password: form.data.password,
                passwordConfirm: form.data.confirmPassword
            });
        }
        catch (e: any) {
            console.error('password form errored', e);
            setSuperMessage(form, "error", "Something went wrong, please contact support.");
            return fail(400, { password_form: form });
        }

        const password_form = await superValidate(zod(passwordSchema))
        setSuperMessage(password_form, "success", "Password is successfully changed");
        return { password_form };
    },
}
