<script lang="ts">
	import Alert from '$components/feedback/alert.svelte';
	import Field from '$components/form/field.svelte';
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();
	let {
		form: email_form,
		errors: email_errors,
		message: email_message,
		enhance: email_enhance
	} = superForm(data.email_form);
	let {
		form: pw_form,
		errors: pw_errors,
		message: pw_message,
		enhance: pw_enhance
	} = superForm(data.password_form);
</script>

<fieldset class="fieldset bg-base-200 border-base-300 rounded-box border p-4 mb-8">
	<legend class="fieldset-legend">Change e-mail address</legend>

	<p>
		When changing your email address you will be logged out! You then have to check your email and
		confirm the change.
	</p>
	<p>
		If you do not confirm your email address change you still be able to login with the current
		email address.
	</p>

	{#if $email_message}
		{@const m = JSON.parse($email_message)}
		<Alert type={m.msg_type}>{m.msg}</Alert>
	{/if}

	<form method="POST" id="email-form" action="/profile/account?/change_email" use:email_enhance>
		<Field
			name="email"
			errors={$email_errors.email}
			label="Email address"
			bind:value={$email_form.email}
		/>
		<div class="pt-2">
			<button type="submit" class="btn btn-sm btn-primary">Save</button>
		</div>
	</form>
</fieldset>

<fieldset class="fieldset bg-base-200 border-base-300 rounded-box border p-4">
	<legend class="fieldset-legend">Change password</legend>

	<p>After updating your password you'll be logged and have to login again.</p>

	{#if $pw_message}
		{@const m = JSON.parse($pw_message)}
		<Alert type={m.msg_type}>{m.msg}</Alert>
	{/if}

	<form method="POST" id="password-form" action="/profile/account?/change_password" use:pw_enhance>
		<Field
			type="password"
			errors={$pw_errors.oldPassword}
			name="oldPassword"
			bind:value={$pw_form.oldPassword}
			label="Current password"
		/>
		<Field
			type="password"
			errors={$pw_errors.password}
			name="password"
			bind:value={$pw_form.password}
			label="Password"
		/>
		<Field
			type="password"
			errors={$pw_errors.confirmPassword}
			name="confirmPassword"
			bind:value={$pw_form.confirmPassword}
			label="Confirm password"
		/>
		<div class="pt-2">
			<button type="submit" class="btn btn-sm btn-primary">Save</button>
		</div>
	</form>
</fieldset>
