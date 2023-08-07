import { error } from '@sveltejs/kit';
import { index } from '../../posts/index';

export async function load({ params }) {
	try {
		const post = index[params.slug as keyof typeof index];

		if (!post) {
			throw error(404, `Não existe: ${params.slug}`);
		}

		const markdown = await post;

		return {
			content: markdown.default,
			meta: markdown.metadata
		};
	} catch (e) {
		throw error(404, `Não existe: ${params.slug}`);
	}
}
