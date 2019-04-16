import {getAPI} from './getAPI';

//Получение информации о самой новой и старой статье
export function compareArticleDate(titles) {
	const urls = [], dates = [], articles = [];

	//Создание массива с необходимыми url для запроса
	for (let i = 0; i < titles.length; i++) {
  		urls.push(`https://ru.wikipedia.org/w/api.php?action=query&origin=*&prop=revisions&titles=${titles[i]}&format=json`);
  	}

  	//Получение даты обновления по всем полученным ранее статьям
  	Promise.all(urls.map(async (url) => {
  		return getAPI(url)
	  		.then(
				data => {
					$.each(data.query.pages, (i, item) => {
						const date = item.revisions[0].timestamp;
						dates.push(date);
						articles.push({title: item.title, date: date});
					});
				})
	  		.catch(error => console.error('Error:', error));
  	})).then(
  			response => {
  				compare(dates, articles);
  			}
  		)
  		.catch(error => console.error('Error:', error));
}
//Сравнение дат и выявление самой новой и старой. Отображение информации на странице
function compare(dates, articles) {
	let newestDate = dates.reduce((a, b) => { return a > b ? a : b; });
	let index = dates.indexOf(newestDate);
	newestDate = newestDate.replace("T"," ").replace("Z"," ");
	$('#wiki-data').append($(`<div><p>Самая свежая статья - "${articles[index].title}" была обновлена ${newestDate}</p></div>`));
	
	let oldestDate = dates.reduce((a, b) => { return a < b ? a : b; });
	index = dates.indexOf(oldestDate);
	oldestDate = oldestDate.replace("T"," ").replace("Z"," ");
	$('#wiki-data').append($(`<div><p>Самая старая статья - "${articles[index].title}" была обновлена ${oldestDate}</p></div>`));
}