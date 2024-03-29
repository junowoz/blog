<script lang="ts">
	import NavBar from '../components/NavBar.svelte';
	import { formatDate } from '$lib/utils';
	import type { Tags } from '$lib/types';
	import * as config from '$lib/config';
	export let data;

	let searchQuery = '';

	//tag cloud
	let selectedTags: Tags[] = [];

	function handleTagClick(tag: string) {
		const index = selectedTags.indexOf(tag);
		if (index < 0) {
			selectedTags = [...selectedTags, tag]; // Se a tag não está no array, adiciona
		} else {
			selectedTags = selectedTags.filter((selectedTag) => selectedTag !== tag); // Caso contrário, remove
		}
	}

	// função para limpar os filtros
	function clearFilter() {
		selectedTags = [];
		searchQuery = '';
	}

	//date sort
	let sortOrder = 'Novos';
	function handleSortChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		sortOrder = target.value;
	}

	//switch pages
	let currentPage = 1;
	const postsPerPage = 14;

	function nextPage() {
		currentPage += 1;
	}
	function previousPage() {
		if (currentPage > 1) {
			currentPage -= 1;
		}
	}

	//clear current page with filter
	$: {
		if (selectedTags.length > 0 || searchQuery || sortOrder !== 'Novos') {
			currentPage = 1;
		}
	}

	//sort posts
	$: sortedPosts = data.posts
		.filter(
			(post) =>
				(!selectedTags.length ||
					selectedTags.some(
						(tag) => (post.tags ? post.tags.includes(tag) : false) || post.category === tag
					)) &&
				(!searchQuery ||
					post.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
					(post.tags
						? post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
						: false) ||
					post.category.toLowerCase().includes(searchQuery.toLowerCase()))
		)
		.sort((a, b) =>
			sortOrder === 'Antigos' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)
		);

	$: displayedPosts = sortedPosts.slice(
		(currentPage - 1) * postsPerPage,
		currentPage * postsPerPage
	);
</script>

<svelte:head>
	<title>{config.title}</title>
	<meta property="og:title" content={config.title} />
</svelte:head>

<NavBar />
<!-- BEGIN -->
<div class="flex mt-6 space-x-2">
	<!-- Search Input -->
	<input
		class="search-input flex-grow py-1 border border-neutral-300 dark:border-neutral-200 rounded-md text-sm min-w-0 bg-neutral-50 dark:bg-neutral-300"
		type="text"
		placeholder="Pesquisar.."
		bind:value={searchQuery}
	/>
	<!-- Sorting Select -->
	<select
		bind:value={sortOrder}
		on:change={handleSortChange}
		class="flex-grow-1 px-2 border border-neutral-300 dark:border-neutral-200 rounded-md text-sm bg-neutral-50 dark:bg-neutral-300"
		name="sort"
	>
		<option>Novos</option>
		<option>Antigos</option>
	</select>
	<a class="flex-none" href="/rss.xml" target="_blank" rel="noopener">
		<button>
			<img
				src="https://wp-assets.rss.com/blog/wp-content/uploads/2019/10/10111557/social_style_3_rss-512-1.png"
				alt="rss"
				class="w-auto h-6 flex justify-center items-center"
			/>
		</button>
	</a>
</div>

<!-- tag clouds -->
<div class="mt-6">
	{#each Array.from(new Set( [...data.posts.flatMap( (post) => (post.tags ? post.tags : []) ), ...data.posts.map((post) => post.category)] )) as item (item)}
		<button
			class={selectedTags.includes(item)
				? 'dark:bg-blue-800 dark:text-neutral-50 dark:hover:bg-blue-900 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-500 text-neutral-50 mr-2 mb-2 hover:bg-blue-600'
				: 'dark:bg-neutral-600 dark:text-neutral-50 dark:hover:bg-neutral-600 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-neutral-200 text-neutral-900 mr-2 mb-2 cursor-pointer hover:bg-neutral-300'}
			on:click={() => handleTagClick(item)}
		>
			{item}
		</button>
	{/each}
	<button
		class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-neutral-500 text-neutral-50 mr-2 mb-2 hover:bg-neutral-600"
		on:click={() => clearFilter()}
	>
		Limpar
	</button>
</div>

<!-- posts -->
<div class="my-6">
	<ul class="space-y-4">
		{#each displayedPosts as post}
			<li class="flex items-center">
				<div class="flex items-center w-full">
					<a
						href={post.slug}
						data-title={post.title}
						data-date={formatDate(post.date)}
						class="text-blue-500 hover:underline visited:text-purple-500 dark:text-blue-400 dark:visited:text-purple-300 truncate font-semibold"
					>
						{post.title}
					</a>
					<small class="text-neutral-700 dark:text-neutral-200 flex-shrink-0 ml-1">
						—
						<time datetime={formatDate(post.date)}>
							{formatDate(post.date)}
						</time>
					</small>
				</div>
				<!-- {#if post.description}
					<p class="text-sm leading-6 line-clamp-2 text-neutral-900 dark:text-neutral-50 mt-1">
						{post.description}
					</p>
				{/if} -->
			</li>
		{/each}
	</ul>
</div>

<div class="flex justify-between my-6 text-blue-500 font-semibold">
	<button
		on:click={previousPage}
		disabled={currentPage <= 1}
		class={`px-2 py-1 ${
			currentPage <= 1
				? ' text-neutral-500 dark:text-neutral-300 cursor-not-allowed'
				: 'bg-inherit dark:text-blue-400'
		}`}
	>
		« Atrás
	</button>
	<button
		on:click={nextPage}
		disabled={currentPage * postsPerPage >= sortedPosts.length}
		class={`px-2 py-1 ${
			currentPage * postsPerPage >= sortedPosts.length
				? ' text-neutral-500 cursor-not-allowed'
				: 'bg-inherit dark:text-blue-400'
		}`}
	>
		Seguinte »
	</button>
</div>
<!-- END -->
