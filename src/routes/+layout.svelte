<script>
	import Footer from '../components/Footer.svelte';
	import '../styles/app.css';
	import '../styles/tailwind.css';

	if (typeof window !== 'undefined' && window) {
		const googleAnalyticsId = 'G-RVMBTKCTP0';
		// @ts-ignore
		window.dataLayer = window.dataLayer || [];
		// @ts-ignore
		function gtag() {
			window.dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', googleAnalyticsId);
	}
</script>

<svelte:head>
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-RVMBTKCTP0"></script>
</svelte:head>

<slot />
<Footer />
