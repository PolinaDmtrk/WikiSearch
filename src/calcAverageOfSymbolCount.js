export function calcAverageOfSymbolCount(titles) {
	let summ=0;
	$('#wiki-data').empty();
	$.each(titles, (i,item) => {
		const url = `https://ru.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&explaintext=&titles=${item}`;
		$.ajax ({
			url: url,
			type: 'GET',
			success: (data) => {
				$.each(data.query.pages, (i,item) => {
					let content = item.extract;
					summ = summ + content.length;
				});
				
			}
		});
	});
	setTimeout(calcAverage, 1000);
	function calcAverage() {
		const average = summ / titles.length;
		$('#wiki-data').append($(`<p>Среднее количество символов по выгруженным статьям - ${average}</p>`));
	}
}