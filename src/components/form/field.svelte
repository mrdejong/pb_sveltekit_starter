<script lang="ts">
	import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
	type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

	type InputType = Exclude<HTMLInputTypeAttribute, 'file'>;

	type Props = WithElementRef<
		Omit<HTMLInputAttributes, 'type'> &
			(
				| { type: 'file'; files?: FileList; label?: ''; errors?: string[] }
				| {
						type?: InputType;
						files?: undefined;
						label?: string;
						errors?: string[] | undefined;
				  }
			)
	>;

	let {
		ref = $bindable(null),
		value = $bindable(),
		type,
		files = $bindable(),
		class: className,
		label,
		errors,
		...restProps
	}: Props = $props();
</script>

<fieldset class="fieldset">
	<legend class="fieldset-legend">{label}</legend>
	<input {type} class="input input-sm" bind:value bind:this={ref} {...restProps} />
	{#if errors}
		{#each errors as err}
			<span class="label text-error">{err}</span>
		{/each}
	{/if}
</fieldset>
