export function updateLocalStorage(query, queryTime, loadTime) {
	let userQueries = [];

	if (localStorage.getItem('queries') !== null) {
		const parsedLS = JSON.parse(localStorage.getItem('queries'));
		$.each(parsedLS, (i,item) => {
			userQueries.push(item);
		});
	}
	if (userQueries.length == 10) {
		userQueries.shift();
	}
	userQueries.push({query: query, queryTime: queryTime, loadTime: loadTime});
    const arrayToJSON = JSON.stringify(userQueries);
    localStorage.setItem('queries', arrayToJSON);
}