<script lang="ts">
	import { page } from '$app/state';
	import NavItems from '$components/nav_items.svelte';
	import ThemeSwitcher from '$components/theme_switcher.svelte';

	let { data, children } = $props();

	let user = $derived.by(() => {
		return data.user;
	});

	let avatar = $derived.by(() => {
		if (user.avatar === '')
			return `https://ui-avatars.com/api/?format=svg&name=${user.name}&background=random`;
		return 'https://ui-avatars.com/api/?format=svg&name=NO&background=ff0000';
	});

	let logoutForm: HTMLFormElement;

	interface NavItem {
		title: string;
		link?: string;
		active: () => boolean;
		children?: NavItem[];
	}
	const navItems: NavItem[] = [
		{
			title: 'Dashboard',
			link: '/db',
			active: (): boolean => {
				return '/db' === page.url.pathname;
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
				<ThemeSwitcher />
				<div class="dropdown dropdown-end">
					<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
						<div class="w-10 rounded-full">
							<img alt={user.name} src={avatar} />
						</div>
					</div>
					<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
					<ul
						tabindex="0"
						class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
					>
						<li>
							<a href="/account">Account settings</a>
						</li>
						<li>
							<a href="/" onclick={() => logoutForm.submit()}>Logout</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="container mx-auto">
	<div class="pt-10 max-sm:px-8">
		{@render children()}
	</div>
	<form bind:this={logoutForm} method="POST" action="/logout" class="hidden">
		<button type="submit">Logout</button>
	</form>
</div>
