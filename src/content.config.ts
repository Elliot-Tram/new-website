import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { airtableLoader } from './lib/airtable-loader.js';

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
	loader: airtableLoader({
		apiKey: import.meta.env.AIRTABLE_API_KEY || process.env.AIRTABLE_API_KEY,
		baseId: import.meta.env.AIRTABLE_BASE_ID || process.env.AIRTABLE_BASE_ID,
		tableName: import.meta.env.AIRTABLE_TABLE_NAME || process.env.AIRTABLE_TABLE_NAME || 'Tools',
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
