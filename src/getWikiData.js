import {getQueryTime} from './getQueryTime';
import {updateLocalStorage} from './updateLocalStorage';
import {calcAverageOfSymbolCount} from './calcAverageOfSymbolCount';
import {compareArticleDate} from './compareArticleDate';

//Запрос в Википедию по API и отображение результатов
export function getWikiData() {
	const timerStart = Date.now();
	let loadTime = 0;

	//Получение текущего времени - времени запроса
	const date = new Date();
	const queryTime = getQueryTime(date);
	const input = document.getElementById('search-form__input');
	//Вывод ошибки, если в строку поиска ничего не введено
	if (input.value == '') {
		alert('Необходимо ввести текст в поле поиска!');
		return;
	}

	//tgtrimm удаляет все лишние символы из строки запроса, кроме пробелов и дефисов
	let updatedText = tgtrimm(input.value);
	const encodedInput = encodeURI(updatedText);
	const url = 'http://ru.wikipedia.org/w/api.php?action=opensearch&origin=*&search='+encodedInput+'&profile=strict&limit=5&format=json';

	//Запрос в Википедию
	$.ajax ({
		url: url,
		type: 'GET',
		success: (data) => {
			//Вывод уведомления, если не получено ни одной статьи
			if (data[1].length == 0) {
				alert('Не найдено ни одной статьи:(');
				return;
			}
			//Отображение результатов на странице
			$('#wiki-items').empty();
			for (let i=0; i<data[1].length; i++) {
				$('#wiki-items').append($('<h5><a href="'+data[3][i]+'">'+data[1][i]+'</a></h5>'));
				$('#wiki-items').append($('<p>'+data[2][i]+'</p>'));
			};
			//Вычисление агрегированной информации по запросу
			setTimeout(calcAverageOfSymbolCount, 100, data[1]);
			setTimeout(compareArticleDate, 100, data[1]);
			//Вычисление времени загрузки запроса
			loadTime = Date.now()-timerStart;
			//Добавление запроса в локальное хранилище
			updateLocalStorage(updatedText, queryTime, loadTime);
		}
	});
}
//tgtrimm удаляет все лишние символы из строки запроса, кроме пробелов и дефисов
export function tgtrimm(str) {
	let updatedText = str.replace(/[^\s-a-zA-ZА-Яа-яЁё]/gi,'');
	return updatedText;
}