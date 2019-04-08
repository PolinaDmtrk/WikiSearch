import {setThemeStyle} from './setThemeStyle';
import {changeThemeStyle} from './changeThemeStyle';
import {getWikiData} from './getWikiData';
import {drawQueries} from './drawQueries';
import {sortQueries} from './sortQueries';
import {drawStatistics} from './drawStatistics';
import {filterQueries} from './filters';
import {tests} from './tests';

const wiki = $('#wiki');

$(document).ready ( () => {

	//Установка стилей определенной темы
	const head = document.head;
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = setThemeStyle(link);
	head.appendChild(link);

	//При нажатии на кнопку "Найти" выполняется запрос в Википедию и отображение результатов
	$('.search-form').submit( (event) => {
		event.preventDefault();

		getWikiData();

		//Скрытие всех основных блоков и отображение необходимых
		$(wiki[0].children).each((i, div) => {
			$(div).css('display','none')
		});
		$('#wiki-items').css('display','block');
		$('#wiki-data').css('display','block');
	});

	//При нажатии на кнопку "Получить старые запросы" отрисовывается таблица со старыми запросами
	$('#getOldQueries').on('click', () => {
		const userQueries = JSON.parse(localStorage.getItem('queries'));
		drawQueries(userQueries);

		//Скрытие всех основных блоков и отображение необходимых
		$(wiki[0].children).each((i, div) => {
			$(div).css('display', 'none')
		});
		$('#wiki-queries').css('display','block');
    });

	//Сортировка таблицы со старыми запросами при нажатии на кнопки "Sort"
	$('.sort').on('click', function() {
		const clickedColumn = $(this)[0].parentElement.className;
		sortQueries(clickedColumn);
	});
		
	//Фильтрация таблицы со старыми запросами
	$('.filter').on('input', function () {
	    filterQueries($(this).parents('table'));
	});

	//Графическое отображение времени выполнения запросов 
	$('#getStatistics').on('click', () => {
	
		drawStatistics();

		//Скрытие всех основных блоков и отображение необходимых
		$(wiki[0].children).each((i, div) => {
			$(div).css('display','none')
		});
		$('#wiki-statistics').css('display', 'flex');
	});

	//Изменение темы стилей по нажатию на кнопку "Сменить тему"
	$('#switchStyle').on('click', () => {
		changeThemeStyle(link);
	});
	//Выполнение тестов
	tests();
})


