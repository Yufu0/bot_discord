exports.log_to_console = (message) => {
    let current_date = new Date();
    let datetime = ('[' + current_date.toLocaleString('fr') + '] ').replace(',', ' @');
    console.log(datetime.toString() + message);
}

exports.error_to_console = (message) => {
    let current_date = new Date();
    let datetime = ('[' + current_date.toLocaleString('fr') + '] ').replace(',', ' @');
    console.error(datetime.toString() + message);
}