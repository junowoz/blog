<script lang="ts">
	import NavBar from '../components/NavBar.svelte';
	import Footer from '../components/Footer.svelte';
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
	}

	//date sort
	let sortOrder = 'Mais novos';
	function handleSortChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		sortOrder = target.value;
	}

	//switch pages
	let currentPage = 1;
	const postsPerPage = 10;

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
		if (selectedTags.length > 0 || searchQuery || sortOrder !== 'Mais novos') {
			currentPage = 1;
		}
	}
</script>

<svelte:head>
	<title>{config.title}</title>
	<meta property="og:title" content={config.title} />
</svelte:head>

<main class="max-w-screen-sm sm:w-full mx-4 md:mx-auto my-2">
	<NavBar />
	<div class="flex mt-4 space-x-2">
		<!-- Search Input -->
		<input
			class="flex-grow py-1 px-2 border border-gray-300 rounded-md text-sm"
			type="text"
			placeholder="Pesquisar.."
			bind:value={searchQuery}
		/>
		<!-- Sorting Select -->
		<select
			bind:value={sortOrder}
			on:change={handleSortChange}
			class="flex-grow-1 px-2 border border-gray-300 rounded-md text-sm"
			name="sort"
		>
			<option>Mais novos</option>
			<option>Mais antigos</option>
		</select>
	</div>

	<!-- tag clouds -->
	<div class="mt-4">
		{#each Array.from(new Set( [...data.posts.flatMap( (post) => (post.tags ? post.tags : []) ), ...data.posts.map((post) => post.category)] )) as item (item)}
			<button
				class={selectedTags.includes(item)
					? 'inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-500 text-white mr-2 mb-2 hover:bg-blue-600'
					: 'inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-200 text-gray-900 mr-2 mb-2 cursor-pointer hover:bg-gray-300'}
				on:click={() => handleTagClick(item)}
				on:touchend={() => handleTagClick(item)}
			>
				{item}
			</button>
		{/each}
		<button
			class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-500 text-white mr-2 mb-2 hover:bg-gray-600"
			on:click={() => clearFilter()}
			on:touchend={() => clearFilter()}
		>
			Limpar
		</button>
	</div>

	<!-- posts -->
	<div class="my-4">
		<ul class="space-y-4">
			{#each data.posts
				.filter((post) => (!selectedTags.length || selectedTags.some((tag) => (post.tags ? post.tags.includes(tag) : false) || post.category === tag)) && (!searchQuery || post.slug
								.toLowerCase()
								.includes(searchQuery.toLowerCase()) || (post.tags ? post.tags.some((tag) => tag
											.toLowerCase()
											.includes(searchQuery.toLowerCase())) : false) || post.category
								.toLowerCase()
								.includes(searchQuery.toLowerCase())))
				.sort( (a, b) => (sortOrder === 'Mais novos' ? new Date(b.date).getTime() - new Date(a.date).getTime() : new Date(a.date).getTime() - new Date(b.date).getTime()) )
				.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage) as post}
				<li>
					<a
						href={post.slug}
						data-title={post.title}
						data-date={formatDate(post.date)}
						class="text-blue-500 hover:underline visited:text-purple-500 w-full font-semibold"
					>
						{post.title}
					</a>
					<small class="text-gray-800">
						—
						<time datetime={formatDate(post.date)}>
							{formatDate(post.date)}
						</time>
					</small>
					<!-- <code class="text-gray-800 text-xs"> | 344 visitas </code> -->
					{#if post.description}
						<p class="text-sm leading-6 line-clamp-2 text-gray-600 mt-1">
							{post.description}
						</p>
					{/if}
				</li>
			{/each}
		</ul>
	</div>

	<div class="flex justify-between my-6 text-blue-500 font-semibold">
		<button
			on:click={previousPage}
			on:touchend={previousPage}
			disabled={currentPage <= 1}
			class={`px-2 py-1 ${
				currentPage <= 1 ? ' text-gray-500 cursor-not-allowed' : 'bg-white text-blue-500'
			}`}
		>
			« Atrás
		</button>
		<button
			on:click={nextPage}
			on:touchend={nextPage}
			disabled={currentPage >= data.posts.length / postsPerPage}
			class={`px-2 py-1 ${
				currentPage >= data.posts.length / postsPerPage
					? ' text-gray-500 cursor-not-allowed'
					: 'bg-white text-blue-500'
			}`}
		>
			Seguinte »
		</button>
	</div>
	<Footer />
</main>
