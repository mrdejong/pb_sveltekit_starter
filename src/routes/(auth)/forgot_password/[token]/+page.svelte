<script lang="ts">
	import { auth_title } from '$lib/store';
	import { onMount } from 'svelte';
	import { superForm } from 'sveltekit-superforms';
	import Field from '../../../../components/form/field.svelte';
	import { enhance } from '$app/forms';
	import Alert from '../../../../components/feedback/alert.svelte';

	let { data } = $props();

	let { form, errors, message } = superForm(data.form);

	onMount(() => {
		auth_title.set('Reset password');
	});
</script>

<form class="flex flex-col px-12 h-full py-10 justify-center" method="POST" use:enhance>
	{#if $message}
		<Alert type="success">
			{$message}
		</Alert>
	{/if}

	<Field
		type="password"
		bind:value={$form.password}
		name="password"
		errors={$errors.password}
		label="Password"
	/>
	<Field
		type="password"
		bind:value={$form.passwordConfirm}
		name="passwordConfirm"
		errors={$errors.passwordConfirm}
		label="Confirm Password"
	/>

	<button type="submit" class="btn btn-primary mt-2">Reset password</button>
	<span class="text-xs pt-4">
		No account yet, then please create one
		<a href="/register" class="link"> here</a>
	</span>
</form>
