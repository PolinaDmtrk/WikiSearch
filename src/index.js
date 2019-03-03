import {getWikiData} from './getWikiData';
import {drawQueries} from './drawQueries';
import {sortQueries} from './sortQueries';
import {drawStatistics} from './drawStatistics';
import {filterQueries} from './filters';

const wikiItems = document.getElementById('wiki-items');
const wikiQueries = document.getElementById('wiki-queries');
const wikiData = document.getElementById('wiki-data');
const wikiStatistics = document.getElementById('wiki-statistics');

$(document).ready ( () => {

	let head = document.head;
	let link = document.createElement('link');
	link.rel = 'stylesheet';

	if (localStorage.getItem('themeStyle') === 'dark') {
		link.href = '../css/dark.css';
	}
	else {
		link.href = '../css/light.css';
	}
	head.appendChild(link);

	$('#search-form').submit( (event) => {
		event.preventDefault();

		getWikiData();

		wikiItems.style.display = 'block';
		wikiQueries.style.display = 'none';
		wikiData.style.display = 'block';
		wikiStatistics.style.display = 'none';
	});

	$('#getOldQueries').on('click', () => {
		const userQueries = JSON.parse(localStorage.getItem('queries'));
		drawQueries(userQueries);

		wikiItems.style.display = 'none';
		wikiQueries.style.display = 'block';
		wikiData.style.display = 'none';
		wikiStatistics.style.display = 'none';
    });

	$('#sortQueries').on('click', () => {
		sortQueries('byQuery');
	});
	$('#sortQueriesTime').on('click', () => {
		sortQueries('byQueryTime');
	});
	$('#sortQueriesLoadTime').on('click', () => {
		sortQueries('byQueryLoadTime');
	});
	
	$('.filter').on('input', function () {
	    filterQueries($(this).parents('table'));
	});


	$('#getStatistics').on('click', () => {
	
		drawStatistics();

		wikiItems.style.display = 'none';
		wikiQueries.style.display = 'none';
		wikiData.style.display = 'none';
		wikiStatistics.style.display = 'flex';
	});

	$('#switchStyle').on('click', () => {
		if (localStorage.getItem('themeStyle') == 'light') {
			link.href = '../css/dark.css';
			localStorage.setItem('themeStyle', 'dark');
		}
		else {
			link.href = '../css/light.css';
			localStorage.setItem('themeStyle', 'light');
		}
	});
})


