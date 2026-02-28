import Airtable from 'airtable';
import dotenv from 'dotenv';

dotenv.config();

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

const tools = [
	{
		fields: {
			Name: 'HubSpot',
			Tagline: 'Le CRM tout-en-un pour le marketing, les ventes et le service client',
			Description: 'HubSpot est une plateforme complète qui combine CRM, marketing automation, ventes et service client. Parfait pour les entreprises qui veulent centraliser toutes leurs opérations GTM en un seul endroit.',
			'Logo URL': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400',
			Category: 'CRM',
			Subcategories: ['Email Marketing', 'Sales', 'Automation'],
			Pricing: 'Freemium',
			'Price Range': '$$$',
			'Starting Price': 'Gratuit (limité) - à partir de 45€/mois',
			Rating: 4.5,
			'Affiliate Link': 'https://www.hubspot.com',
			Website: 'https://www.hubspot.com',
			Featured: true,
			Pros: `- Suite complète tout-en-un
- Version gratuite très généreuse
- Interface intuitive et moderne
- Excellent pour le content marketing
- Intégrations natives nombreuses`,
			Cons: `- Peut devenir cher rapidement
- Courbe d'apprentissage pour les fonctionnalités avancées
- Certaines features locked dans les tiers supérieurs`,
			'Best For': `- PME et startups en croissance
- Équipes marketing & sales alignées
- Content marketing intensif
- Inbound marketing strategy`,
			Integrations: 'Salesforce, Slack, Zapier, Gmail, WordPress',
			Content: `## Pourquoi HubSpot ?

HubSpot s'est imposé comme **LA** référence en matière de CRM et marketing automation pour les entreprises modernes. Sa philosophie "inbound marketing" et son approche tout-en-un en font un choix évident pour les équipes qui veulent éviter la complexité de multiples outils.

### Fonctionnalités Clés

**CRM Gratuit**
Le CRM HubSpot est 100% gratuit et illimité. Vous pouvez gérer vos contacts, deals, et pipeline de vente sans payer un centime.

**Marketing Hub**
- Email marketing avec A/B testing
- Landing pages et formulaires
- Marketing automation
- Lead scoring

**Sales Hub**
- Email tracking
- Meeting scheduler
- Pipeline management
- Sales automation

### Tarification

- **Gratuit** : CRM basique
- **Starter** : ~45€/mois
- **Professional** : ~800€/mois
- **Enterprise** : ~3200€/mois`
		}
	},
	{
		fields: {
			Name: 'Notion',
			Tagline: "L'espace de travail tout-en-un pour vos notes, docs et projets",
			Description: "Notion est un outil de productivité ultra-flexible qui combine notes, bases de données, wikis et gestion de projet. Parfait pour centraliser toute la connaissance de votre équipe.",
			'Logo URL': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
			Category: 'Project Management',
			Subcategories: ['Documentation', 'Collaboration'],
			Pricing: 'Freemium',
			'Price Range': '$$',
			'Starting Price': 'Gratuit - à partir de 8€/mois',
			Rating: 4.7,
			'Affiliate Link': 'https://www.notion.so',
			Website: 'https://www.notion.so',
			Featured: true,
			Pros: `- Extrêmement flexible et personnalisable
- Interface magnifique et intuitive
- Templates communautaires riches
- Collaboration temps réel
- Version gratuite généreuse`,
			Cons: `- Peut être lent avec beaucoup de données
- Courbe d'apprentissage pour exploiter tout le potentiel
- Pas de fonctionnalités offline robustes`,
			'Best For': `- Équipes créatives et tech
- Documentation produit et wiki interne
- Gestion de projet agile
- Content planning`,
			Integrations: 'Slack, Google Drive, Figma, GitHub, Zapier',
			Content: `## Pourquoi Notion ?

Notion a révolutionné la façon dont les équipes modernes organisent leur travail. Son approche "blocs" ultra-flexible permet de créer exactement ce dont vous avez besoin.

### Fonctionnalités Clés

**Bases de Données**
Créez des bases de données relationnelles avec vues kanban, table, calendrier, galerie.

**Wikis & Documentation**
Centralisez toute votre connaissance d'entreprise avec une recherche puissante.

**Collaboration**
Commentaires, mentions, partage granulaire en temps réel.

### Tarification

- **Gratuit** : Illimité pour usage personnel
- **Plus** : 8€/mois
- **Business** : 15€/mois
- **Enterprise** : Sur devis`
		}
	},
	{
		fields: {
			Name: 'Mailchimp',
			Tagline: "Plateforme d'email marketing tout-en-un",
			Description: "Mailchimp est la référence en email marketing pour les PME. Interface simple, automatisations puissantes, et analytics détaillés pour optimiser vos campagnes.",
			'Logo URL': 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400',
			Category: 'Email Marketing',
			Subcategories: ['Automation', 'Analytics'],
			Pricing: 'Freemium',
			'Price Range': '$$',
			'Starting Price': 'Gratuit - à partir de 13€/mois',
			Rating: 4.3,
			'Affiliate Link': 'https://mailchimp.com',
			Website: 'https://mailchimp.com',
			Featured: false,
			Pros: `- Interface intuitive drag & drop
- Plan gratuit jusqu'à 500 contacts
- Templates d'emails magnifiques
- Analytics et rapports détaillés
- Intégrations e-commerce`,
			Cons: `- Prix augmente vite avec la liste
- Deliverability parfois moyenne
- Support client limité sur plan gratuit`,
			'Best For': `- E-commerce et boutiques en ligne
- Newsletters et content marketing
- PME et startups
- Campagnes marketing simples`,
			Integrations: 'Shopify, WooCommerce, WordPress, Facebook, Instagram',
			Content: `## Pourquoi Mailchimp ?

Mailchimp est LE nom que tout le monde connaît en email marketing. Plus de 20 ans d'existence.

### Fonctionnalités Clés

**Email Builder**
Éditeur drag & drop avec des templates magnifiques.

**Automation**
Workflows automatisés : welcome series, abandoned cart, win-back campaigns.

**Segmentation**
Ciblez vos audiences avec précision.

### Tarification

- **Gratuit** : Jusqu'à 500 contacts
- **Essentials** : 13€/mois
- **Standard** : 20€/mois
- **Premium** : 350€/mois`
		}
	}
];

async function populateAirtable() {
	console.log('🚀 Création des outils dans Airtable...\n');

	for (const tool of tools) {
		try {
			const record = await base('Tools').create([tool]);
			console.log(`✅ ${tool.fields.Name} créé avec succès!`);
		} catch (error) {
			console.error(`❌ Erreur pour ${tool.fields.Name}:`, error.message);
		}
	}

	console.log('\n✨ Migration terminée!');
}

populateAirtable();
