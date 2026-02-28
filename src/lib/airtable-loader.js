import Airtable from 'airtable';

export function airtableLoader({ apiKey, baseId, tableName }) {
	return {
		name: 'airtable-loader',
		async load() {
			const base = new Airtable({ apiKey }).base(baseId);
			const records = [];

			await base(tableName)
				.select({
					view: 'Grid view',
				})
				.eachPage((pageRecords, fetchNextPage) => {
					pageRecords.forEach((record) => {
						const fields = record.fields;
						
						// Convertir les champs Airtable en format Astro
						const toolData = {
							id: fields.Slug || fields.Name?.toLowerCase().replace(/\s+/g, '-'),
							data: {
								name: fields.Name || '',
								tagline: fields.Tagline || '',
								description: fields.Description || '',
								logo: fields['Logo URL'] || '',
								category: fields.Category || 'CRM',
								subcategories: fields.Subcategories || [],
								pricing: fields.Pricing || 'Paid',
								priceRange: fields['Price Range'] || '$$',
								startingPrice: fields['Starting Price'] || '',
								rating: fields.Rating || 0,
								affiliateLink: fields['Affiliate Link'] || '',
								website: fields.Website || '',
								featured: fields.Featured || false,
								pros: fields.Pros ? fields.Pros.split('\n').filter(p => p.trim()) : [],
								cons: fields.Cons ? fields.Cons.split('\n').filter(c => c.trim()) : [],
								bestFor: fields['Best For'] ? fields['Best For'].split('\n').filter(b => b.trim()) : [],
								integrations: fields.Integrations ? fields.Integrations.split(',').map(i => i.trim()) : [],
								addedDate: fields['Created'] || new Date(),
							},
							body: fields.Content || '',
						};
						
						records.push(toolData);
					});
					fetchNextPage();
				});

			return records;
		},
	};
}
