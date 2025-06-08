<script lang="ts">
	import { page } from '$app/state';

	let { data, children } = $props();

	let title = $derived.by(() => {
		if (page.url.pathname === '/profile') return 'Profile';
		if (page.url.pathname === '/profile/account') return 'Account';
	});
</script>

<div class="flex flex-auto max-sm:flex-col gap-8 w-full">
	<div class="card bg-base-200 card-sm shadow-sm sm:w-64 h-fit relative">
		<div class="card-body">
			<h2 class="text-base font-bold">Settings</h2>
			<ul class="menu w-full">
				<li>
					<a href="/profile" class:menu-active={page.url.pathname === '/profile'}>Profile</a>
					<a href="/profile/account" class:menu-active={page.url.pathname === '/profile/account'}>
						Account
					</a>
				</li>
			</ul>
		</div>
	</div>
	<div class="grow">
		<div class="flex gap-4 mb-8">
			<div>
				<img src={data.user.avatar} alt="avatar" width="128" class="rounded" />
			</div>
			<div class="flex flex-col">
				<div class="card-title">Edit your {title}</div>
				<div>Hello {data.user.name}</div>
			</div>
		</div>
		{@render children()}
	</div>
</div>
