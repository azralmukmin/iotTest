var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('createMessage', {
        test: 'Test from client'
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});


socket.on('initData', function (dataDB) {
    console.log('initData', dataDB);

    initHighChart.addSeries({
        name: 'Temperature',
        data: dataDB,
        type: 'spline',
        tooltip: {
            valueDecimals: 0
        }
    });

});

socket.on('addData', function (dataDB) {
    console.log('Data incoming');
    console.log('addData', dataDB);
    initHighChart.series[0].addPoint([dataDB.x, dataDB.y], true, true);
});

// Create the chart
var initHighChart = Highcharts.stockChart('container', {



    rangeSelector: {
        buttons: [{
            type: 'minute',
            count: 1,
            text: '1min'
        }, {
            type: 'hour',
            count: 1,
            text: '1h'
        }, {
            type: 'day',
            count: 1,
            text: '1d'
        }, {
            type: 'month',
            count: 1,
            text: '1m'
        }, {
            type: 'year',
            count: 1,
            text: '1y'
        }, {
            type: 'all',
            text: 'All'
        }],
        inputEnabled: false, // it supports only days
        selected: 5 // all
    },

    credits: {
        enabled: false
    },

    title: {
        text: 'Lab CERE'
    },

    subtitle: {
        text: 'Temperature'
    },

    tooltip: {
        valueSuffix: ' °C',
        crosshairs: [false, false]
    },

    exporting: {
        enabled: false
    },

    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
            // millisecond: '%H:%M:%S.%L',
            second: '%H:%M:%S',
            minute: '%H:%M',
            hour: '%H:%M',
            day: '%e %b %Y',
            month: '%b %y',
            year: '%Y'
        }
    },

    yAxis: {
        opposite: false
    },

    plotOptions: {
        spline: {
            marker: {
                enabled: true
            },
            dataLabels: {
                enabled: false
            }
        }
    }

});
