import {sheet} from './sheet.js'
sheet()
import { OpenAIApi, Configuration } from 'openai';
import axios from 'axios';
//console.log(process.env.OPENAI_API_KEY);

//get cureent file path
import path from 'path';
import { get } from 'stack-trace';
function getExecutingFilePath() {
	
	
	const trace = get();
	const callerFile = trace[1].getFileName();
	
	return path.resolve(callerFile);
  }

// Fonction pour effectuer une requête à l'API ChatGPT
async function faireRequeteChatGPT(messageUtilisateur, messageUtilisateur1) {
  try {
    // Préparer les données de la requête
    const donnees = {
      messages: [
       { role: 'system', content: 'Vous etes un utilisateur' },
        { role: 'system', content: messageUtilisateur },
       
      ], 
      "model": "gpt-3.5-turbo"  // Remplacez "gpt-3.5-turbo" par le modèle souhaité
    };

    // Effectuer la requête POST à l'API ChatGPT
    const reponse = await axios.post('https://api.openai.com/v1/chat/completions', donnees, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.TEST}` // Remplacez par votre clé API ChatGPT
      }
    });

    // Récupérer la réponse du modèle
    const resultat = reponse.data.choices[0].message.content;

    // Retourner la réponse du modèle
    return resultat;
  } catch (erreur) {
    console.error('Erreur lors de la requête à l\'API ChatGPT:', erreur);
    throw erreur;
  }
}

// Exemple d'utilisation
//onst messageUtilisateur = 'écris moi un texte	pour une voix off sur le thème suivant '+sheet();
const messageUtilisateur = "écris moi un texte	pour une voix off sur le thème suivant "+sheet();

faireRequeteChatGPT(messageUtilisateur, )
  .then(reponseModele => {
    console.log('Réponse du modèle:', reponseModele);
  })
  .catch(erreur => {
    console.error('Erreur:', erreur);
  });
