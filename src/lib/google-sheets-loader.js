export function googleSheetsLoader({ spreadsheetId, gid = 0, publishedUrl }) {
  console.log('🔍 Google Sheets CSV Loader Config:');
  console.log('  - Spreadsheet ID:', spreadsheetId || '❌ MISSING');
  console.log('  - GID (Sheet ID):', gid);
  console.log('  - Published URL:', publishedUrl || 'Not provided');

  return {
    name: 'google-sheets-csv-loader',
    async load() {
      if (!spreadsheetId && !publishedUrl) {
        console.error('❌ Missing Google Sheets spreadsheet ID or published URL');
        return [];
      }

      try {
        // Essayer d'abord avec l'URL publiée si fournie
        let csvUrl;
        if (publishedUrl) {
          csvUrl = publishedUrl;
        } else {
          // Sinon utiliser l'export direct
          csvUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${gid}`;
        }
        
        console.log(`📡 Fetching CSV from: ${csvUrl}`);

        const response = await fetch(csvUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const csvText = await response.text();
        const lines = csvText.split('\n').filter(line => line.trim());
        
        if (lines.length === 0) {
          console.log('⚠️ No data found in sheet');
          return [];
        }

        // Parser CSV simple (gère les guillemets)
        function parseCSVLine(line) {
          const values = [];
          let current = '';
          let inQuotes = false;

          for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              values.push(current.trim());
              current = '';
            } else {
              current += char;
            }
          }
          values.push(current.trim());
          return values;
        }

        // Première ligne = headers
        const headers = parseCSVLine(lines[0]);
        const tools = [];

        console.log('📋 Headers détectés:', headers);

        // Convertir chaque ligne en objet
        for (let i = 1; i < lines.length; i++) {
          const row = parseCSVLine(lines[i]);
          
          if (row.length < 2 || !row[0]) continue; // Skip empty rows
          
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
        console.error('❌ Google Sheets CSV Error:', error.message);
        return [];
      }
    },
  };
}
