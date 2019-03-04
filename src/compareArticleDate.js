export function compareArticleDate(titles) {
	let dates = [], articles = [];
	$.each(titles, (i,item) => {
		const url = `https://ru.wikipedia.org/w/api.php?action=query&origin=*&prop=revisions&titles=${item}&format=json`;
		$.ajax ({
			url: url,
			type: 'GET',
			success: (data) => {
				$.each(data.query.pages, (i,item) => {
					let date = item.revisions[0].timestamp;
					dates.push(date);
					articles.push({title: item.title, date: date});
				});
			}
		});
	});
	setTimeout(Comparing, 1000);
	function Comparing() {
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
}