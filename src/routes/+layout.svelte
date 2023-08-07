<script>
	import '../app.css';
	import Footer from '../components/Footer.svelte';
</script>

<main class="max-w-screen-sm sm:w-full mx-4 md:mx-auto my-2">
	<slot />
	<Footer />
</main>
