//Получение информации о самой новой и старой статье
export function compareArticleDate(titles) {
	const dates = [], articles = [];
	//Получение даты обновления по всем полученным ранее статьям
	function getDate(counter) {
		const url = `https://ru.wikipedia.org/w/api.php?action=query&origin=*&prop=revisions&titles=${titles[counter]}&format=json`;
		$.ajax ({
			url: url,
			type: 'GET',
			success: (data) => {
				$.each(data.query.pages, (i,item) => {
					const date = item.revisions[0].timestamp;
					dates.push(date);
					articles.push({title: item.title, date: date});
				});
				if(counter==0) {
					Comparing(dates, articles);
					return 0;
				}
				getDate(--counter);
			}
		});
	}
	getDate(titles.length-1);
}
//Сравнение дат и выявление самой новой и старой. Отображение информации на странице
function Comparing(dates, articles) {
	const newestDate = dates.reduce((a, b) => { return a > b ? a : b; });
	$.each(dates, (i,item) => {
		if (articles[i].date == newestDate) {
			let date = articles[i].date.replace("T"," ");
			date = date.replace("Z"," ");
			$('#wiki-data').append($(`<p>Самая свежая статья - "${articles[i].title}" была обновлена ${date}</p>`));
		}
	});
	const oldestDate = dates.reduce((a, b) => { return a < b ? a : b; });
	$.each(dates, (i,item) => {
		if (articles[i].date == oldestDate) {
			let date = articles[i].date.replace("T"," ");
			date = date.replace("Z"," ");
			$('#wiki-data').append($(`<p>Самая старая статья - "${articles[i].title}" была обновлена ${date}</p>`));
		}
	});
}