'use strict';

( async () => {
    const url = `https://gitgame.avkaransarminder.ikdoeict.be/leaderboard`

    try {
        const response = await Promise.allSettled([
            fetch(url)
                .then(response => response.json())
                .then(data => document.querySelector('#span1').innerHTML +=
                    `
                    ${(data)[0].user}
                    `
                ),
            fetch(url)
                .then(response => response.json())
                .then(data => document.querySelector('#span2').innerHTML +=
                    `
                    ${(data)[0].score}
                    `
                ),
            fetch(url)
                .then(response => response.json())
                .then(data => document.querySelector('#span3').innerHTML +=
                    `
                    ${(data)[1].user}
                    `
                ),
            fetch(url)
                .then(response => response.json())
                .then(data => document.querySelector('#span4').innerHTML +=
                    `
                    ${(data)[1].score}
                    `
                ),
            fetch(url)
                .then(response => response.json())
                .then(data => document.querySelector('#span5').innerHTML +=
                    `
                    ${(data)[2].user}
                    `
                ),
            fetch(url)
                .then(response => response.json())
                .then(data => document.querySelector('#span6').innerHTML +=
                    `
                    ${(data)[2].score}
                    `
                ),
            fetch(url)
                .then(response => response.json())
                .then(data => document.querySelector('#span7').innerHTML +=
                    `
                    ${(data)[3].user}
                    `
                ),
            fetch(url)
                .then(response => response.json())
                .then(data => document.querySelector('#span8').innerHTML +=
                    `
                    ${(data)[3].score}
                    `
                ),
            fetch(url)
                .then(response => response.json())
                .then(data => document.querySelector('#span9').innerHTML +=
                    `
                    ${(data)[4].user}
                    `
                ),
            fetch(url)
                .then(response => response.json())
                .then(data => document.querySelector('#span10').innerHTML +=
                    `
                    ${(data)[4].score}
                    `
                ),
            fetch(url)
                .then(response => response.json())
                .then(data => document.querySelector('#span11').innerHTML +=
                    `
                    ${(data)[5].user}
                    `
                ),
            fetch(url)
                .then(response => response.json())
                .then(data => document.querySelector('#span12').innerHTML +=
                    `
                    ${(data)[5].score}
                    `
                ),
            fetch(url)
                .then(response => response.json())
                .then(data => document.querySelector('#span13').innerHTML +=
                    `
                    ${(data)[6].user}
                    `
                ),
            fetch(url)
                .then(response => response.json())
                .then(data => document.querySelector('#span14').innerHTML +=
                    `
                    ${(data)[6].score}
                    `
                ),
            fetch(url)
                .then(response => response.json())
                .then(data => document.querySelector('#span15').innerHTML +=
                    `
                    ${(data)[7].user}
                    `
                ),
            fetch(url)
                .then(response => response.json())
                .then(data => document.querySelector('#span16').innerHTML +=
                    `
                    ${(data)[7].score}
                    `
                ),
            fetch(url)
                .then(response => response.json())
                .then(data => document.querySelector('#span17').innerHTML +=
                    `
                    ${(data)[8].user}
                    `
                ),
            fetch(url)
                .then(response => response.json())
                .then(data => document.querySelector('#span18').innerHTML +=
                    `
                    ${(data)[8].score}
                    `
                ),
            fetch(url)
                .then(response => response.json())
                .then(data => document.querySelector('#span19').innerHTML +=
                    `
                    ${(data)[9].user}
                    `
                ),
            fetch(url)
                .then(response => response.json())
                .then(data => document.querySelector('#span20').innerHTML +=
                    `
                    ${(data)[9].score}
                    `
                ),
        ])
    } catch (err) {
        console.error("ERROR BRO: " + err);
    }



    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error('DATA HAS NOT BEEN FETCHED!!!');
        } else console.log('FETCHING SUCCES');
        const data = await response.json();
        console.log((data)[0])

    } catch (err) {
        console.error("ERROR BRO: " + err);
    }
})()