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

// define name of picture to be generated
function picture_name(len) {
	name_loop += 1;

	return name_loop;
}

async function downloadImage(url, filepath) {
	const currentPath = path.resolve() + "/temp/image/" + filepath + "jpg";
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

/*
This function generate picture with prompt
*/
async function GenerateMidjourneyPicutre(
	prompt,
	channel_id,
	is_execute_in_parallel,
	delay_in_second
) {
	console.log("generation image ---------");
	if (is_execute_in_parallel == true) {
		setTimeout(async () => {
			const client = new Midjourney({
				ServerId: process.env.SERVER_ID,
				ChannelId: channel_id,
				SalaiToken: process.env.SALAI_TOKEN,
				Debug: true,
			});
			const msg = await client.Imagine(prompt);
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
			//await downloadImage(msg2.uri, picture_name());

			const msg3 = await client.Upscale({
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
			//await downloadImage(msg3.uri, picture_name());
		}, delay_in_second * 1000);
	}
}


async function GenerateMidjourneyPicutre1(
	prompt,
	channel_id,
	is_execute_in_parallel,
	delay_in_second
) {
	console.log("generation image ---------");
	if (is_execute_in_parallel == true) {
		setTimeout(async () => {
			const client = new Midjourney({
				ServerId: process.env.SERVER_ID,
				ChannelId: channel_id,
				SalaiToken: process.env.SALAI_TOKEN,
				Debug: true,
			});
			const msg = await client.Imagine(prompt);
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
			//await downloadImage(msg2.uri, picture_name());

			const msg3 = await client.Upscale({
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
			//await downloadImage(msg3.uri, picture_name());
		}, delay_in_second * 1000);
	}
}




async function executeFunctionsInParallel(result_tab, counter) {
	console.log("counter = " + counter);
	const promise1 = GenerateMidjourneyPicutre(
		prompt_json[0]["splitted_text"][counter],
				process.env.CHANNEL_ID_1,
				result_tab[counter],
				0
	);
	const promise2 = GenerateMidjourneyPicutre(
		prompt_json[0]["splitted_text"][counter + 1],
		process.env.CHANNEL_ID_2,
		result_tab[counter + 1],
		0
	);
	
		const promise3 = GenerateMidjourneyPicutre1(
			prompt_json[0]["splitted_text"][counter + 2],
				process.env.CHANNEL_ID_3,
				result_tab[counter + 2],
				5
		);
	

	return Promise.all([promise1, promise2]);
}

async function executerFonctions(result_tab, counter) {
	console.log("counter = " + counter);
	try {
		await Promise.all([
			GenerateMidjourneyPicutre(
				prompt_json[0]["splitted_text"][counter],
				process.env.CHANNEL_ID_1,
				result_tab[counter],
				0
			),
			GenerateMidjourneyPicutre(
				prompt_json[0]["splitted_text"][counter + 1],
				process.env.CHANNEL_ID_2,
				result_tab[counter + 1],
				0
			),
			GenerateMidjourneyPicutre(
				prompt_json[0]["splitted_text"][counter + 2],
				process.env.CHANNEL_ID_3,
				result_tab[counter + 2],
				5
			),
		]);
		console.log("Toutes les fonctions sont terminées.");

		// Mettez ici le code que vous souhaitez exécuter après la fin des 3 fonctions
	} catch (error) {
		console.error("Une erreur s'est produite :", error);
	}
}
//console.log(prompt_json[0]["splitted_text"].length);

async function executeLoop() {
    for (let i = 0; i < prompt_json[0]["splitted_text"].length; i += 3) {
        console.log("passe")
		await executeFunctionsInParallel(result, i).then(() => {
			console.log("Toutes les fonctions ont été exécutées en parallèle");
		});

    }
}

await executeLoop();