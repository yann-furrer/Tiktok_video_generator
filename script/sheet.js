//import env from './.env';
import fetch from 'node-fetch';
import 'dotenv/config'

const url = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values/A1:B30?key=${process.env.SHEET_API_KEY}`;
//console.log(url);


// Faire une requête GET
const response  = await fetch(url)
  .then(response => response.json()) // Transformer la réponse en JSON
   // Récupérer les données qui nous intéressent
  .catch(error => {
    console.log(error); // Gérer les erreurs éventuelles
  });

  


function convertDate(date){
  // Séparer la date en jour, mois et année
  var elementsDate = date.split('/');
  var jour = elementsDate[0];
  var mois = elementsDate[1];
  var annee = elementsDate[2];
  
  // Créer la nouvelle date au format 'yyyy-mm-dd'
  var nouvelleDate = annee + '-' + mois + '-' + jour;

  // Créer un objet Date à partir de la nouvelle date
  date = new Date(nouvelleDate)
  date.setHours(0,0,0,0);
  date = date.getTime();
 
 

 return date;
}


function return_today_request(array_of_date) {

 
  var prompt = undefined;
  for(var i=0; i<array_of_date.length; i++){
    var today = new Date().setHours(0,0,0,0);
   
    if(today === convertDate(array_of_date[i][1])){
     
      //console.log(array_of_date[i][0]);
      prompt =  array_of_date[i][0];
    }
    var date = convertDate(array_of_date[i][1]);
   
  }
  console.log(prompt);
  return prompt;
  
  
 
}

 export function sheet(){
  return return_today_request(response.values);
}

  