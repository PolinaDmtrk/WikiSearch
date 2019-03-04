import {getWikiData} from './getWikiData';
import {drawQueries} from './drawQueries';
import {sortQueries} from './sortQueries';
import {drawStatistics} from './drawStatistics';
import {filterQueries} from './filters';
import {tests} from './tests';

const wikiItems = document.getElementById('wiki-items');
const wikiQueries = document.getElementById('wiki-queries');
const wikiData = document.getElementById('wiki-data');
const wikiStatistics = document.getElementById('wiki-statistics');

$(document).ready ( () => {

	//Добавление стилей определенной темы
	let head = document.head;
	let link = document.createElement('link');
	link.rel = 'stylesheet';

	//Если ранее была выбрана тема 'dark', то устанавливаются соответствующие стили
	if (localStorage.getItem('themeStyle') === 'dark') {
		link.href = '../css/dark.css';
	}
	//По умолчанию устанавливается тема 'light'
	else {
		link.href = '../css/light.css';
	}
	head.appendChild(link);

	//При нажатии на кнопку "Найти" выполняется запрос в Википедию и отображение результатов
	$('#search-form').submit( (event) => {
		event.preventDefault();

		getWikiData();

		wikiItems.style.display = 'block';
		wikiQueries.style.display = 'none';
		wikiData.style.display = 'block';
		wikiStatistics.style.display = 'none';
	});

	//При нажатии на кнопку "Получить старые запросы" отрисовывается таблица со старыми запросами
	$('#getOldQueries').on('click', () => {
		const userQueries = JSON.parse(localStorage.getItem('queries'));
		drawQueries(userQueries);

		wikiItems.style.display = 'none';
		wikiQueries.style.display = 'block';
		wikiData.style.display = 'none';
		wikiStatistics.style.display = 'none';
    });

	//Сортировка таблицы со старыми запросами при нажатии на кнопки "Sort"
	$('#sortQueries').on('click', () => {
		sortQueries('byQuery');
	});
	$('#sortQueriesTime').on('click', () => {
		sortQueries('byQueryTime');
	});
	$('#sortQueriesLoadTime').on('click', () => {
		sortQueries('byQueryLoadTime');
	});
		
	//Фильтрация таблицы со старыми запросами
	$('.filter').on('input', function () {
	    filterQueries($(this).parents('table'));
	});

	//Графическое отображение времени выполнения запросов 
	$('#getStatistics').on('click', () => {
	
		drawStatistics();

		wikiItems.style.display = 'none';
		wikiQueries.style.display = 'none';
		wikiData.style.display = 'none';
		wikiStatistics.style.display = 'flex';
	});

	//Изменение темы стилей по нажатию на кнопку "Сменить тему"
	$('#switchStyle').on('click', () => {
		//Информация о выбранной теме сохраняется в локальном хранилище
		if (localStorage.getItem('themeStyle') == 'light') {
			link.href = '../css/dark.css';
			localStorage.setItem('themeStyle', 'dark');
		}
		else {
			link.href = '../css/light.css';
			localStorage.setItem('themeStyle', 'light');
		}
	});
	//Выполнение тестов
	tests();
})


