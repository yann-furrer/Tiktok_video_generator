import "dotenv/config";
import lib from "midjourney";
import async from "async";
import prompt_json from "./temp/subtitle/data.json" assert { type: "json" };
import fs from "fs";
import axios from "axios";
import path from "path";
import { count } from "console";
import { on } from "events";

const { Midjourney } = lib;



var name_loop = -1;

var midjourney_job = 3;
var ln = prompt_json[0]["splitted_text"].length;

var quo = ~~(ln / midjourney_job);
var rem = ln % midjourney_job;
console.log("Quotient = ", quo, "Remainder = ", rem);

var result = Array(quo * 3 + rem).fill(1);

function picture_name(len) {
	name_loop += 1;

	return name_loop;
}



function return_rem(rem) {
	if (rem == 2) {
		return 1;
	} else if (rem == 1) {
		return 2;
	} else {
		return 0;
	}
}

result.push(...Array(return_rem(rem)).fill(0));
console.log("result = ", result);



//function to download image

async function downloadImage(url, filepath) {
	const currentPath = path.resolve() + "/temp/image/" + filepath + ".png";
	console.log(currentPath);
	const response = await axios({
		url,
		method: "GET",
		responseType: "stream",
	});
	return new Promise((resolve, reject) => {
		response.data
			.pipe(fs.createWriteStream(currentPath))
			.on("error", reject)
			.once("close", () => resolve(currentPath));
	});
}




//fonction to generate picture

async function GenerateMidjourneyPicutre(
prompt,
	channel_id,
	is_execute_in_parallel,
	delay_in_second
) {
    if (is_execute_in_parallel == true) {
		return new Promise((resolve) => {
		console.log("generation image ---------");
		setTimeout(async () => {
			let picture_name1 = picture_name();
			let picture_name2 = picture_name();
			console.log("prompt = ", prompt);
			const client = new Midjourney({
				ServerId: process.env.SERVER_ID,
				ChannelId: channel_id,
				SalaiToken: process.env.SALAI_TOKEN,
				Debug: true,
			});
			const msg = await client.Imagine(prompt +"--ar 2:3 --c 25");
			console.log({ msg });
			if (!msg) {
				console.log("no message");
				return;
			}

			//image_array.push(msg3.uri);

			const msg2 = await client.Upscale({
				//index of the picture to upscale
				index: 2,
				msgId: msg.id,
				hash: msg.hash,
				flags: msg.flags,
				content: msg.content,
				loading: (uri, progress) => {
					//console.log("loading", uri, "progress", progress);
					//	console.log("IIIIIIIII ="+loop_iter)
				},
			});
			await downloadImage(msg2.uri, picture_name1);

			const msg3 = await client.Upscale({
				//index of the picture to upscale
				index: 3,
				msgId: msg.id,
				hash: msg.hash,
				flags: msg.flags,
				content: msg.content,
				loading: (uri, progress) => {
					//console.log("loading", uri, "progress", progress);
					//	console.log("IIIIIIIII ="+loop_iter)
				},
			});
			await downloadImage(msg3.uri, picture_name2);
			
			resolve();
		}, delay_in_second * 1000);
		
		//process.exit(0);
	});
	}
}








async function executerFonctions(result_tab, counter) {
	
  
	// Exécution de la fonction trois fois en parallèle
	const promises = [GenerateMidjourneyPicutre(
		prompt_json[0]["splitted_text"][counter],
		process.env.CHANNEL_ID_1,
		result_tab[counter],
		0
	), GenerateMidjourneyPicutre(
		prompt_json[0]["splitted_text"][counter + 1],
		process.env.CHANNEL_ID_2,
		result_tab[counter+1],
		3
	), GenerateMidjourneyPicutre(
		prompt_json[0]["splitted_text"][counter + 2],
		process.env.CHANNEL_ID_3,
		result_tab[counter + 2],
		6
	)];
  
	// Attente de la fin de toutes les exécutions
	await Promise.all(promises);
  
	console.log("Toutes les exécutions sont terminées");
	
  }
  

  



















  //erreur vietn du set timeout qui pête l'asyncrone


  async function loopWithPromise() {
	for (let i = 0; i <  result.length; i+=3) {
	  console.log("Itération :", i);
	  await executerFonctions(result, i); // Attendre que la promesse soit résolue avant de passer à l'itération suivante
	}
	console.log("Boucle terminée !");
  }
  
  loopWithPromise();