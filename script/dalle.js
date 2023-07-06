import axios from 'axios';
import { OpenAIApi, Configuration } from 'openai';
import {sheet} from './sheet.js'
import fs from 'fs';
console.log(process.env.OPENAI_API_KEY);
async function genererImageDALLE(tailleImage, prompt) {
  try {

    const donnees ={
        "prompt": "je suis alergique au fraise francaise et toi",
        "n": 1,
        "size": "1024x1024"
      };
    const reponse = await axios.post('https://api.openai.com/v1/images/generations',donnees, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // Remplacez par votre clé API ChatGPT
          }
        });

    return reponse.data["data"][0]["url"];
  } catch (erreur) {
    console.error('Erreur lors de la requête à l\'API DALL·E:', erreur);
    throw erreur;
  }
}

// Exemple d'utilisation
var url  = await   genererImageDALLE()
console.log(url)


async function downloadImage(url, filename) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });

  fs.writeFile(filename, response.data, (err) => {
    if (err) throw err;
    console.log('Image downloaded successfully!');
  });
}



downloadImage(url, 'temp/image/image2.jpg');