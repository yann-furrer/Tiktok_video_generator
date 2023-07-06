import "dotenv/config";
import lib from "midjourney";
import async from "async";
import prompt_json from "./temp/subtitle/data.json" assert { type: "json" };
import fs from "fs";
import axios from "axios";
import path from "path";
import { count } from "console";
import { on } from "events";
const start = Date.now();

async function date() {
	console.log(Date(start));
	console.log("end = ", Date(Date.now()));
}

var image_array = [];

async function downloadImage(url, filepath) {
	const currentPath = path.resolve() + "/temp/image/" + filepath;
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

const { Midjourney } = lib;
/**
 *
 * a simple example of how to use the Upscale command
 * ```
 * npx tsx example/upscale.ts
 * ```
 */

async function main(prompt, channel_id, is_execute_in_parallel) {
	console.log("generation image ---------");
	if (is_execute_in_parallel == true) {
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

		image_array.push(msg2.uri);

		const msg3 = await client.Upscale({
			//index of the picture to upscale
			index: 3,
			msgId: msg.id,
			hash: msg.hash,
			flags: msg.flags,
			content: msg.content,
			loading: (uri, progress) => {
				image_array.push(uri);
				//	console.log("loading", uri, "progress", progress);

				console.log("IIIIIIIII =" + loop_iter);
			},
		});

		image_array.push(msg3.uri);

		//await downloadImage(msg3.uri, (loop_iter+1)+".jpg")
		console.log("-----------------------");
		console.log(image_array);
		console.log("-----------------------");
	}
}

//parralel execution function

function executeFunctionsInParallel(result, i) {
	const promise1 = main(
		prompt_json[0]["splitted_text"][i],
		process.env.CHANNEL_ID_1,
		result[i]
	);
	const promise2 = main(
		prompt_json[0]["splitted_text"][i + 1],
		process.env.CHANNEL_ID_2,
		result[i + 1]
	);
	
		const promise3 = main(
			prompt_json[0]["splitted_text"][i + 2],
			process.env.CHANNEL_ID_3,
			result[i + 1]
		);
	

	return Promise.all([promise1, promise2]);
}

async function own_image() {
	for (var i = 0; i < image_array.length; i++) {
		await downloadImage(image_array[i], i + ".jpg");
	}
}

/*
  executeFunctionsInParallel().then(() => {
	console.log("Toutes les fonctions ont été exécutées en parallèle");
  });
*/

//determine the number of jobs to be executed
var midjourney_job = 3;
var ln = prompt_json[0]["splitted_text"].length;
var quo = ~~(ln / midjourney_job);
var rem = ln % midjourney_job;
console.log("Quotient = ", quo, "Remainder = ", rem);

var result = Array(quo * 3 + rem).fill(1);

function return_rem(rem) {
	if (rem == 2) {
		return 1;
	} else {
		return 0;
	}
}

result.push(...Array(return_rem(rem)).fill(0));
console.log("result = ", result);

for (var i = 0; i < ln; i += 3) {
	console.log("_____________tour de la boucle______________");

	await executeFunctionsInParallel(result, i).then(() => {
		console.log("Toutes les fonctions ont été exécutées en parallèle");
	});
}

await own_image();

await date();
