//Вычисление среднего среди полученных значений
export function calcAverage(summ, count) {
	const average = Math.round(summ / count);
	return average;
}