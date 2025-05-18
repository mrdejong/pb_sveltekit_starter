<script lang="ts">
	let { items } = $props();
</script>

{#each items as item}
	{#if item.link}
		<li><a href={item.link}>{item.title}</a></li>
	{/if}
	{#if item.children}
		<li>
			<details>
				<summary>{item.title}</summary>
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
