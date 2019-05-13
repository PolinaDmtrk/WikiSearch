//Фильтрация таблицы со старыми запросами
export function filterQueries(table) {
    const filters = table.find('.filter');
    const rows = table.find('.userQuery');
    rows.each(function () {
        let valid = true;
        $(this).find('td').each(function (colIndex) {
            if (filters.eq(colIndex).val()) {
                if ($(this).html().toLowerCase().indexOf(
                    filters.eq(colIndex).val().toLowerCase()) == -1) {
                    valid = valid && false;
                }
            }
        });
        if (valid === true) {
            $(this).removeClass('non-visible');
        }
        else {
            $(this).addClass('non-visible');
        }
    });
}