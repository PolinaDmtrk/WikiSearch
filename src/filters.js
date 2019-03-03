export function filterQueries(filterParam) {
    let input = ''; let ComparingParam = '';
    if (filterParam === 'byQuery') {
        input = document.getElementById('filterQuery');
        ComparingParam = document.getElementsByClassName('query');
    }
    if (filterParam === 'byQueryTime') {
        input = document.getElementById('filterQueryTime');
        ComparingParam = document.getElementsByClassName('queryTime');
    }
    if (filterParam === 'byQueryLoadTime') {
        input = document.getElementById('filterQueryLoadTime');
        ComparingParam = document.getElementsByClassName('queryLoadTime');
    }

    const filter = input.value.toUpperCase();
    const tdQuery = document.getElementsByClassName('query');
    const tdQueryTime = document.getElementsByClassName('queryTime');
    const tdqueryLoadTime = document.getElementsByClassName('queryLoadTime');

    $.each(ComparingParam, (i, item) => {
        let a = item.textContent;
        if (a.toUpperCase().indexOf(filter)>-1) {
            tdQuery[i].style.display = "";
            tdQueryTime[i].style.display = "";
            tdqueryLoadTime[i].style.display = "";
        }
        else {
            tdQuery[i].style.display = "none";
            tdQueryTime[i].style.display = "none";
            tdqueryLoadTime[i].style.display = "none";
        }
    });
}