import { error } from '@sveltejs/kit';
import { index } from '../../posts/index';

export async function load({ params }) {
	try {
		const post = index[params.slug];

		if (!post) {
			throw error(404, `Could not find ${params.slug}`);
		}

		const markdown = await post;

		return {
			content: markdown.default,
			meta: markdown.metadata
		}
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`)
	}
}


// export async function load({ params }) {
// 	try {
// 		const indexImport = await import('../../posts/index.json');
//         const index = indexImport.default as Record<string, string>;

// 		if (!index[params.slug]) {
// 			throw error(404, `Este post não existe: ${params.slug}`);
// 		}

// 		const post = await import(`../../posts/${index[params.slug]}`);

// 		return {
// 			content: post.default,
// 			meta: post.metadata
// 		};
// 	} catch (e) {
// 		throw error(404, `Erro ao carregar o post: ${params.slug}`);
// 	}
// }

