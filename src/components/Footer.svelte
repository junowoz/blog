<script lang="ts">
	import * as config from '$lib/config';
</script>

<footer class="flex items-center justify-start py-4 bg-white border-t text-sm gap-1 text-gray-500">
	<a target="_blank" href="https://junowoz.com">{config.junowoz}{' '}</a>

	<span>
		© {new Date().getFullYear()}
	</span>
</footer>
