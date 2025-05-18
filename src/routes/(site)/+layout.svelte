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

<div class="bg-base-100 shadow-sm">
	<div class="container mx-auto">
		<div class="navbar">
			<div class="navbar-start">
				<div class="dropdown">
					<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</div>
					<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
					<ul
						tabindex="0"
						class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
					>
						<NavItems items={navItems} />
					</ul>
				</div>

				<a href="/" class="btn btn-ghost text-xl">Habitor</a>
			</div>
			<div class="navbar-center hidden lg:flex">
				<ul class="menu menu-horizontal px-1">
					<NavItems items={navItems} />
				</ul>
			</div>
			<div class="navbar-end gap-4">
				{#if data.user !== null}
					<form method="POST" action="/logout">
						<button type="submit" class="btn btn-sm btn-error">Logout</button>
					</form>
				{:else}
					<div class="join">
						<a class="join-item btn btn-sm" href="/login">Login</a>
						<a class="join-item btn btn-primary btn-sm" href="/register">Register</a>
					</div>
				{/if}
				<ThemeSwitcher />
			</div>
		</div>
	</div>
</div>

<div class="container mx-auto">
	<div class="pt-10 max-sm:px-8">
		{@render children()}
	</div>
</div>
