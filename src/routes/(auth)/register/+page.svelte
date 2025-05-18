<script lang="ts">
	import { auth_title } from '$lib/store';
	import { onMount } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import Field from '../../../components/form/field.svelte';
	import Alert from '$components/feedback/alert.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	let { data } = $props();

	let isFail = $state(false);

	const { form, errors, message, enhance } = superForm(data.form, {
		applyAction: false,
		onResult(event) {
			if (event.result.status && event.result.status === 400) isFail = true;
			if (event.result.type === 'redirect' && browser) goto(event.result.location);
		},
		onError() {
			isFail = true;
		}
	});

	onMount(() => {
		auth_title.set('Register a new account');
	});
</script>

<form
	class="flex flex-col px-12 h-full py-10 justify-center max-w-[380px]"
	method="POST"
	use:enhance
>
	{#if $message}
		{#if isFail}
			<Alert type="error">{$message}</Alert>
		{:else}
			<Alert type="info">{$message}</Alert>
		{/if}
	{/if}

	<Field type="text" bind:value={$form.name} name="name" errors={$errors.name} label="Name" />
	<Field
		type="email"
		bind:value={$form.email}
		name="email"
		errors={$errors.email}
		label="Email address"
	/>
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
		label="Confirm password"
	/>

	<button type="submit" class="btn btn-primary mt-2">Register</button>
	<span class="text-xs pt-4">
		Do you have a account already?
		<a href="/login" class="link"> Login here</a>
	</span>
</form>
