

const Crawler = require("crawler"); //nodecrawler.org

const c = new Crawler({
    maxConnections: 10,
    callback: (error, res, done) => {
        if (error){
            console.log(error);
        } else {
            // Get accepted kerbside recycling.
            const $ = res.$;
            console.log($("title").text());
            const types = $('.p-3');
            const recyclingAccepted = Array.from($(types[0]).find('.kerbside-accepted p')).map((val)=>$(val).text());
            console.log($('h2').text());
            console.log($('.row.text-center p').first().text().split('|')[0], " accepted:");
            console.log(recyclingAccepted);
        }
        done();
    }
});

function crawlRecyclingNearYou(){
    const baseUrl='https://recyclingnearyou.com.au';
    getCouncilUrls(baseUrl);
}

function getCouncilUrls(baseUrl){
    const uri = baseUrl+'/councils/';
    console.log('Crawling ' + uri + '...');
    c.queue([{
        uri: uri,
        callback: (error, res, done) => {
            if (error){
                console.log(error);
            } else {
                const $ = res.$;
                const councilLinks = Array.from($('.content-body a[href^="/council/"]'));
                const councilUrls = councilLinks.map((val)=> {
                    return baseUrl + '/kerbside/' + $(val).attr('href').split('/')[2];
                });

                getCouncilKerbsides("https://recyclingnearyou.com.au/kerbside/MorelandVIC");
                // getCouncilKerbsides(councilUrls);
            }
            done();
        }
    }]);
};

function getCouncilKerbsides(councilUrls) {
    c.queue(councilUrls);
}



crawlRecyclingNearYou();