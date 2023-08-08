<script lang="ts">
	import * as config from '$lib/config';
</script>

<footer
	class="flex items-center justify-start py-4 bg-inherit border-t border-t-neutral-200 dark:border-t-neutral-700 text-sm gap-1 text-neutral-500 dark:bg-inherit dark:text-neutral-50"
>
	<a target="_blank" href="https://junowoz.com">{config.junowoz}{' '}</a>

	<span>
		© {new Date().getFullYear()}
	</span>
</footer>
