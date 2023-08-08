<script>
	import Footer from '../components/Footer.svelte';
	import '../styles/app.css';
	import '../styles/tailwind.css';
</script>

<body class="max-w-screen-sm sm:w-full mx-2 md:mx-auto my-2 bg-inherit dark:bg-neutral-800">
	<slot />
	<Footer />
</body>
