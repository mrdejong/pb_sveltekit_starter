<script lang="ts">
	import { auth_title } from '$lib/store';
	import { onMount } from 'svelte';

	onMount(() => {
		auth_title.set('Update e-mail address.');
	});
</script>

<div class="flex flex-col px-12 h-full py-10 justify-center">
	<p>Please check your email in other to confirm your email address.</p>
	<p class="mt-2">After you have updated your email please login again.</p>
</div>
