<script>
	import Footer from '../components/Footer.svelte';
	import '../styles/app.css';
	import '../styles/tailwind.css';

	if(typeof window !== 'undefined' && window) {
		const googleAnalyticsId = 'G-RVMBTKCTP0';
		// @ts-ignore
		window.dataLayer = window.dataLayer || [];
		// @ts-ignore
		function gtag(){window.dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', googleAnalyticsId);
	}
</script>

<svelte:head>
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-RVMBTKCTP0"></script>
</svelte:head>

<body class="max-w-screen-sm sm:w-full mx-4 md:mx-auto my-2 bg-inherit dark:bg-neutral-800">
	<slot />
	<Footer />
</body>
