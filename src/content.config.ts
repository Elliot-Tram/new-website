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
		publishedUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRTp5hRsFXuzeTVOT-3EDOCO69_asKeNwl8xvqXYdFy749wio0LqTCGI2hAdk_9bujolt1c-Br_GyGo/pub?output=csv',
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
