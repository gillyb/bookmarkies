var reportLevels = ['WARN', 'ERROR'];

// TODO: get reportLevels param from configuration file!

exports.log = function(level, message, data) {
    if (reportLevels.indexOf(level.toUpperCase()) < 0)
        return;

    var now = new Date();
    var timestamp = now.getDate() + '/' + now.getMonth() + '/' + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    var logMessage = timestamp + ' :: ' + level.toUpperCase() + ' :: ' + message;
    if (data)
        try {
            logMessage += " :: " + JSON.stringify(data);
        }
        catch (ex) {}

    console.log(logMessage);
};

exports.debug = function(message, data) { exports.log('DEBUG', message, data); };
exports.info  = function(message, data) { exports.log('INFO', message, data); };
exports.warn  = function(message, data) { exports.log('WARN', message, data); };
exports.error = function(message, data) { exports.log('ERROR', message, data); };
