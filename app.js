// const fs = require('fs');
// process.removeAllListeners('warning');

const coins = ['bitcoin','binancecoin','ethereum', 'pax-gold']
let currency = 'eur'

const symbol = new Map(
    [['eur', ' €'],
     ['usd', ' $'],]
)

const setCurrency = (newCurrency) => {currency = newCurrency; fetchAll();}

// function getDate(){
//     const now = new Date();
//     return `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}`;
// }

// function getLastWeeksDate() {
//     const now = new Date();
  
//     const lastWeekDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
//     return `${lastWeekDate.getDate()}-${lastWeekDate.getMonth()+1}-${lastWeekDate.getFullYear()}`;
//   }

// const LastWeeksDate = getLastWeeksDate()
// const Now = getDate();

// const callApiImg = async ()

const callApi = async (coin,currency) => {

    document.body.style.backgroundImage ="url = https://source.unsplash.com/1600x900?sea"

    const parameters = {
        'vs_currency' : currency,
        'days' : 1,
        'interval' : 'daily'
    }

    const url = 'https://api.coingecko.com/api/v3/coins/';
    const urlToFetch = url + `${coin}/` + 'market_chart?' + new URLSearchParams(parameters).toString();
    const urlImg = `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`;

    const response = await fetch(urlToFetch);
    const data = await response.json();
    console.log(data);

    const responseImg  = await fetch(urlImg);
    const dataImg = await responseImg.json();
    console.log(dataImg.image.small);

    const priceHistoryRaw = data.prices;
    const priceHistory = [];
    for(price of priceHistoryRaw){priceHistory.push(price[1]);}; priceHistory.reverse();
    console.log(priceHistory);

    
    const coinHtmlImg = coin + '_img';
    const coinHtmlPrice = coin + '_price0';
    const coinHtmlVar = coin + '_var1';
    const ccySymbol = symbol.get(currency);

    document.getElementById(coinHtmlImg).src = dataImg.image.small;

    document.getElementById(coinHtmlPrice).innerText= priceHistory[0].toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + ccySymbol;

    const var1 = ((priceHistory[0]/priceHistory[1]-1)*100)

    if(var1>0){
        document.getElementById(coinHtmlVar).innerText = "+" + var1.toFixed(1).toString() + ' %';
        document.getElementById(coinHtmlVar).style.color = 'green';
    }
    else{
        document.getElementById(coinHtmlVar).innerText = var1.toFixed(1).toString() + ' %';
        document.getElementById(coinHtmlVar).style.color = 'red';
    }
}


const fetchAll = () =>{
    for(coin of coins){callApi(coin,currency);}
    console.log('Market data for selected coins has been fetched');
}

fetchAll();