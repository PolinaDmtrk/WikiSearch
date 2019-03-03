export function drawQueries(queries) {
    $('#wiki-queries tbody').empty();
    $.each(queries, (i,item) => {
    	const raw = '<tr><td class="query">'+item.query+'</td><td class="queryTime">'+item.queryTime+'</td><td class="queryLoadTime">'+item.loadTime+'</td></tr>';
    	$('#wiki-queries tbody').append($(raw));
    });
}