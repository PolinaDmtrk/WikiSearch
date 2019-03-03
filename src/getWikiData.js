import {getQueryTime} from './getQueryTime';
import {updateLocalStorage} from './updateLocalStorage';
import {calcAverageOfSymbolCount} from './calcAverageOfSymbolCount';
import {compareArticleDate} from './compareArticleDate';

export function getWikiData() {
	const timerStart = Date.now();
	let loadTime = 0;
			
	const queryTime = getQueryTime();
	const input = document.getElementById('search-form__input');
	if (input.value == '') {
		alert('Необходимо ввести текст в поле поиска!');
		return;
	}

	let updatedText;
	tgtrimm(input.value);
	function tgtrimm(str) {
		updatedText = str.replace(/[^a-zA-ZА-Яа-яЁё]/gi,'').replace(/\s+/gi,', ');
		return updatedText;
	}

	const encodedInput = encodeURI(updatedText);
	const url = 'http://ru.wikipedia.org/w/api.php?action=opensearch&origin=*&search='+encodedInput+'&profile=strict&limit=5&format=json';
			    
	$.ajax ({
		url: url,
		type: 'GET',
		success: (data) => {
			if (data[1].length == 0) {
				alert('Не найдено ни одной статьи:(');
				return;
			}
			$('#wiki-items').empty();
			for (let i=0; i<data[1].length; i++) {
				$('#wiki-items').append($('<h5><a href="'+data[3][i]+'">'+data[1][i]+'</a></h5>'));
				$('#wiki-items').append($('<p>'+data[2][i]+'</p>'));
			};
			setTimeout(calcAverageOfSymbolCount, 100, data[1]);
			setTimeout(compareArticleDate, 100, data[1]);
			loadTime = Date.now()-timerStart;
			updateLocalStorage(updatedText, queryTime, loadTime);
		}
	});
}