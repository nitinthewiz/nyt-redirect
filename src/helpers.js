export function formatDate(r2 = false) {
    const curr_date = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
    console.log("curr_date - ");
    console.log(curr_date);

    const dt = new Date(curr_date);
    
    var month = '' + (dt.getMonth() + 1),
        day = '' + dt.getDate(),
        year = dt.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    // if r2 is true, set the separator to dash instead of slash
    const separator = r2 ? '-' : '/';

    return [year, month, day].join(separator);
};

export function buildPdfUrl() {
    var curr_date = formatDate();
    return "https://static01.nyt.com/images/" + curr_date + "/nytfrontpage/scan.pdf";
}