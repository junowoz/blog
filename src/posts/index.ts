import type { PostModule } from '$lib/types';

export const index: Record<string, Promise<PostModule>> = {
	'mentoria-de-carreira': import('./autoajuda/mentoria-de-carreira.md'),
	'principios': import('./autoajuda/principios.md'),
	'produtividade': import('./autoajuda/produtividade.md'),
	'java': import('./computacao/java.md'),
	'criptomoedas': import('./economia/criptomoedas.md'),
	'fundamentos-da-diversificacao': import('./economia/fundamentos-da-diversificacao.md'),
	'venture-capital': import('./economia/venture-capital.md'),
	'inteligencia-artificial-aula-1': import('./engco201m01/inteligencia-artificial-aula-1.md'),
	'introducao-ao-espiritismo': import('./espiritismo/introducao-ao-espiritismo.md'),
	'como-dormir-bem': import('./neurociencia/como-dormir-bem.md'),
	'antes-da-startup': import('./startups/antes-da-startup.md'),
	'conselhos-essenciais-yc': import('./startups/conselhos-essenciais-yc.md'),
	'guia-pratico-pitch': import('./startups/guia-pratico-pitch.md'),
	'por-que-nao-começar-uma-startup': import('./startups/por-que-nao-começar-uma-startup.md'),
	'primeiros-clientes': import('./startups/primeiros-clientes.md'),
	'recursos-para-startups': import('./startups/recursos-para-startups.md'),
};
