//Отрисовка графического отображения времени выполнения запроса
export function drawStatistics() {
	$('#wiki-statistics').empty();

	const queries = JSON.parse(localStorage.getItem('queries'));
	$.each(queries, (i,item) => {
		const div = document.createElement("div");
		div.style.height = `${item.queryLoadTime}px`;
		div.textContent = `${item.query} - ${item.queryLoadTime}`;
		$('#wiki-statistics').append($(div));
	});
}