import {getQueryTime} from './getQueryTime';
import {updateLocalStorage} from './updateLocalStorage';
import {calcAverageOfSymbolCount} from './calcAverageOfSymbolCount';
import {compareArticleDate} from './compareArticleDate';

export function getWikiData() {
	const timerStart = Date.now();
	let loadTime = 0;
			
	const queryTime = getQueryTime();
	const input = document.getElementById('search-form__input');
	const encodedInput = encodeURI(input.value);
	const url = 'http://ru.wikipedia.org/w/api.php?action=opensearch&origin=*&search='+encodedInput+'&profile=strict&limit=5&format=json';
			    
	$('#wiki-items').empty();
	$.ajax ({
		url: url,
		type: 'GET',
		success: (data) => {
			for (let i=0; i<data[1].length; i++) {
				$('#wiki-items').append($('<h5><a href="'+data[3][i]+'">'+data[1][i]+'</a></h5>'));
				$('#wiki-items').append($('<p>'+data[2][i]+'</p>'));
			};
			setTimeout(calcAverageOfSymbolCount, 100, data[1]);
			setTimeout(compareArticleDate, 100, data[1]);
			loadTime = Date.now()-timerStart;
			updateLocalStorage(input.value, queryTime, loadTime);
		}
	});
}