const fs = require('fs');
process.removeAllListeners('warning');

const url = 'https://api.coingecko.com/api/v3/simple/price?'
const urlList = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc'

const parameters = {
    'ids' : ['bitcoin','ethereum', 'pax-gold'],
    'vs_currencies' : 'eur'
}

const paramUrl = (parameters) => {
    str = '';
    for (const param of Object.entries(parameters)) {
        if(param[0] == 'metric'){str = str + param[1]}
        else{
            str = str + param[0] + '=' + param[1] + '&';
        }
      }
    return (str.slice(0,-1));
}

const urlApi = url + paramUrl(parameters);


// ################# Coingecko API using fetch

const callApi = async (url,parameters,fileName) => {
    let urlToFetch = url;
    if(parameters != ''){
        urlToFetch += new URLSearchParams(parameters).toString();
    }
    const response = await fetch(urlToFetch);
    const data = await response.json();
    console.log(data);
    fs.promises.writeFile(`data_${fileName}.json`, JSON.stringify(data), function(err) {
                if (err) {
                    console.log(err);
                }
            });
}



callApi(url,parameters,'SomeCoins');
callApi(urlList,'','market');

// write a version of callApi without async and await
// connect to Git/Github