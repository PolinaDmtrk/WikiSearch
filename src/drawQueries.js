//Отрисовка таблицы со старыми запросами
export function drawQueries(queries) {
	
	//Очищение таблицы
    $('#wiki-queries tbody').empty();
    
    //Отрисовка таблицы
    $.each(queries, (i, item) => {
    	const raw = `<tr class="${item.trClass}"><td class="query">${item.query}</td><td class="queryTime">${item.queryTime}</td><td class="queryLoadTime">${item.queryLoadTime}</td></tr>`;
    	// const raw = `<tr class="userQuery"><td class="query">${item.query}</td><td class="queryTime">${item.queryTime}</td><td class="queryLoadTime">${item.queryLoadTime}</td></tr>`;
    	$('#wiki-queries tbody').append($(raw));
    });
}