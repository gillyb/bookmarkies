
exports.slugify = function(str) {
    var shortened = str.substr(0, 60);
    var modified = shortened
        .replace(new RegExp(' ', 'g'), '-')
        .replace(new RegExp(',', 'g'), '-')
        .replace(new RegExp('\"', 'g'), '')
        .replace(new RegExp('\'', 'g'), '');
    return encodeURIComponent(modified);
};