import {calcAverage} from './calcAverage';
//Вычисление среднего количества символов в полученных статьях
export function calcAverageOfSymbolCount(titles) {
	let summ=0;
	$('#wiki-data').empty();
	//Получение текста статьи и вычисление его количества символов
	getTextContent(titles.length-1);

	function getTextContent(counter) {
		const url = `https://ru.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&explaintext=&titles=${titles[counter]}`;
		$.ajax ({
			url: url,
			type: 'GET',
			success: (data) => {
				$.each(data.query.pages, (i,item) => {
					const content = item.extract;
					summ = summ + content.length;
				});
				if(counter==0) {
					const average = calcAverage(summ, titles.length);
					$('#wiki-data').append($(`<p>Среднее количество символов по выгруженным статьям - ${average}</p>`));
					return 0;
				}
				getTextContent(--counter);
			}
		});
	}
}