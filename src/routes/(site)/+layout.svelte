<script lang="ts">
	import { page } from '$app/state';
	import NavItems from '$components/nav_items.svelte';
	import ThemeSwitcher from '$components/theme_switcher.svelte';

	let { data, children } = $props();

	interface NavItem {
		title: string;
		link?: string;
		active: () => boolean;
		children?: NavItem[];
	}
	const navItems: NavItem[] = [
		{
			title: 'Home',
			link: '/',
			active: (): boolean => {
				return '/' === page.url.pathname;
			}
		}
	];
</script>

<div class="hero bg-base-200 min-h-screen">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<img src="/img/bird.jpg" alt="Bird" class="max-w-sm rounded-lg shadow-2xl" />
		<div>
			<h1 class="text-5xl font-bold">Box Office News!</h1>
			<p class="py-6">
				Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
				quasi. In deleniti eaque aut repudiandae et a id nisi.
			</p>
			<p class="pb-6">Please edit me in src/routes/(site)/+layout.svelte</p>
			{#if data.user !== null}
				<div class="flex gap-3 items-center">
					<a class="link" href="/db">Dashboard</a>
					<form method="POST" action="/logout">
						<button type="submit" class="btn btn-sm btn-error">Logout</button>
					</form>
				</div>
			{:else}
				<div class="join">
					<a class="join-item btn btn-sm" href="/login">Login</a>
					<a class="join-item btn btn-primary btn-sm" href="/register">Register</a>
				</div>
			{/if}
		</div>
	</div>
</div>

<div class="container mx-auto">
	<div class="pt-10 max-sm:px-8">
		{@render children()}
	</div>
</div>
