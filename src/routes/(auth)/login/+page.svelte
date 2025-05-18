<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { auth_title } from '$lib/store';
	import { onMount } from 'svelte';
	import Field from '../../../components/form/field.svelte';
	import { enhance } from '$app/forms';

	let { data } = $props();

	const { form, errors, message } = superForm(data.form, {
		applyAction: false
	});

	onMount(() => {
		auth_title.set('Login to your account');
	});
</script>

<form class="flex flex-col px-12 h-full py-10 justify-center" method="POST" use:enhance>
	{#if $message}
		<div>{$message}</div>
	{/if}

	<Field
		type="text"
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

	<p class="label text-sm">
		<a href="/forgot_password" class="link link-primary">Forgot password?</a>
	</p>

	<button type="submit" class="btn btn-primary mt-2">Login</button>
	<span class="text-xs pt-4">
		No account yet, then please create one
		<a href="/register" class="link"> here</a>
	</span>
</form>
