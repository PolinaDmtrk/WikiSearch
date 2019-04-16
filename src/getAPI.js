export async function getAPI(url) {
	const response = await fetch(url);
	return await response.json();
}