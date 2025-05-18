<script lang="ts">
	import { auth_title } from '$lib/store';
	import { onMount } from 'svelte';
	import { superForm } from 'sveltekit-superforms';
	import Field from '../../../components/form/field.svelte';
	import { enhance } from '$app/forms';
	import Alert from '../../../components/feedback/alert.svelte';

	let { data } = $props();

	const { form, errors, message } = superForm(data.form, {
		applyAction: false
	});

	onMount(() => {
		auth_title.set('Forgot password');
	});
</script>

<form class="flex flex-col px-12 h-full py-10 justify-center" method="POST" use:enhance>
	{#if $message}
		<Alert type="success">
			{$message}
		</Alert>
	{/if}

	<Field
		type="text"
		bind:value={$form.email}
		name="email"
		errors={$errors.email}
		label="Email address"
	/>

	<button type="submit" class="btn btn-primary mt-2">Request password reset</button>
	<span class="text-xs pt-4">
		No account yet, then please create one
		<a href="/register" class="link"> here</a>
	</span>
</form>
