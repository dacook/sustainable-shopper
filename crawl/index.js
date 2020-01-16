

const Crawler = require("crawler"); //nodecrawler.org

const c = new Crawler({
    maxConnections: 10,
    callback: (error, res, done) => {
        if (error){
            console.log(error);
        } else {
            const $ = res.$;
            console.log($("title").text());
        }
        done();
    }
});

function crawlRecyclingNearYou(){
    const baseUrl='https://recyclingnearyou.com.au';
    getCouncilUrls(baseUrl);
}

function getCouncilUrls(baseUrl){
    c.queue([{
        uri: baseUrl+'/councils/',
        callback: (error, res, done) => {
            if (error){
                console.log(error);
            } else {
                const $ = res.$;
                const councilLinks = Array.from($('.content-body a[href^="/council/"]'));
                const councilUrls = councilLinks.map((val)=> {
                    return baseUrl + '/kerbside/' + $(val).attr('href').split('/')[2];
                });

                getCouncilKerbsides(councilUrls);
            }
            done();
        }
    }]);
};

function getCouncilKerbsides(councilUrls) {
    c.queue(councilUrls);
}



crawlRecyclingNearYou();