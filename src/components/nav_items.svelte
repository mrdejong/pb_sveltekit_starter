<script lang="ts">
	let { items } = $props();
</script>

{#each items as item}
	{#if item.link}
		<li><a class:menu-active={item.active()} href={item.link}>{item.title}</a></li>
	{/if}
	{#if item.children}
		<li>
			<details>
				<summary class:menu-active={item.active()}>{item.title}</summary>
				<ul class="p-2 bg-base-100 w-40">
					{#each item.children as child}
						{#if child.link}
							<li><a href={child.link}>{child.title}</a></li>
						{/if}
					{/each}
				</ul>
			</details>
		</li>
	{/if}
{/each}
