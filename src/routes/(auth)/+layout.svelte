<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { auth_title } from '$lib/store';
	import { redirect } from '@sveltejs/kit';

	let { data, children } = $props();

	interface BgImage {
		src: string;
		title: string;
		author: { name: string; link: string };
		source: { name: string; link: string };
	}

	const backgrounds: BgImage[] = [
		{
			src: '/auth/hut_0001.jpg',
			title: 'Hut Meadow Nature',
			author: {
				name: 'YakupIpek',
				link: 'https://pixabay.com/users/yakupipek-13990135/'
			},
			source: {
				name: 'Pixabay',
				link: 'http://pixabay.com/photos/hut-meadow-nature-field-forest-9582608/'
			}
		},
		{
			src: '/auth/irish_setter_0001.jpg',
			title: 'Irish Setter Dog Pet',
			author: {
				name: 'dannaragrim',
				link: 'https://pixabay.com/users/dannaragrim-5924518/'
			},
			source: {
				name: 'Pixabay',
				link: 'https://pixabay.com/photos/irish-setter-dog-pet-animal-canine-8203155/'
			}
		},
		{
			src: '/auth/dog_0001.jpg',
			title: 'Dog Mountain Mombarone',
			author: {
				name: 'Dan Fador',
				link: 'https://pixabay.com/users/danfador-55851/'
			},
			source: {
				name: 'Pixabay',
				link: 'https://pixabay.com/photos/dog-mountain-mombarone-clouds-190056/'
			}
		},
		{
			src: '/auth/dolomites_0001.jpg',
			title: 'Dolomites Mountains',
			author: {
				name: 'Čeština',
				link: 'https://pixabay.com/users/cernetice-250655/'
			},
			source: {
				name: 'Pixabay',
				link: 'https://pixabay.com/photos/dolomites-mountains-countries-5076487/'
			}
		},
		{
			src: '/auth/cape_0001.jpg',
			title: 'Cape Pasture Sea Rebun Island',
			author: {
				name: 'Kanenori',
				link: 'https://pixabay.com/users/kanenori-4749850/'
			},
			source: {
				name: 'Pixabay',
				link: 'https://pixabay.com/photos/cape-pasture-sea-rebun-island-7404790/'
			}
		}
	];

	let bgidx: number = Math.floor(Math.random() * backgrounds.length);
	let background: BgImage = $state(backgrounds[bgidx]);
	let timeout: number | undefined = $state();

	function getBackgroundIndex(): number {
		let rand = Math.floor(Math.random() * backgrounds.length);
		while (bgidx === rand) {
			rand = Math.floor(Math.random() * backgrounds.length);
		}
		bgidx = rand;
		return rand;
	}

	function setBackground() {
		background = backgrounds[getBackgroundIndex()];
	}

	afterNavigate(setBackground);
</script>

<svelte:head>
	<title>{$auth_title} &bull; Habitor</title>
</svelte:head>

<div class="flex flex-col justify-center items-center h-screen">
	<div class="mb-6">
		<h3 class="text-base font-bold text-center">{$auth_title}</h3>
	</div>
	<div class="flex min-h-[400px] w-3xl rounded-xl overflow-hidden shadow-xl">
		<div
			class="bg-base-100 w-sm bg-cover bg-center relative"
			style={`background-image: url('${background.src}');`}
		>
			<div
				class="absolute bottom-2 left-2 flex flex-col gap-0.5 px-3 py-1.5 rounded bg-base-100/20 text-base-200 backdrop-blur-lg"
			>
				<b>{background.title}</b>
				<small>
					<a href={background.author.link} class="link">{background.author.name}</a>
					&bull;
					<a href={background.source.link} class="link">{background.source.name}</a>
				</small>
			</div>
		</div>
		<div class="bg-base-200 w-sm">
			{@render children()}
		</div>
	</div>
</div>
