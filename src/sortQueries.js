import {drawQueries} from './drawQueries';
import {filterQueries} from './filters';
let sortCountByQuery = 1, sortCountByQueryTime = 1, sortCountByQueryLoadTime = 1;

//Сортировка старых запросов в таблице
export function sortQueries(sortParam) {
	let queries = [];
	const tdQuery = document.getElementsByClassName('query');
	const tdQueryTime = document.getElementsByClassName('queryTime');
	const tdQueryLoadTime = document.getElementsByClassName('queryLoadTime');

	$('#wiki-queries tbody tr').each((i,item) => {
		queries.push({query: tdQuery[i].textContent, queryTime: tdQueryTime[i].textContent, loadTime: tdQueryLoadTime[i].textContent});
	});

	//Определение, по какому столбцу делать сортировку
	if (sortParam == 'byQuery') {
		//Если ранее уже была выполнена сортировка, то столбцы будут отображены в обратном порядке
		if (sortCountByQuery != 1) {
			queries.reverse();
		}
		//Если сортировки ранее не было, то будет выполнено полное сравнение всех параметров
		else {
			queries.sort((a,b) => {
		    	return a.query.localeCompare(b.query);
			})
		}
		sortCountByQuery++; sortCountByQueryTime = 1; sortCountByQueryLoadTime = 1;
	}
	if (sortParam == 'byQueryTime') {
		if (sortCountByQueryTime != 1) {
			queries.reverse();
		}
		else {
			queries.sort((a,b) => {
		    	return a.queryTime.localeCompare(b.queryTime);
			})
		}
		sortCountByQuery = 1; sortCountByQueryTime++; sortCountByQueryLoadTime = 1;
	}
	if (sortParam == 'byQueryLoadTime') {
		if (sortCountByQueryLoadTime != 1) {
			queries.reverse();
		}
		else {
			queries.sort((a,b) => {
		    	return a.loadTime - b.loadTime;
			})
		}
		sortCountByQuery = 1; sortCountByQueryTime = 1; sortCountByQueryLoadTime++;
	}
	//Перерисовка новой отсортированной таблицы
	drawQueries(queries);

	//Если таблица была отфильтрованна до сортировки, то фильтрация повторяется после перерисовки
	const filters = $('#wiki-queries table').find('.filter');
	if (filters.value !== '') {
		filterQueries($('#wiki-queries table'));
	}
}