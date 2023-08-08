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
	let sortOrder = 'Novos';
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
		if (selectedTags.length > 0 || searchQuery || sortOrder !== 'Novos') {
			currentPage = 1;
		}
	}

	let count = 0;
	
	const increment = () => (count += 1);
</script>

<svelte:head>
	<title>{config.title}</title>
	<meta property="og:title" content={config.title} />
</svelte:head>

<main class="max-w-screen-sm sm:w-full mx-4 md:mx-auto my-2">
	<NavBar />

	
	<button on:click={increment}>
		{count}
	</button>
	
	
	
	<Footer />
</main>
