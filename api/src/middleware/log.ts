import { Request, Response } from 'express';
import { appendFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

/**
 * Logging middleware.
 * Logs every request made to the server. 
 */
export default function(req: Request, _res: Response, next: Function): void {
	let str = '';
	str += `[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}] `
	str += `[${req.method} ${req.path}] `;
	str += `Incoming request from ${req.ip}`;
	str += '\n  |>Query'
	for (const [key, value] of Object.entries(req.query)) {
		str += `\n  | ${key}: ${value}`;
	}
	str += '\n  |>Headers'
	for (const [key, value] of Object.entries(req.headers)) {
		str += `\n  | ${key}: ${value}`;
	}
	str += '\n  |>Body'
	for (const [key, value] of Object.entries(req.body)) {
		str += `\n  | ${key}: ${value}`;
	}
	console.log(str);
	const logPath = join(__dirname, '..', '..', 'logs')
	if (!existsSync(logPath))
		mkdirSync(logPath);
	appendFileSync(join(logPath, fileName()), str + '\n', { encoding: 'utf-8' });
	next();
}

/**
 * Generates a log file name from current date.
 */
function fileName(): string {
	const d = new Date();
	const z = n => n > 9 ? n : `0${n}`;
	return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}.log`;
}