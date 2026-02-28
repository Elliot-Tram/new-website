// Test du loader Airtable
import { airtableLoader } from './src/lib/airtable-loader.js';
import dotenv from 'dotenv';

dotenv.config();

console.log('🧪 Test du loader Airtable\n');

const loader = airtableLoader({
  apiKey: process.env.AIRTABLE_API_KEY,
  baseId: process.env.AIRTABLE_BASE_ID,
  tableName: process.env.AIRTABLE_TABLE_NAME,
});

try {
  const tools = await loader.load();
  console.log(`\n✅ Succès ! ${tools.length} outils récupérés`);
  console.log('\nPremier outil:');
  console.log(JSON.stringify(tools[0], null, 2));
} catch (error) {
  console.error('\n❌ Erreur:', error.message);
  console.error(error);
}
