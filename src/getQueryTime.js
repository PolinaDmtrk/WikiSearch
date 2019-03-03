export function getQueryTime() {
	const date = new Date();
	const day = ('0'+date.getDate()).slice(-2);
	const month = ('0'+(date.getMonth()+1)).slice(-2);
	const year = date.getFullYear();
	const hour = ('0'+date.getHours()).slice(-2);
	const minutes = ('0'+date.getMinutes()).slice(-2);

	const modifiedDate = `${day}.${month}.${year} ${hour}.${minutes}`;
	return modifiedDate;
}