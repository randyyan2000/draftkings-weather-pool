function injectJQuery() {
    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
}

injectJQuery();

function getForecast(query) {
    return new Promise((resolve, reject) => {
        jQuery.getJSON(query, response => {
            try {
                const forecast = response.forecast.forecastday[1].day.maxtemp_f
                return resolve(forecast);
            }
            catch {
                reject();
            }
        })
    })
}

async function makePicks() {
    API_KEY = 'your api key here'; // YOUR API KEY HERE
    const questions = document.querySelector('div.items-list').children;
    for (var i = 0; i < questions.length; i += 2) {
        const question_el = questions[i];
        const city = question_el.children[0].textContent.split(' ')[7];
        const api_query = `https://api.weatherapi.com/v1/forecast.json?key=${ API_KEY }&q=${ city }&days=2`;

        const forecast = await getForecast(api_query);

        const answer_el = questions[i + 1];
        const threshold = parseFloat(answer_el.children[0].textContent.split(' ')[1]);
        if (forecast < threshold) {
            answer_el.children[0].click();
        } else {
            answer_el.children[1].click();
        }
    }  
}

makePicks();