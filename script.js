window.onload = function () {
    Hexagon();
}

function Hexagon() {
    // var line = parseInt(prompt("Please choose an axis: 1, 2, or 3 (Default is 1)"));

    // if (!line || ![1,2,3].includes(line)) {
    //     line = 1;
    // }

    // var score = parseInt(prompt("Please enter a score between -50 and 50 (Default is 0)"));

    // if (!score || score > 50 || score < -50) {
    //     score = 0;
    // }

    var scores = [];
    var totalScore = 0;

    for (var i = 0; i < 100; i++) {
        var seed = Math.random() - Math.random();
        console.log(seed);
        var newScore = 500 * seed;
        scores.push(newScore);
        totalScore += newScore;
    }

    var score = totalScore / 100;
    
    var line = Math.ceil(Math.random() * 3);

    document.getElementById("results").innerHTML = `Axis: ${line}<br>Total Score: ${totalScore}<br>Final Score: ${score}`;
    document.getElementById("scores").innerHTML = `Scores:<br>${scores.toString().replace(/,/g, "<br>")}`;

    var ctx = document.getElementById('graph').getContext('2d');

    var boundaries = [
        [-0.5, 47], [-0.5, -49],
        [23, 22.5], [-24, -25],
        [23, -25],  [-24, 22]
    ];

    function scaleData(axis, w) {
        switch (axis) {
            case 1:
                var x = -0.5;
                var y = 96 * ((w + 50) / 100) - 49;
                break;
            case 2:
                var x = 47 * ((w + 50) / 100) - 24;
                var y = 47.5 * ((w + 50) / 100) - 25;
                break;
            case 3:
                var x = 47 * ((w + 50) / 100) - 24;
                var y = -47 * ((w + 50) / 100) + 22;
                break;
        }

        document.getElementById("results").innerHTML += `<br>Graph X-value: ${x}<br>Graph Y-value: ${y}`;

        return [{
            x: x,
            y: y
        }];
    }

    var hexagon = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Scatter Dataset',
                pointBackgroundColor: '#FF0000',
                pointBorderColor: '#FF0000',
                pointBorderWidth: 20,
                backgroundColor: 'rgb(255, 99, 132)',
                data: scaleData(line, score)
            }]
        },

        options: {
            legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.xLabel.toFixed(2) + ", " + tooltipItem.yLabel.toFixed(2);
                    }
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        display: false,
                        min: -50,
                        max: 50,
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false,
                    },
                }],
                xAxes: [{
                    ticks: {
                        display: false,
                        min: -50,
                        max: 50,
                    },
                    gridLines: {
                        drawBorder: false,
                        display: false,
                    },
                }],
            },
        },
    });
};