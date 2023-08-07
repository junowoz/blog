<script lang="ts">
	import { formatDate } from '$lib/utils';
	import * as config from '$lib/config';
	export let data;

	// abrir em nova aba links do post
	function blankTarget(node: HTMLDivElement) {
		const links = node.querySelectorAll('a');

		links.forEach((link: { setAttribute: (arg0: string, arg1: string) => void }) => {
			link.setAttribute('target', '_blank');
		});

		return {
			// optional destroy function that runs when the component using this action is destroyed
			destroy() {
				links.forEach((link: { removeAttribute: (arg0: string) => void }) => {
					link.removeAttribute('target');
				});
			}
		};
	}
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title} | {config.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<!-- Header -->
<div class="mt-6">
	<a href="/" class="text-gray-600">« voltar </a>
	<nav class="flex items-center justify-between pb-2 pt-4 border-b border-gray-200">
		<span class="text-2xl font-bold text-gray-900">{data.meta.title}</span>
	</nav>
</div>

<article class="mb-4">
	<p class="text-md text-gray-600 my-2">Publicado {formatDate(data.meta.date)}</p>

	<div>
		<span
			class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-200 text-gray-900 mr-2 mb-2"
		>
			{data.meta.category}
		</span>
		{#if data.meta.tags}
			{#each data.meta.tags as tag}
				<span
					class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-200 text-gray-900 mr-2 mb-2"
					>{tag}</span
				>
			{/each}
		{/if}
	</div>

	<!-- Post -->
	<div class="prose max-w-full mx-auto py-4 text-gray-900" use:blankTarget>
		<svelte:component this={data.content} />
	</div>
</article>
