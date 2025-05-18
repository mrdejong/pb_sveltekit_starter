<script lang="ts">
	import { auth_title } from '$lib/store';
	import { onMount } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import Field from '../../../components/form/field.svelte';

	let { data } = $props();

	const { form, errors, message, enhance } = superForm(data.form, {
		applyAction: false
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
		<div>{$message}</div>
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
