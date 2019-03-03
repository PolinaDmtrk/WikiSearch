import {drawQueries} from './drawQueries';
import {filterQueries} from './filters';
let sortCountByQuery = 1, sortCountByQueryTime = 1, sortCountByQueryLoadTime = 1;

export function sortQueries(sortParam) {
	let queries = [];
	const tdQuery = document.getElementsByClassName('query');
	const tdQueryTime = document.getElementsByClassName('queryTime');
	const tdQueryLoadTime = document.getElementsByClassName('queryLoadTime');

	$('#wiki-queries tbody tr').each((i,item) => {
		queries.push({query: tdQuery[i].textContent, queryTime: tdQueryTime[i].textContent, loadTime: tdQueryLoadTime[i].textContent});
	});

	if (sortParam == 'byQuery') {
		if (sortCountByQuery != 1) {
			queries.reverse();
		}
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
	drawQueries(queries);

	const input = document.getElementById('filterQuery');
	const input2 = document.getElementById('filterQueryTime');
	const input3 = document.getElementById('filterQueryLoadTime');
	if (input.value !== '') {
		filterQueries('byQuery');
	}
	if (input2.value !== '') {
		filterQueries('byQueryTime');
	}
	if (input3.value !== '') {
		filterQueries('byQueryLoadTime');
	}
}