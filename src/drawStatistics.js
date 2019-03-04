//Отрисовка графического отображения времени выполнения запроса
export function drawStatistics() {
	$('#wiki-statistics').empty();
	const queries = JSON.parse(localStorage.getItem('queries'));
	$.each(queries, (i,item) => {
		var div = document.createElement("div");
		div.style.height = `${item.loadTime}px`;
		div.textContent = `${item.query} - ${item.loadTime}`;
		$('#wiki-statistics').append($(div));
	});
}