import {drawQueries} from './drawQueries';
import {filterQueries} from './filters';
let lastSortClass = '';

//Сортировка старых запросов в таблице
export function sortQueries(sortClass) {

	const queries = [];

	//Добавление в массив queries всех значений из таблицы для последующей сортировки
	$('#wiki-queries tbody tr').each((i, tr) => {
		queries[i] = {};
		queries[i].trClass = tr.className;
		$('td', tr).each((y, td) => {
			queries[i][td.className] = td.textContent;
		});
	});

	/*Проверка: если признак сортировки такой же, как и в предыдущий раз,
	 то перебор в обртаном порядке, иначе сортировка*/
	if (sortClass == lastSortClass) {
		queries.reverse();
	}
	else {
		/*Проверка: если значение, приведенное к числу является NaN, то сортировка для строк,
		  иначе сортировка для чисел*/
		if ( isNaN( Number(queries[0][sortClass] )) ) {
			queries.sort((a, b) => {
				return a[sortClass].localeCompare(b[sortClass]);
			});
		}
		else {
			queries.sort((a, b) => {
			   	return a.queryLoadTime - b.queryLoadTime;
			});
		}
	}

	lastSortClass = sortClass;

	//Перерисовка новой отсортированной таблицы
	drawQueries(queries);
}