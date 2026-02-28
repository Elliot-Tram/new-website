import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { googleSheetsLoader } from './lib/google-sheets-loader.js';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

const tools = defineCollection({
	loader: googleSheetsLoader({
		spreadsheetId: '1FNi4DvYJU5lGOKC8YLumTZWAB_tA69n1zwcoc8mioKY',
		gid: 0, // ID de l'onglet (0 = premier onglet)
	}),
	schema: z.object({
		name: z.string(),
		tagline: z.string(),
		description: z.string(),
		logo: z.string().url(),
		category: z.enum([
			'CRM',
			'Email Marketing',
			'Analytics',
			'SEO',
			'Social Media',
			'Content Marketing',
			'Automation',
			'Customer Support',
			'Sales',
			'Project Management',
			'Enrichissement',
		]),
		subcategories: z.array(z.string()).optional(),
		pricing: z.enum(['Free', 'Freemium', 'Paid']),
		priceRange: z.enum(['$', '$$', '$$$', '$$$$']).optional(),
		startingPrice: z.string().optional(),
		rating: z.number().min(0).max(5),
		affiliateLink: z.string().url(),
		website: z.string().url(),
		featured: z.boolean().default(false),
		pros: z.array(z.string()).optional(),
		cons: z.array(z.string()).optional(),
		bestFor: z.array(z.string()).optional(),
		integrations: z.array(z.string()).optional(),
		addedDate: z.coerce.date(),
	}),
});

export const collections = { blog, tools };
