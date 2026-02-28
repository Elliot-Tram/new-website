# ⚙️ Configuration Vercel - Variables d'Environnement

## 🎯 À Faire MAINTENANT

Pour que votre site fonctionne avec Airtable, vous devez ajouter 3 variables d'environnement sur Vercel :

### 📝 Étapes

1. **Allez sur Vercel** : https://vercel.com/elliots-projects-385511cc/new-website/settings/environment-variables

2. **Ajoutez ces 3 variables** :

   **Variable 1 :**
   ```
   Key: AIRTABLE_API_KEY
   Value: [VOTRE_TOKEN_AIRTABLE_ICI]
   Environment: Production, Preview, Development (cocher les 3)
   ```

   **Variable 2 :**
   ```
   Key: AIRTABLE_BASE_ID
   Value: appBv75ClaRrvQSwe
   Environment: Production, Preview, Development (cocher les 3)
   ```

   **Variable 3 :**
   ```
   Key: AIRTABLE_TABLE_NAME
   Value: Tools
   Environment: Production, Preview, Development (cocher les 3)
   ```

3. **Cliquez sur "Save"** pour chaque variable

4. **Redéployez** :
   - Allez dans l'onglet "Deployments"
   - Cliquez sur les 3 points du dernier déploiement
   - Cliquez "Redeploy"

5. **Attendez 1-2 minutes**

6. ✅ Votre site charge maintenant les données depuis Airtable !

## 🔒 Sécurité

- ⚠️ NE JAMAIS committer le fichier `.env` sur GitHub
- ⚠️ Le `.env` est déjà dans `.gitignore`
- ✅ Les variables sont sécurisées sur Vercel
- ✅ Seul le build a accès aux variables

## 🧪 Test Local (Optionnel)

Si vous voulez tester en local :

1. Le fichier `.env` existe déjà avec vos credentials
2. Lancez `npm run dev`
3. Le site devrait charger les données depuis Airtable

## 🎯 Prochaines Étapes

Une fois les variables ajoutées sur Vercel :

1. Ajoutez vos outils dans Airtable
2. Suivez le guide `AIRTABLE_GUIDE.md`
3. Redéployez sur Vercel
4. Profitez ! 🚀
