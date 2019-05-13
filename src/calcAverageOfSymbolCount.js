import {getAPI} from './getAPI';
//Вычисление среднего количества символов в полученных статьях
export function calcAverageOfSymbolCount(titles) {
	let summ = 0; const urls = [];

	//Создание массива с необходимыми url для запроса
	for (let i = 0; i < titles.length; i++) {
  		urls.push(`https://ru.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&explaintext=&titles=${titles[i]}`);
  	}

  	//Получение текста статьи и вычисление его количества символов
  	Promise.all(urls.map(async (url) => {
  		return getAPI(url)
	  		.then(
				data => {
					const dataKeys = Object.keys(data.query.pages);
					const content = data.query.pages[dataKeys[0]].extract;
					summ = summ + content.length;
				})
	  		.catch(error => console.error('Error:', error));
  	})).then(
  			//Вычисление среднего и отрисовка полученных данных
  			response => {
  				const average = Math.round(summ / titles.length);
				$('#wiki-data').append($(`<div><p>Среднее количество символов по выгруженным статьям - ${average}</p></div>`));
  			}
  		)
  		.catch(error => console.error('Error:', error));
}