<script>
	import { onMount } from 'svelte';

	let darkMode = false;
	let theme = 'light';

	function updateThemeBasedOnTime() {
		const currentHour = new Date().getHours();
		if (currentHour >= 6 && currentHour < 18) {
			theme = 'light';
		} else {
			theme = 'dark';
		}
		darkMode = theme === 'dark';
		document.documentElement.classList.toggle('dark', darkMode);
		localStorage.setItem('theme', theme);
	}

	function toggleDarkMode() {
		darkMode = !darkMode;
		theme = darkMode ? 'dark' : 'light';
		document.documentElement.classList.toggle('dark', darkMode);
		localStorage.setItem('theme', theme); // Salvar a preferência no localStorage
	}

	onMount(() => {
		// Carregue o tema salvo ou defina com base na hora do dia
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) {
			theme = savedTheme;
		} else {
			updateThemeBasedOnTime();
		}
		darkMode = theme === 'dark';
		document.documentElement.classList.toggle('dark', darkMode);

		// Verifique a hora a cada 15 minutos e atualize o tema se necessário
		const intervalId = setInterval(updateThemeBasedOnTime, 15 * 60 * 1000);

		// Certifique-se de limpar o intervalo quando o componente for destruído
		return () => clearInterval(intervalId);
	});

	// Utilizar a reação para garantir que o tema seja atualizado quando darkMode mudar
	$: theme = darkMode ? 'dark' : 'light';
</script>

<div>
	<button
		on:click={toggleDarkMode}
		class=" bg-neutral-600 dark:bg-neutral-200 dark:text-neutral-900 text-lg p-1 rounded-sm"
	>
		{#if theme === 'dark'}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-4 h-4"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
				/>
			</svg>
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="white"
				class="w-4 h-4"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
				/>
			</svg>
		{/if}
	</button>
</div>
