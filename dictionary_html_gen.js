var fs = require('fs');
var ejs = require('ejs');
var yaml = require('js-yaml');

// Load data from yaml file
try {

    var entries = yaml.safeLoad(fs.readFileSync('dictionary.yml', 'utf8'));

} catch (e) {

    console.log(e);

}

// Load EJS templates
try {

    var index = fs.readFileSync('index.ejs', 'utf-8');
    var entry = fs.readFileSync('entry.ejs', 'utf-8');
    var nav = fs.readFileSync('nav.ejs', 'utf-8');

} catch (e) {

    console.log(e);

}

//Create list of dictionary words
var words = [];
for (var i = 0, len = entries.entries.length; i < len; i++) {
    words.push(entries.entries[i].word);
}
entries['words'] = words;


// Create Navigation html
rendered_html_nav = ejs.renderFile(__dirname + '\\index.ejs', entries, function(err, result) {
    if (!err) {
        fs.writeFile('index.html', result, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    }
    else {
        console.log(err);
    }
});
