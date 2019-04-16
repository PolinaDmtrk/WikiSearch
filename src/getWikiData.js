import {getQueryTime} from './getQueryTime';
import {updateLocalStorage} from './updateLocalStorage';
import {calcAverageOfSymbolCount} from './calcAverageOfSymbolCount';
import {compareArticleDate} from './compareArticleDate';
import {getAPI} from './getAPI';

//Запрос в Википедию по API и отображение результатов
export function getWikiData() {
	const timerStart = Date.now();

	//Получение текущего времени - времени запроса
	const date = new Date();
	const queryTime = getQueryTime(date);
	const input = document.getElementById('search-form__input');
	//Вывод ошибки, если в строку поиска ничего не введено
	if (input.value == '') {
		alert('Необходимо ввести текст в поле поиска!');
		return;
	}

	//Очищение блока (от старой информации)
	$('#wiki-items').empty();
	$('#wiki-data').empty();

	//tgtrimm удаляет все лишние символы из строки запроса, кроме пробелов и дефисов
	const updatedText = tgtrimm(input.value);
	const encodedInput = encodeURI(updatedText);
	const url = 'http://ru.wikipedia.org/w/api.php?action=opensearch&origin=*&search='+encodedInput+'&profile=strict&limit=5&format=json';

	//Запрос в Википедию
	getAPI(url).then(
		data => {
			//Вывод уведомления, если не получено ни одной статьи
			if (data[1].length == 0) {
				alert('Не найдено ни одной статьи:(');
				return;
			}

			//Отображение результатов на странице
			$('#wiki-items').empty();
			for (let i=0; i<data[1].length; i++) {
				const divContent = '<h5 class="article-name"><a href="'+data[3][i]+'">'+data[1][i]+'</a></h5><p class="article-description">'+data[2][i]+'</p>'
				$('#wiki-items').append($(`<div class="article">${divContent}<div>`));
			};

			//Вычисление агрегированной информации по запросу
			calcAverageOfSymbolCount(data[1]);
			compareArticleDate(data[1]);
			//Вычисление времени загрузки запроса
			const loadTime = Date.now() - timerStart;
			//Добавление запроса в локальное хранилище
			updateLocalStorage(updatedText, queryTime, loadTime);
		}).catch(error => console.error('Error:', error));
}
//tgtrimm удаляет все лишние символы из строки запроса, кроме пробелов и дефисов
export function tgtrimm(str) {
	const updatedText = str.replace(/[^\s-a-zA-ZА-Яа-яЁё]/gi,'');
	return updatedText;
}