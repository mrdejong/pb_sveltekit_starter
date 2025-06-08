<script lang="ts">
	import Alert from '$components/feedback/alert.svelte';
	import Field from '$components/form/field.svelte';
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();
	let { form, errors, message, enhance } = superForm(data.form);
</script>

<fieldset class="fieldset bg-base-200 border-base-300 rounded-box border p-4 mb-8">
	<legend class="fieldset-legend">Update your profile</legend>

	{#if $message}
		{@const m = JSON.parse($message)}
		<Alert type={m.msg_type}>{m.msg}</Alert>
	{/if}

	<form method="POST" enctype="multipart/form-data" id="account-form" use:enhance>
		<Field name="name" errors={$errors.name} label="Your name" bind:value={$form.name} />

		<input type="file" class="file-input" name="avatar" bind:value={$form.avatar} />

		<div class="pt-2">
			<button type="submit" class="btn btn-primary">Save</button>
		</div>
	</form>
</fieldset>
