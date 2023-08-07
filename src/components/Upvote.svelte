<script>
	export let blogSlug;

	// Inicializamos as variáveis ​​com valores padrão no lado do servidor.
	let count = 0;
	let upvoted = false;

	// Carregamos os valores do LocalStorage apenas no lado do cliente.
	if (typeof window !== 'undefined') {
		count = parseInt(localStorage.getItem(`${blogSlug}_upvotes`)) || 0;
		upvoted = localStorage.getItem(`${blogSlug}_upvoted`) === 'true';
	}

	const toggleVote = () => {
		// Toggle the upvote state.
		upvoted = !upvoted;
		// Update the count based on the new state.
		count = upvoted ? count + 1 : count - 1;

		// Save the count and state to LocalStorage.
		if (typeof window !== 'undefined') {
			localStorage.setItem(`${blogSlug}_upvotes`, count.toString());
			localStorage.setItem(`${blogSlug}_upvoted`, upvoted.toString());
		}
	};
</script>

<button
	on:click={toggleVote}
	class="flex items-center space-x-2 px-4 py-2 rounded shadow text-sm {upvoted
		? 'bg-blue-500 text-white'
		: 'bg-blue-100 text-blue-500'} transition-colors duration-200 ease-in-out hover:{upvoted
		? 'bg-blue-700'
		: 'bg-blue-300'} active:{upvoted
		? 'bg-blue-800'
		: 'bg-blue-400'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		class="h-4 w-4"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d={upvoted ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
		/>
	</svg>
	<span>
		{upvoted ? 'Upvoted' : 'Upvote'}
	</span>
	<span class="font-semibold">
		{count}
	</span>
</button>
