# 📊 Airtable Integration Guide

## 🎯 Configuration Airtable

Votre site est maintenant connecté à Airtable ! Les outils sont chargés directement depuis votre base Airtable au moment du build.

### 📋 Structure de la Table "Tools"

Créez ces champs dans votre table Airtable (dans l'ordre) :

| Nom du champ | Type | Configuration |
|--------------|------|---------------|
| **Name** | Single line text | Obligatoire |
| **Tagline** | Long text | Obligatoire - Description courte |
| **Description** | Long text | Obligatoire - Description complète |
| **Logo URL** | URL | URL de l'image du logo |
| **Category** | Single select | Options : CRM, Email Marketing, Analytics, SEO, Social Media, Content Marketing, Automation, Customer Support, Sales, Project Management |
| **Subcategories** | Multiple select | Même liste que Category |
| **Pricing** | Single select | Options : Free, Freemium, Paid |
| **Price Range** | Single select | Options : $, $$, $$$, $$$$ |
| **Starting Price** | Single line text | Ex: "Gratuit - à partir de 20€/mois" |
| **Rating** | Number | Entre 0 et 5 (décimales autorisées) |
| **Affiliate Link** | URL | Lien affilié trackable |
| **Website** | URL | Site officiel de l'outil |
| **Featured** | Checkbox | Coché = affiché sur la home |
| **Pros** | Long text | Un pro par ligne (avec tiret au début) |
| **Cons** | Long text | Un con par ligne (avec tiret au début) |
| **Best For** | Long text | Un use case par ligne (avec tiret au début) |
| **Integrations** | Long text | Noms séparés par des virgules |
| **Content** | Long text | Contenu Markdown complet de la page |
| **Slug** | Formula | `LOWER(SUBSTITUTE(Name, " ", "-"))` |

### 📝 Exemple de Ligne (HubSpot)

```
Name: HubSpot
Tagline: Le CRM tout-en-un pour le marketing, les ventes et le service client
Description: HubSpot est une plateforme complète qui combine CRM...
Logo URL: https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400
Category: CRM
Subcategories: Email Marketing, Sales, Automation
Pricing: Freemium
Price Range: $$$
Starting Price: Gratuit (limité) - à partir de 45€/mois
Rating: 4.5
Affiliate Link: https://www.hubspot.com
Website: https://www.hubspot.com
Featured: ✓
Pros:
- Suite complète tout-en-un
- Version gratuite très généreuse
- Interface intuitive et moderne

Cons:
- Peut devenir cher rapidement
- Courbe d'apprentissage

Best For:
- PME et startups en croissance
- Équipes marketing & sales alignées

Integrations: Salesforce, Slack, Zapier, Gmail, WordPress

Content:
## Pourquoi HubSpot ?

HubSpot s'est imposé comme **LA** référence...

[Contenu Markdown complet]
```

## 🔄 Workflow de Mise à Jour

### Option 1 : Rebuild Manuel (Recommandé pour débuter)
1. Modifiez votre table Airtable
2. Allez sur Vercel → votre projet → Deployments
3. Cliquez sur les 3 points → "Redeploy"
4. Attendez 1-2 minutes
5. ✅ Site à jour !

### Option 2 : Rebuild Automatique (À configurer)
1. Créez un webhook Vercel :
   - Vercel → Settings → Git → Deploy Hooks
   - Nom : "Airtable Update"
   - Branche : main
   - Copier l'URL du webhook

2. Dans Airtable :
   - Extensions → Automations
   - Trigger : "When record updated"
   - Action : "Send request to URL"
   - URL : Votre webhook Vercel (POST)

3. Maintenant chaque modification dans Airtable = rebuild auto ! 🎉

## 🎨 Où Trouver des Logos ?

Sources d'images gratuites pour vos logos :
- **Unsplash** : https://unsplash.com (photos génériques)
- **Clearbit Logo API** : `https://logo.clearbit.com/{domain}` (ex: hubspot.com)
- **Google S2** : Rechercher "[Nom outil] logo png" → Images
- **Site officiel** : Press kit / Media resources

## ✅ Checklist Premier Outil

- [ ] Nom de l'outil
- [ ] Tagline accrocheur
- [ ] Description complète
- [ ] URL du logo (testez-la dans un navigateur !)
- [ ] Catégorie sélectionnée
- [ ] Pricing défini
- [ ] Rating entre 0-5
- [ ] Lien affilié
- [ ] Site web officiel
- [ ] Featured coché si vous voulez qu'il apparaisse sur la home
- [ ] Au moins 3 pros
- [ ] Au moins 2 cons
- [ ] 2-3 use cases "Best For"
- [ ] Quelques intégrations populaires
- [ ] Contenu Markdown (min 200 mots)

## 🚀 Pour Ajouter des Outils en Masse

1. Préparez un Google Sheet avec toutes les infos
2. Copiez-collez dans Airtable (correspondance automatique des colonnes)
3. Vérifiez que tout est bon
4. Rebuild Vercel
5. 100 outils ajoutés en 5 minutes ! 🔥

## 🔧 Variables d'Environnement Vercel

Ces variables sont déjà configurées sur Vercel :
```
AIRTABLE_API_KEY=patGBSOmSG7T3hDgs...
AIRTABLE_BASE_ID=appBv75ClaRrvQSwe
AIRTABLE_TABLE_NAME=Tools
```

Si vous changez de base ou de table, mettez à jour sur :
Vercel → Settings → Environment Variables

## ❓ Troubleshooting

**Le build échoue ?**
- Vérifiez que tous les champs obligatoires sont remplis
- Vérifiez les URLs (logo, affiliate, website)
- Rating doit être entre 0 et 5

**Un outil n'apparaît pas ?**
- Vérifiez que le slug est unique
- Vérifiez que la catégorie est bien dans la liste autorisée

**Les images ne s'affichent pas ?**
- Testez l'URL du logo dans un navigateur
- Utilisez des URLs directes (pas de redirections)
- Privilégiez HTTPS

## 🎓 Tips & Astuces

1. **Featured Tools** : Maximum 3-4 outils featured pour ne pas surcharger la home
2. **Categories** : Soyez cohérent dans le nommage
3. **Ratings** : Soyez honnête, la crédibilité est importante
4. **Content** : Min 200 mots, utilisez Markdown (titres ##, listes, gras **)
5. **Pros/Cons** : Soyez équilibré, 3-5 de chaque
6. **Intégrations** : Mentionnez les plus populaires seulement

Bon travail ! 🎉
