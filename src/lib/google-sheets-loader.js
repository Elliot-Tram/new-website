import { google } from 'googleapis';

export function googleSheetsLoader({ spreadsheetId, range }) {
  console.log('🔍 Google Sheets Loader Config:');
  console.log('  - Spreadsheet ID:', spreadsheetId || '❌ MISSING');
  console.log('  - Range:', range || '❌ MISSING');

  return {
    name: 'google-sheets-loader',
    async load() {
      if (!spreadsheetId || !range) {
        console.error('❌ Missing Google Sheets config');
        return [];
      }

      try {
        console.log(`📡 Fetching from Google Sheets: ${spreadsheetId}...`);

        // Authentification publique (pour sheets publiques)
        const sheets = google.sheets({ version: 'v4' });
        
        const response = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range,
          key: process.env.GOOGLE_SHEETS_API_KEY, // Optionnel si le sheet est public
        });

        const rows = response.data.values;
        
        if (!rows || rows.length === 0) {
          console.log('⚠️ No data found in sheet');
          return [];
        }

        // Première ligne = headers
        const headers = rows[0];
        const tools = [];

        // Convertir chaque ligne en objet
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          const fields = {};

          headers.forEach((header, index) => {
            fields[header] = row[index] || '';
          });

          // Créer l'objet tool
          const tool = {
            id: fields.Slug || fields.Name?.toLowerCase().replace(/\s+/g, '-') || `tool-${i}`,
            data: {
              name: fields.Name || '',
              tagline: fields.Tagline || '',
              description: fields.Description || '',
              logo: fields['Logo URL'] || '',
              category: fields.Category || 'CRM',
              subcategories: fields.Subcategories ? fields.Subcategories.split(',').map(s => s.trim()) : [],
              pricing: fields.Pricing || 'Paid',
              priceRange: fields['Price Range'] || '$$',
              startingPrice: fields['Starting Price'] || '',
              rating: parseFloat(fields.Rating) || 0,
              affiliateLink: fields['Affiliate Link'] || '',
              website: fields.Website || '',
              featured: fields.Featured === 'TRUE' || fields.Featured === 'true' || fields.Featured === '1',
              pros: fields.Pros ? fields.Pros.split('\n').filter(p => p.trim()) : [],
              cons: fields.Cons ? fields.Cons.split('\n').filter(c => c.trim()) : [],
              bestFor: fields['Best For'] ? fields['Best For'].split('\n').filter(b => b.trim()) : [],
              integrations: fields.Integrations ? fields.Integrations.split(',').map(i => i.trim()) : [],
              addedDate: fields.Created ? new Date(fields.Created) : new Date(),
            },
            body: fields.Content || '',
          };

          tools.push(tool);
        }

        console.log(`✅ Loaded ${tools.length} tools from Google Sheets`);
        return tools;

      } catch (error) {
        console.error('❌ Google Sheets API Error:', error.message);
        return [];
      }
    },
  };
}
