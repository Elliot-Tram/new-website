export function airtableLoader({ apiKey, baseId, tableName }) {
	return {
		name: 'airtable-loader',
		async load() {
			const records = [];
			let offset = null;

			// Boucle pour récupérer toutes les pages
			do {
				const url = new URL(`https://api.airtable.com/v0/${baseId}/${tableName}`);
				if (offset) {
					url.searchParams.set('offset', offset);
				}

				const response = await fetch(url, {
					headers: {
						'Authorization': `Bearer ${apiKey}`,
						'Content-Type': 'application/json',
					},
				});

				if (!response.ok) {
					const error = await response.json();
					throw new Error(`Airtable API error: ${error.error?.message || response.statusText}`);
				}

				const data = await response.json();

				// Convertir chaque record
				data.records.forEach((record) => {
					const fields = record.fields;
					
					const toolData = {
						id: fields.Slug || fields.Name?.toLowerCase().replace(/\s+/g, '-'),
						data: {
							name: fields.Name || '',
							tagline: fields.Tagline || '',
							description: fields.Description || '',
							logo: fields['Logo URL'] || '',
							category: fields.Category || 'CRM',
							subcategories: Array.isArray(fields.Subcategories) ? fields.Subcategories : [],
							pricing: fields.Pricing || 'Paid',
							priceRange: fields['Price Range'] || '$$',
							startingPrice: fields['Starting Price'] || '',
							rating: fields.Rating || 0,
							affiliateLink: fields['Affiliate Link'] || '',
							website: fields.Website || '',
							featured: fields.Featured || false,
							pros: (fields.Pros && typeof fields.Pros === 'string') ? fields.Pros.split('\n').filter(p => p.trim()) : [],
							cons: (fields.Cons && typeof fields.Cons === 'string') ? fields.Cons.split('\n').filter(c => c.trim()) : [],
							bestFor: (fields['Best For'] && typeof fields['Best For'] === 'string') ? fields['Best For'].split('\n').filter(b => b.trim()) : [],
							integrations: (fields.Integrations && typeof fields.Integrations === 'string') ? fields.Integrations.split(',').map(i => i.trim()) : [],
							addedDate: fields['Created'] || new Date(),
						},
						body: fields.Content || '',
					};
					
					records.push(toolData);
				});

				offset = data.offset;
			} while (offset);

			return records;
		},
	};
}
