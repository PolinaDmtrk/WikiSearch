//Добавление нового запроса в локальное хранилище (ЛС)
export function updateLocalStorage(query, queryTime, loadTime) {
	let userQueries = [];

	//Если ЛС не пустое, то в массив userQueries записываются все данные из ЛС 
	if (localStorage.getItem('queries') !== null) {
		const parsedLS = JSON.parse(localStorage.getItem('queries'));
		$.each(parsedLS, (i,item) => {
			userQueries.push(item);
		});
	}
	//Если в ЛС содержится 10 записей, то 1ая удаляется (т.к. предусмотрено сохранение 10 запросов) 
	if (userQueries.length == 10) {
		userQueries.shift();
	}
	//Добавление нового запроса сначала в массив userQueries, а затем перезапись userQueries в ЛС
	userQueries.push({query: query, queryTime: queryTime, loadTime: loadTime});
    const arrayToJSON = JSON.stringify(userQueries);
    localStorage.setItem('queries', arrayToJSON);
}