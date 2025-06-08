<script lang="ts">
	import { auth_title } from '$lib/store';
	import { onMount } from 'svelte';
	import { superForm } from 'sveltekit-superforms';
	import Field from '$components/form/field.svelte';
	import { enhance } from '$app/forms';
	import Alert from '$components/feedback/alert.svelte';

	let { data } = $props();

	let { form, errors, message } = superForm(data.form);

	onMount(() => {
		auth_title.set('Update e-mail address');
	});
</script>

<form class="flex flex-col px-12 h-full py-10 justify-center" method="POST" use:enhance>
	{#if $message}
		<Alert type="success">
			{$message}
		</Alert>
	{/if}

	<p>In order to update your email address please confirm your password</p>

	<Field
		type="password"
		bind:value={$form.password}
		name="password"
		errors={$errors.password}
		label="Password"
	/>

	<button type="submit" class="btn btn-primary mt-2">Update email</button>
</form>
