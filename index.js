const newman = require('newman');
const fs = require('fs');
const {
    StringDecoder
} = require('string_decoder');
const decoder = new StringDecoder('utf8');
/* Begin request */
newman.run({
    collection: require('./datasheets360.postman_collection.json'),
    reporters: 'cli',
    insecure: true
}, function(err, summary) {
    if (err) {
        throw err;
    }
    summary.run.executions.forEach(exec => {
        console.log('Request name:', exec.item.name);
        // console.log(exec.response)
        // console.log(exec.response.stream.toString())
        tofile(exec.item.id, exec.response.stream.toString())
    });
});
var tofile = (file, content) => {
    fs.writeFile(file, content, function(err) {
        if (err) return console.log(err);
        console.log('Written ' + file);
    });
}