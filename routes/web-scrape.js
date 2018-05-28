const express = require('express')

//possibly 
const app = express();

//otherwise
// const app = express();

app.get('/scrape', function(req, res){
    request('https://news.ycombinator.com/newest', function (error, response, html){
        var $ = cheerio.load(html);
        $('.title').each(function(i, element){
            var title = $(this).children('a').text();
            var link = $(this).children('a').attr('href');
            if(title && link){
                db.scrapeData.save({
                    title: title,
                    link: link
                }, 
                function(err, saved) {
                    if(err){
                        console.log(err);
                    
                    } else {
                        console.log(saved);

                    }
                });
            }
        });
    });
    res.send('Scrape Complete');
    
});




module.exports = app
// module.exports = router