// place files you want to import through the `$lib` alias in this folder.
export type Tags = string;

export type Post = {
	title: string;
	slug: string;
	description: string;
	junowoz: string;
	date: string;
	tags?: Tags[];
	category: string;
	published: boolean;
};

export type PostModule = Post & {
	module: {
		metadata: Post;
		html: string;
	};
};
