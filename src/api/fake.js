import { idGenerator, sleep } from "../utils/common";

export default async function fetchContacts() {
	const contacts = [
		{
			id: idGenerator(),
			name: "David Mendoza",
			phone: 3163107717,
			email: "gabrieldavid_98@hotmail.com"
		},
		{
			id: idGenerator(),
			name: "Pepito Perez",
			phone: 3115238951,
			email: "pepito@hotmail.com"
		},
		{
			id: idGenerator(),
			name: "Pepita Perez",
			phone: 3125689789,
			email: "pepita@hotmail.com"
		}
	];

	await sleep(1000);
	return contacts;
}