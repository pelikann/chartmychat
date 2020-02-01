let backgroundColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'];
let borderColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)', 
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'];

let lightSpectrum = [
    '#FF0000', '#FF9700', '#FFF300', '#00FF0C', '#00FF9B', '#00F3FF', '#0083FF', '#0400FF', '#8F00FF', '#DC00FF', '#FF00C5',
    '#FF0000', '#FF9700', '#FFF300', '#00FF0C', '#00FF9B', '#00F3FF', '#0083FF', '#0400FF', '#8F00FF', '#DC00FF', '#FF00C5'];


let colorIndex = 0;
let colorIndex2 = 1;
Chart.defaults.global.defaultFontFamily = "Poppins";


var _sortedEmojiKeys;
var _sortedEmojiValues;
var _sortedEmojiKeys2;
var _sortedEmojiValues2;

var _emojiChart;
var _emojiChart2;


var _sortedWordKeys;
var _sortedWordValues;
var _sortedWordKeys2;
var _sortedWordValues2;

var _wordChart;
var _wordChart2;


var globalChronologicalChart;
var originalFirstDate;
var originalLastDate;

function createCharts(demo=false) {
    originalFirstDate = Object.keys(senders[0].messagesPerDay)[0];
    datePickerFrom.value = originalFirstDate;
    var d1 = new Date(Date.parse(originalFirstDate));
    d1.setDate(d1.getDate()-1);
    var _month1 = ('0' + (d1.getMonth() + 1)).slice(-2);
    var _day1 = ('0' + (d1.getDate())).slice(-2);
    originalFirstDate = d1.getFullYear() + "-" + _month1 + "-" + _day1;

    originalLastDate = Object.keys(senders[0].messagesPerDay)[Object.values(senders[0].messagesPerDay).length - 1];
    datePickerTo.value = originalLastDate;
    var d2 = new Date(Date.parse(originalLastDate));
    d2.setDate(d2.getDate()+1);
    var _month2 = ('0' + (d2.getMonth() + 1)).slice(-2);
    var _day2 = ('0' + (d2.getDate())).slice(-2);
    originalLastDate = d2.getFullYear() + "-" + _month2 + "-" + _day2;
    

    // datePickerFrom.value = originalFirstDate;
    // datePickerTo.value = originalLastDate;


    var info = document.getElementById("basicinfo");
    info.innerHTML = "Analysis for a chat between <span style='color:" + borderColors[0] + "'>" +
        senders[0].name + "</span> and <span style='color:" + borderColors[1] + "'>" +
        senders[1].name + "</span>";

    var range = document.getElementById("basicrange");
    range.innerHTML = "<p class='hcenter timespan'>Timespan</p> from <span class='rangedate'> " + originalFirstDate +
        "</span> until <span class='rangedate'>" + originalLastDate + "</span>";

    var ctxLine = document.getElementById("timelineId");
    var chronologicalChart = createChronologicalChart(ctxLine, senders[0].name, senders[1].name,
        Object.keys(senders[0].messagesPerDay), Object.values(senders[0].messagesPerDay),
        Object.values(senders[1].messagesPerDay), 0, 1);
    //lineChart(senders[0].messagesPerDay, senders[0].name, 1);
    allCharts[allCharts.length] = chronologicalChart;
    globalChronologicalChart = chronologicalChart;


    var psm = document.getElementById("bothSentMessages");
    psm.innerHTML = (senders[0].sentMessages + senders[1].sentMessages).toString();


    var ctxPie = document.getElementById("totalTextsId");
    var pieChart = createPieChart(ctxPie, senders[0].name, senders[1].name,
        [senders[0].sentMessages, senders[1].sentMessages], 0, 1);
    allCharts[allCharts.length] = pieChart;

    var messagesDiv = document.getElementById("rightlabelSent");
    messagesDiv.innerHTML = senders[0].sentMessages;

    var messagesDiv2 = document.getElementById("leftlabelSent");
    messagesDiv2.innerHTML = senders[1].sentMessages;


    //var calldurationdiv = document.getElementById("calldurationId");
    //calldurationdiv.innerHTML = "Call duration: " +
    //    (round((senders[0].callDuration + senders[1].callDuration) / 3600, 1).toString() + " hours");



    var ctxInit = document.getElementById("initsId");
    var initChart = createPieChart(ctxInit, senders[0].name, senders[1].name,
        [senders[0].conversationInits, senders[1].conversationInits], 0, 1);
    allCharts[allCharts.length] = initChart;

    var initsDiv = document.getElementById("rightlabelInits");
    initsDiv.innerHTML = senders[0].conversationInits;

    var initsDiv2 = document.getElementById("leftlabelInits");
    initsDiv2.innerHTML = senders[1].conversationInits;



    var ctxMpr = document.getElementById("mprId");
    var mprChart = createMPRChart(ctxMpr, "mpr", "horizontalBar", [senders[0].name, senders[1].name],
        [senders[0].getAvgMessPerReply(), senders[1].getAvgMessPerReply()], 0, 1);
    allCharts[allCharts.length] = mprChart;


    var ctxMessLen = document.getElementById("messLenId");
    var messLenChart = createMPRChart(ctxMessLen, "messLen", "horizontalBar", [senders[0].name, senders[1].name],
        [senders[0].allMessLen / senders[0].sentMessages, senders[1].allMessLen / senders[1].sentMessages],
        0, 1);
    allCharts[allCharts.length] = messLenChart;

    var totalWords = document.getElementById("totalWords");
    totalWords.innerHTML = "Words total: <span class='total'>" + (senders[0].sentWords + senders[1].sentWords).toString() + "</span>";

    var totalLetters = document.getElementById("totalLetters");
    totalLetters.innerHTML = "Letters total: <span class='total'>" + (senders[0].sentLetters + senders[1].sentLetters).toString() + "</span>";





    if (demo == true) {
        var ctx = document.getElementById("myemojiChart");
        var emojiChart = createChart(ctx, "GirlFriend", "horizontalBar", ["", "", "", "", "", ""],
            [3000, 2500, 2000, 1500, 1000, 500], 0);
        allCharts[allCharts.length] = emojiChart;

        var ctx2 = document.getElementById("myemojiChart2");
        var emojiChart2 = createChart(ctx2, "Boyfriend", "horizontalBar", ["", "", "", "", "", ""],
            [3000, 2500, 2000, 1500, 1000, 500], 1);
        allCharts[allCharts.length] = emojiChart2;

        new_populate_emojis(["{u+1f602}", "{u+1f595}", "{u+1f60f}", "{u+1f60a}", "{u+1f60d}", "{u+1f69d}"], "emojiUl");
        populate_emojiRanks("emojiRankUl", 6);

        new_populate_emojis(["{u+1f602}", "{u+2764-fe0f}", "{u+1f595}", "{u+1f64f}", "{u+1f60e}", "{u+1f62a}"], "emojiUl2");
        populate_emojiRanks("emojiRankUl2", 6);
    }
    else {
        var sortedEmojis = Object.keys(senders[0].emojiCounts).map(function (key) {
            return [key, senders[0].emojiCounts[key]];
        });
        sortedEmojis.sort(function (first, second) {
            return second[1] - first[1];
        });
        var sortedEmojiKeys = [];
        var sortedEmojiValues = [];
        for (var i = 0; i < sortedEmojis.length; i++) {
            var s = "img-apple-64/";
            var t = sortedEmojis[i][0];
            t = t.substring(3, t.length - 1);
            s += t + ".png";
            if (!allFiles.includes(s)) {
                sortedEmojis.splice(i, 1);
                i--;
                continue;
            }

            sortedEmojiKeys[i] = sortedEmojis[i][0];
            sortedEmojiValues[i] = sortedEmojis[i][1];
        }

        var ctx = document.getElementById("myemojiChart");
        var emojiChart = createChart(ctx, senders[0].name, "horizontalBar",
            ["", "", "", "", "", ""], sortedEmojiValues, 0);
        allCharts[allCharts.length] = emojiChart;



        var sortedEmojis2 = Object.keys(senders[1].emojiCounts).map(function (key) {
            return [key, senders[1].emojiCounts[key]];
        });
        sortedEmojis2.sort(function (first, second) {
            return second[1] - first[1];
        });
        var sortedEmojiKeys2 = [];
        var sortedEmojiValues2 = [];
        for (var i = 0; i < sortedEmojis2.length; i++) {
            var s = "img-apple-64/";
            var t = sortedEmojis2[i][0];
            t = t.substring(3, t.length - 1);
            s += t + ".png";
            if (!allFiles.includes(s)) {
                sortedEmojis2.splice(i, 1);
                i--;
                continue;
            }

            sortedEmojiKeys2[i] = sortedEmojis2[i][0];
            sortedEmojiValues2[i] = sortedEmojis2[i][1];
        }

        var ctx2 = document.getElementById("myemojiChart2");
        var emojiChart2 = createChart(ctx2, senders[1].name, "horizontalBar",
            ["", "", "", "", "", ""], sortedEmojiValues2, 1);
        allCharts[allCharts.length] = emojiChart2;

        console.log(sortedEmojiKeys);

        new_populate_emojis(sortedEmojiKeys, "emojiUl");
        populate_emojiRanks("emojiRankUl", sortedEmojiKeys.length);

        new_populate_emojis(sortedEmojiKeys2, "emojiUl2");
        populate_emojiRanks("emojiRankUl2", sortedEmojiKeys2.length);
    }



    sortedWords = Object.keys(senders[0].wordCounts).map(function (key) {
        return [key, senders[0].wordCounts[key]];
    });
    sortedWords.sort(function (first, second) {
        return second[1] - first[1];
    });
    var sortedWordKeys = [];
    var sortedWordValues = [];
    for (var i = 0; i < sortedWords.length; i++) {
        sortedWordKeys[i] = sortedWords[i][0];
        sortedWordValues[i] = sortedWords[i][1];
    }


    sortedWords2 = Object.keys(senders[1].wordCounts).map(function (key) {
        return [key, senders[1].wordCounts[key]];
    });
    sortedWords2.sort(function (first, second) {
        return second[1] - first[1];
    });
    var sortedWordKeys2 = [];
    var sortedWordValues2 = [];
    for (var i = 0; i < sortedWords2.length; i++) {
        sortedWordKeys2[i] = sortedWords2[i][0];
        sortedWordValues2[i] = sortedWords2[i][1];
    }



    var wordChart;
    var wordChart2;

    if (demo == true) {
        var ctxWords = document.getElementById("wordCountsChart");
        wordChart = createChart(ctxWords, "Girlfriend", "horizontalBar", ["hi", "i", "love", "the", "a", "you"], [5000,4000,3000,2000,1000,500], 0);
        allCharts[allCharts.length] = wordChart;

        var ctxWords2 = document.getElementById("wordCountsChart2");
        wordChart2 = createChart(ctxWords2, "Boyfriend", "horizontalBar", ["i", "me", "but", "sex", "we", "do"],[5000, 4000, 3000, 2000, 1000, 500], 1);
        allCharts[allCharts.length] = wordChart2;
    }
    else {
        var ctxWords = document.getElementById("wordCountsChart");
        var wordChart = createChart(ctxWords, senders[0].name, "horizontalBar",
            sortedWordKeys.slice(0, 6), sortedWordValues.slice(0, 6), 0);
        allCharts[allCharts.length] = wordChart;

        var ctxWords2 = document.getElementById("wordCountsChart2");
        var wordChart2 = createChart(ctxWords2, senders[1].name, "horizontalBar",
            sortedWordKeys2.slice(0, 6), sortedWordValues2.slice(0, 6), 1);
        allCharts[allCharts.length] = wordChart2;
    }

    populate_wordRanks("wordRankUl");
    populate_wordRanks("wordRankUl2");



    _sortedEmojiKeys = sortedEmojiKeys;
    _sortedEmojiValues = sortedEmojiValues;
    _sortedEmojiKeys2 = sortedEmojiKeys2;
    _sortedEmojiValues2 = sortedEmojiValues2;

    _emojiChart = emojiChart;
    _emojiChart2 = emojiChart2;


    _sortedWordKeys = sortedWordKeys;
    _sortedWordValues = sortedWordValues;
    _sortedWordKeys2 = sortedWordKeys2;
    _sortedWordValues2 = sortedWordValues2;

    _wordChart = wordChart;
    _wordChart2 = wordChart2;




    var sortedTimes = Object.keys(senders[0].timesDuringDay).map(function (key) {
        return [key, senders[0].timesDuringDay[key]];
    });
    sortedTimes.sort(function (first, second) {
        return first[0] - second[0];
    });
    var stringTimeKeys = [];
    var sortedTimeKeys = [];
    var sortedTimeValues = [];
    for (var i = 0; i < sortedTimes.length; i++) {
        var t = sortedTimes[i][0];
        //console.log(typeof (t));
        var u = parseFloat(t);
        //console.log(u);
        //console.log(typeof (u));
        //console.log(u % 1);
        var s = "";
        if (u % 1 != 0) {
            s += (u - 0.5).toString();
            s += ":30";
        }
        else {
            s += u.toString();
            s += ":00";
        }
        stringTimeKeys[i] = s;

        sortedTimeKeys[i] = sortedTimes[i][0];
        sortedTimeValues[i] = sortedTimes[i][1];
    }


    var sortedTimes2 = Object.keys(senders[1].timesDuringDay).map(function (key) {
        return [key, senders[1].timesDuringDay[key]];
    });
    sortedTimes2.sort(function (first, second) {
        return first[0] - second[0];
    });
    var sortedTimeKeys2 = [];
    var sortedTimeValues2 = [];
    for (var i = 0; i < sortedTimes2.length; i++) {
        var t = sortedTimes2[i][0];

        sortedTimeKeys2[i] = sortedTimes2[i][0];
        sortedTimeValues2[i] = sortedTimes2[i][1];
    }

    var ctxTimes = document.getElementById("timesChart");
    var timesChart = createTimesDuringDayChart(ctxTimes, senders[0].name, senders[1].name,
         stringTimeKeys, sortedTimeValues, sortedTimeValues2, 0, 1);
    allCharts[allCharts.length] = timesChart;




    var sortedWeekdays = Object.keys(senders[0].weekdays).map(function (key) {
        return [key, senders[0].weekdays[key]];
    });
    sortedWeekdays.sort(function (first, second) {
        return first[0] - second[0];
    });
    sortedWeekdaysValues = [];
    for (var i = 0; i < sortedWeekdays.length; i++) {
        sortedWeekdaysValues[i] = sortedWeekdays[i][1];
    }


    var sortedWeekdays2 = Object.keys(senders[1].weekdays).map(function (key) {
        return [key, senders[1].weekdays[key]];
    });
    sortedWeekdays2.sort(function (first, second) {
        return first[0] - second[0];
    });
    sortedWeekdaysValues2 = [];
    for (var i = 0; i < sortedWeekdays2.length; i++) {
        sortedWeekdaysValues2[i] = sortedWeekdays2[i][1];
    }

    var ctxWeekdays = document.getElementById("weekdaysId");
    var weekdaysChart = createWeekdaysChart(ctxWeekdays, "", senders[0].name, senders[1].name, 
        sortedWeekdaysValues, sortedWeekdaysValues2, 0, 1);
    allCharts[allCharts.length] = weekdaysChart;

}


function createStats(demo = false) {

    var data = [[27314, 111497, 2.50, 39, 22, 129, 44, 215, 28, 24],
    [24916, 102903, 2.34, 37.64, 98, 23, 128, 12, 7]];

    var ps = [document.getElementById("statsName"), document.getElementById("statsName2")];
    var uls = [document.getElementById("statsUl"), document.getElementById("statsUl2")];


    if (demo == true) {
        for (var i = 0; i < uls.length; i++) {
            ps[i].innerHTML = senders[i].name;

            addStat(uls[i], "Total words", data[i][0], i);
            addStat(uls[i], "Total letters", data[i][1], i);
            addStat(uls[i], "Messages Per Reply", data[i][2], i);
            addStat(uls[i], "Avg. Characters per Message", data[i][3], i);
            addStat(uls[i], "Sent Photos", data[i][4], i);
            addStat(uls[i], "Sent Videos", data[i][5], i);
            addStat(uls[i], "Sent Audiofiles", data[i][6], i);
            //addStat(uls[i], "Started Calls", senders[i].startedCalls, i);
            //addStat(uls[i], "Call Duration", (round(senders[i].callDuration / 3600, 1).toString() + " hours"), i);
            addStat(uls[i], "Sent Gifs", data[i][7], i);
            addStat(uls[i], "Deleted Messages", data[i][8], i);
        }
    }
    else {
        for (var i = 0; i < uls.length; i++) {
            ps[i].innerHTML = senders[i].name;

            addStat(uls[i], "Total words", senders[i].sentWords, i);
            addStat(uls[i], "Total letters", senders[i].sentLetters, i);
            addStat(uls[i], "Messages Per Reply", senders[i].getAvgMessPerReply().toFixed(2), i);
            addStat(uls[i], "Avg. Characters per Message", (senders[i].allMessLen / senders[i].sentMessages).toFixed(2), i);
            addStat(uls[i], "Sent Photos", senders[i].sentPhotos, i);
            addStat(uls[i], "Sent Videos", senders[i].sentVideos, i);
            addStat(uls[i], "Sent Audiofiles", senders[i].sentAudiofiles, i);
            //addStat(uls[i], "Started Calls", senders[i].startedCalls, i);
            //addStat(uls[i], "Call Duration", (round(senders[i].callDuration / 3600, 1).toString() + " hours"), i);
            addStat(uls[i], "Sent Gifs", senders[i].gifsCount, i);
            addStat(uls[i], "Deleted Messages", senders[i].deletedMessages, i);
        }
    }
}
function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

function addStat(ul, label, prop, i) {
    var li = document.createElement("li");
    var p = document.createElement("p");
    p.classList.add("hcenter");
    p.classList.add("statElement");
    li.appendChild(p);
    ul.appendChild(li);

    var s = label.toString() + ": <span class='prop ";
    if (i == 0)
        s += "prop1";
    else
        s += "prop2";
    s += "'>" + prop.toString() + "</span>";

    p.innerHTML = s;
}


function sortOnKeys(dict) {

    var sorted = [];
    for (var key in dict) {
        sorted[sorted.length] = key;
    }
    sorted.sort();

    var tempDict = {};
    for (var i = 0; i < sorted.length; i++) {
        tempDict[sorted[i]] = dict[sorted[i]];
    }

    return tempDict;
}

function createPieChart(context, senderName, senderName2, data, _colorIndex, _colorIndex2) {
    var newChart = new Chart(context, {
        type: "pie",
        data: {
            labels: [senderName, senderName2],
            datasets: [{
                label: [senderName, senderName2],
                data: data,
                backgroundColor: [borderColors[_colorIndex], borderColors[_colorIndex2]],
                //borderColor: [borderColors[_colorIndex], borderColors[_colorIndex2]],
                borderColor: "#fff",
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutoutPercentage: 50,
            legend: {
                labels: {
                    // fontColor: 'white'
                }
            }
        }
    });
    return newChart;
}

function createTimesDuringDayChart(context, senderName, senderName2, labels, data,
    data2, _colorIndex, _colorIndex2) {
    var newChart = new Chart(context, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: senderName,
                data: data,
                backgroundColor: backgroundColors[_colorIndex],
                borderColor: borderColors[_colorIndex],
                pointHoverBackgroundColor: backgroundColors[_colorIndex],
                pointHoverBorderColor: borderColors[_colorIndex],
                borderWidth: 1,
                lineTension: 0.1
            },
            {
                label: senderName2,
                data: data2,
                backgroundColor: backgroundColors[_colorIndex2],
                borderColor: borderColors[_colorIndex2],
                pointHoverBackgroundColor: backgroundColors[_colorIndex2],
                pointHoverBorderColor: borderColors[_colorIndex2],
                borderWidth: 1,
                lineTension: 0.1
            }
            ]
        },
        options: whiteoptions
    });
    return newChart;
}

var whiteoptions =  {
    responsive: true,
    // legend: {
    //     labels: {
    //         fontColor: 'white'
    //     }
    // },
    scales: {
        // xAxes: [{
        //     ticks:{
        //         fontColor: 'white'
        //     },
        //     gridLines: 
        //     { 
        //         color: "rgba(255,255,255,0.3)"
        //     }
        // }],
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
                // fontColor: 'white'
            // },
            // gridLines: {
            //     color: "rgba(255,255,255,0.3)"
            // }
        }],
        xAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
};

function createChronologicalChart(context, senderName, senderName2, labels, data,
    data2, _colorIndex, _colorIndex2) {
    var unit = "month";

    var newChart = new Chart(context, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: senderName,
                data: data,
                backgroundColor: backgroundColors[_colorIndex],
                borderColor: borderColors[_colorIndex],
                pointHoverBackgroundColor: backgroundColors[_colorIndex],
                pointHoverBorderColor: borderColors[_colorIndex],
                borderWidth: 1,
                lineTension: 0.1
            },
            {
                label: senderName2,
                data: data2,
                backgroundColor: backgroundColors[_colorIndex2],
                borderColor: borderColors[_colorIndex2],
                pointHoverBackgroundColor: backgroundColors[_colorIndex2],
                pointHoverBorderColor: borderColors[_colorIndex2],
                borderWidth: 1,
                lineTension: 0.1
            }
            ]
        },
        options: {
            responsive: true,
            legend: {
                // labels: {
                //     fontColor: 'white'
                // }
            },
            scales: {
                xAxes: [{
                    categoryPercentage: 0.98,
                    barPercentage: 1.0,
                    type: "time",
                    distribution: "linear",
                    time: {
                        unit: unit
                    }
                    // ticks:{
                    //     fontColor: 'white'
                    // },
                    // gridLines: 
                    // { 
                    //     color: "rgba(255,255,255,0.3)"
                    // }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                        // fontColor: 'white'
                    }
                    // gridLines: {
                    //     color: "rgba(255,255,255,0.3)"
                    // }
                }]
            }
        }
    });
    return newChart;
}

function createChart(context, datasetLabels, type, labels, data, _colorIndex) {
    var newChart = new Chart(context, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: datasetLabels,
                data: data,
                backgroundColor: backgroundColors[_colorIndex],
                borderColor: borderColors[_colorIndex],
                pointHoverBackgroundColor: backgroundColors[_colorIndex],
                pointHoverBorderColor: borderColors[_colorIndex],
                borderWidth: 1,
                lineTension: 0.1
            }]
        },
        options: whiteoptions
    });
    return newChart;
}

function createMPRChart(context, datasetLabels, type, labels, data, _colorIndex, _colorIndex2) {
    var newChart = new Chart(context, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: datasetLabels,
                data: data,
                backgroundColor: [backgroundColors[_colorIndex], backgroundColors[_colorIndex2]],
                borderColor: [borderColors[_colorIndex], borderColors[_colorIndex2]],
                pointHoverBackgroundColor: [backgroundColors[_colorIndex], backgroundColors[_colorIndex2]],
                pointHoverBorderColor: [borderColors[_colorIndex], borderColors[_colorIndex2]],
                borderWidth: 1,
                lineTension: 0.1
            }]
        },
        options: whiteoptions
    });
    return newChart;
}

function createWeekdaysChart(context, weekdays, name, name2, data, data2, _colorIndex, _colorIndex2) {
    var newChart = new Chart(context, {
        type: "horizontalBar",
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
                label: name,
                data: data,
                backgroundColor: backgroundColors[_colorIndex],
                borderColor: borderColors[_colorIndex],
                borderWidth: 1
            },
            {
                label: name2,
                data: data2,
                backgroundColor: backgroundColors[_colorIndex2],
                borderColor: borderColors[_colorIndex2],
                borderWidth: 1
            }]
        },
        options: whiteoptions
    });
    return newChart;
}

function lineChart(messagesPerDay, senderName, _colorIndex) {
    var div = document.getElementById("charts");
    var ldiv = document.createElement("div");
    ldiv.classList.add("ldiv");
    div.appendChild(ldiv);
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", "lineChart");
    ldiv.appendChild(canvas);
    
    var ctx = document.getElementById("lineChart");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(messagesPerDay),
            datasets: [{
                label: senderName,
                data: Object.values(messagesPerDay),
                backgroundColor: backgroundColors[_colorIndex],
                borderColor: borderColors[_colorIndex],
                pointHoverBackgroundColor: backgroundColors[_colorIndex],
                pointHoverBorderColor: borderColors[_colorIndex],
                borderWidth: 1,
                lineTension: 0.1
            }]
        },
        options: whiteoptions
    });
}

var allFiles = ["img-apple-64/0023-fe0f-20e3.png", "img-apple-64/002a-fe0f-20e3.png", "img-apple-64/0030-fe0f-20e3.png", "img-apple-64/0031-fe0f-20e3.png", "img-apple-64/0032-fe0f-20e3.png", "img-apple-64/0033-fe0f-20e3.png", "img-apple-64/0034-fe0f-20e3.png", "img-apple-64/0035-fe0f-20e3.png", "img-apple-64/0036-fe0f-20e3.png", "img-apple-64/0037-fe0f-20e3.png", "img-apple-64/0038-fe0f-20e3.png", "img-apple-64/0039-fe0f-20e3.png", "img-apple-64/00a9-fe0f.png", "img-apple-64/00ae-fe0f.png", "img-apple-64/1f004.png", "img-apple-64/1f0cf.png", "img-apple-64/1f170-fe0f.png", "img-apple-64/1f171-fe0f.png", "img-apple-64/1f17e-fe0f.png", "img-apple-64/1f17f-fe0f.png", "img-apple-64/1f18e.png", "img-apple-64/1f191.png", "img-apple-64/1f192.png", "img-apple-64/1f193.png", "img-apple-64/1f194.png", "img-apple-64/1f195.png", "img-apple-64/1f196.png", "img-apple-64/1f197.png", "img-apple-64/1f198.png", "img-apple-64/1f199.png", "img-apple-64/1f19a.png", "img-apple-64/1f1e6-1f1e8.png", "img-apple-64/1f1e6-1f1e9.png", "img-apple-64/1f1e6-1f1ea.png", "img-apple-64/1f1e6-1f1eb.png", "img-apple-64/1f1e6-1f1ec.png", "img-apple-64/1f1e6-1f1ee.png", "img-apple-64/1f1e6-1f1f1.png", "img-apple-64/1f1e6-1f1f2.png", "img-apple-64/1f1e6-1f1f4.png", "img-apple-64/1f1e6-1f1f6.png", "img-apple-64/1f1e6-1f1f7.png", "img-apple-64/1f1e6-1f1f8.png", "img-apple-64/1f1e6-1f1f9.png", "img-apple-64/1f1e6-1f1fa.png", "img-apple-64/1f1e6-1f1fc.png", "img-apple-64/1f1e6-1f1fd.png", "img-apple-64/1f1e6-1f1ff.png", "img-apple-64/1f1e7-1f1e6.png", "img-apple-64/1f1e7-1f1e7.png", "img-apple-64/1f1e7-1f1e9.png", "img-apple-64/1f1e7-1f1ea.png", "img-apple-64/1f1e7-1f1eb.png", "img-apple-64/1f1e7-1f1ec.png", "img-apple-64/1f1e7-1f1ed.png", "img-apple-64/1f1e7-1f1ee.png", "img-apple-64/1f1e7-1f1ef.png", "img-apple-64/1f1e7-1f1f1.png", "img-apple-64/1f1e7-1f1f2.png", "img-apple-64/1f1e7-1f1f3.png", "img-apple-64/1f1e7-1f1f4.png", "img-apple-64/1f1e7-1f1f6.png", "img-apple-64/1f1e7-1f1f7.png", "img-apple-64/1f1e7-1f1f8.png", "img-apple-64/1f1e7-1f1f9.png", "img-apple-64/1f1e7-1f1fb.png", "img-apple-64/1f1e7-1f1fc.png", "img-apple-64/1f1e7-1f1fe.png", "img-apple-64/1f1e7-1f1ff.png", "img-apple-64/1f1e8-1f1e6.png", "img-apple-64/1f1e8-1f1e8.png", "img-apple-64/1f1e8-1f1e9.png", "img-apple-64/1f1e8-1f1eb.png", "img-apple-64/1f1e8-1f1ec.png", "img-apple-64/1f1e8-1f1ed.png", "img-apple-64/1f1e8-1f1ee.png", "img-apple-64/1f1e8-1f1f0.png", "img-apple-64/1f1e8-1f1f1.png", "img-apple-64/1f1e8-1f1f2.png", "img-apple-64/1f1e8-1f1f3.png", "img-apple-64/1f1e8-1f1f4.png", "img-apple-64/1f1e8-1f1f5.png", "img-apple-64/1f1e8-1f1f7.png", "img-apple-64/1f1e8-1f1fa.png", "img-apple-64/1f1e8-1f1fb.png", "img-apple-64/1f1e8-1f1fc.png", "img-apple-64/1f1e8-1f1fd.png", "img-apple-64/1f1e8-1f1fe.png", "img-apple-64/1f1e8-1f1ff.png", "img-apple-64/1f1e9-1f1ea.png", "img-apple-64/1f1e9-1f1ec.png", "img-apple-64/1f1e9-1f1ef.png", "img-apple-64/1f1e9-1f1f0.png", "img-apple-64/1f1e9-1f1f2.png", "img-apple-64/1f1e9-1f1f4.png", "img-apple-64/1f1e9-1f1ff.png", "img-apple-64/1f1ea-1f1e6.png", "img-apple-64/1f1ea-1f1e8.png", "img-apple-64/1f1ea-1f1ea.png", "img-apple-64/1f1ea-1f1ec.png", "img-apple-64/1f1ea-1f1ed.png", "img-apple-64/1f1ea-1f1f7.png", "img-apple-64/1f1ea-1f1f8.png", "img-apple-64/1f1ea-1f1f9.png", "img-apple-64/1f1ea-1f1fa.png", "img-apple-64/1f1eb-1f1ee.png", "img-apple-64/1f1eb-1f1ef.png", "img-apple-64/1f1eb-1f1f0.png", "img-apple-64/1f1eb-1f1f2.png", "img-apple-64/1f1eb-1f1f4.png", "img-apple-64/1f1eb-1f1f7.png", "img-apple-64/1f1ec-1f1e6.png", "img-apple-64/1f1ec-1f1e7.png", "img-apple-64/1f1ec-1f1e9.png", "img-apple-64/1f1ec-1f1ea.png", "img-apple-64/1f1ec-1f1eb.png", "img-apple-64/1f1ec-1f1ec.png", "img-apple-64/1f1ec-1f1ed.png", "img-apple-64/1f1ec-1f1ee.png", "img-apple-64/1f1ec-1f1f1.png", "img-apple-64/1f1ec-1f1f2.png", "img-apple-64/1f1ec-1f1f3.png", "img-apple-64/1f1ec-1f1f5.png", "img-apple-64/1f1ec-1f1f6.png", "img-apple-64/1f1ec-1f1f7.png", "img-apple-64/1f1ec-1f1f8.png", "img-apple-64/1f1ec-1f1f9.png", "img-apple-64/1f1ec-1f1fa.png", "img-apple-64/1f1ec-1f1fc.png", "img-apple-64/1f1ec-1f1fe.png", "img-apple-64/1f1ed-1f1f0.png", "img-apple-64/1f1ed-1f1f2.png", "img-apple-64/1f1ed-1f1f3.png", "img-apple-64/1f1ed-1f1f7.png", "img-apple-64/1f1ed-1f1f9.png", "img-apple-64/1f1ed-1f1fa.png", "img-apple-64/1f1ee-1f1e8.png", "img-apple-64/1f1ee-1f1e9.png", "img-apple-64/1f1ee-1f1ea.png", "img-apple-64/1f1ee-1f1f1.png", "img-apple-64/1f1ee-1f1f2.png", "img-apple-64/1f1ee-1f1f3.png", "img-apple-64/1f1ee-1f1f4.png", "img-apple-64/1f1ee-1f1f6.png", "img-apple-64/1f1ee-1f1f7.png", "img-apple-64/1f1ee-1f1f8.png", "img-apple-64/1f1ee-1f1f9.png", "img-apple-64/1f1ef-1f1ea.png", "img-apple-64/1f1ef-1f1f2.png", "img-apple-64/1f1ef-1f1f4.png", "img-apple-64/1f1ef-1f1f5.png", "img-apple-64/1f1f0-1f1ea.png", "img-apple-64/1f1f0-1f1ec.png", "img-apple-64/1f1f0-1f1ed.png", "img-apple-64/1f1f0-1f1ee.png", "img-apple-64/1f1f0-1f1f2.png", "img-apple-64/1f1f0-1f1f3.png", "img-apple-64/1f1f0-1f1f5.png", "img-apple-64/1f1f0-1f1f7.png", "img-apple-64/1f1f0-1f1fc.png", "img-apple-64/1f1f0-1f1fe.png", "img-apple-64/1f1f0-1f1ff.png", "img-apple-64/1f1f1-1f1e6.png", "img-apple-64/1f1f1-1f1e7.png", "img-apple-64/1f1f1-1f1e8.png", "img-apple-64/1f1f1-1f1ee.png", "img-apple-64/1f1f1-1f1f0.png", "img-apple-64/1f1f1-1f1f7.png", "img-apple-64/1f1f1-1f1f8.png", "img-apple-64/1f1f1-1f1f9.png", "img-apple-64/1f1f1-1f1fa.png", "img-apple-64/1f1f1-1f1fb.png", "img-apple-64/1f1f1-1f1fe.png", "img-apple-64/1f1f2-1f1e6.png", "img-apple-64/1f1f2-1f1e8.png", "img-apple-64/1f1f2-1f1e9.png", "img-apple-64/1f1f2-1f1ea.png", "img-apple-64/1f1f2-1f1eb.png", "img-apple-64/1f1f2-1f1ec.png", "img-apple-64/1f1f2-1f1ed.png", "img-apple-64/1f1f2-1f1f0.png", "img-apple-64/1f1f2-1f1f1.png", "img-apple-64/1f1f2-1f1f2.png", "img-apple-64/1f1f2-1f1f3.png", "img-apple-64/1f1f2-1f1f4.png", "img-apple-64/1f1f2-1f1f5.png", "img-apple-64/1f1f2-1f1f6.png", "img-apple-64/1f1f2-1f1f7.png", "img-apple-64/1f1f2-1f1f8.png", "img-apple-64/1f1f2-1f1f9.png", "img-apple-64/1f1f2-1f1fa.png", "img-apple-64/1f1f2-1f1fb.png", "img-apple-64/1f1f2-1f1fc.png", "img-apple-64/1f1f2-1f1fd.png", "img-apple-64/1f1f2-1f1fe.png", "img-apple-64/1f1f2-1f1ff.png", "img-apple-64/1f1f3-1f1e6.png", "img-apple-64/1f1f3-1f1e8.png", "img-apple-64/1f1f3-1f1ea.png", "img-apple-64/1f1f3-1f1eb.png", "img-apple-64/1f1f3-1f1ec.png", "img-apple-64/1f1f3-1f1ee.png", "img-apple-64/1f1f3-1f1f1.png", "img-apple-64/1f1f3-1f1f4.png", "img-apple-64/1f1f3-1f1f5.png", "img-apple-64/1f1f3-1f1f7.png", "img-apple-64/1f1f3-1f1fa.png", "img-apple-64/1f1f3-1f1ff.png", "img-apple-64/1f1f4-1f1f2.png", "img-apple-64/1f1f5-1f1e6.png", "img-apple-64/1f1f5-1f1ea.png", "img-apple-64/1f1f5-1f1eb.png", "img-apple-64/1f1f5-1f1ec.png", "img-apple-64/1f1f5-1f1ed.png", "img-apple-64/1f1f5-1f1f0.png", "img-apple-64/1f1f5-1f1f1.png", "img-apple-64/1f1f5-1f1f2.png", "img-apple-64/1f1f5-1f1f3.png", "img-apple-64/1f1f5-1f1f7.png", "img-apple-64/1f1f5-1f1f8.png", "img-apple-64/1f1f5-1f1f9.png", "img-apple-64/1f1f5-1f1fc.png", "img-apple-64/1f1f5-1f1fe.png", "img-apple-64/1f1f6-1f1e6.png", "img-apple-64/1f1f7-1f1ea.png", "img-apple-64/1f1f7-1f1f4.png", "img-apple-64/1f1f7-1f1f8.png", "img-apple-64/1f1f7-1f1fa.png", "img-apple-64/1f1f7-1f1fc.png", "img-apple-64/1f1f8-1f1e6.png", "img-apple-64/1f1f8-1f1e7.png", "img-apple-64/1f1f8-1f1e8.png", "img-apple-64/1f1f8-1f1e9.png", "img-apple-64/1f1f8-1f1ea.png", "img-apple-64/1f1f8-1f1ec.png", "img-apple-64/1f1f8-1f1ed.png", "img-apple-64/1f1f8-1f1ee.png", "img-apple-64/1f1f8-1f1ef.png", "img-apple-64/1f1f8-1f1f0.png", "img-apple-64/1f1f8-1f1f1.png", "img-apple-64/1f1f8-1f1f2.png", "img-apple-64/1f1f8-1f1f3.png", "img-apple-64/1f1f8-1f1f4.png", "img-apple-64/1f1f8-1f1f7.png", "img-apple-64/1f1f8-1f1f8.png", "img-apple-64/1f1f8-1f1f9.png", "img-apple-64/1f1f8-1f1fb.png", "img-apple-64/1f1f8-1f1fd.png", "img-apple-64/1f1f8-1f1fe.png", "img-apple-64/1f1f8-1f1ff.png", "img-apple-64/1f1f9-1f1e6.png", "img-apple-64/1f1f9-1f1e8.png", "img-apple-64/1f1f9-1f1e9.png", "img-apple-64/1f1f9-1f1eb.png", "img-apple-64/1f1f9-1f1ec.png", "img-apple-64/1f1f9-1f1ed.png", "img-apple-64/1f1f9-1f1ef.png", "img-apple-64/1f1f9-1f1f0.png", "img-apple-64/1f1f9-1f1f1.png", "img-apple-64/1f1f9-1f1f2.png", "img-apple-64/1f1f9-1f1f3.png", "img-apple-64/1f1f9-1f1f4.png", "img-apple-64/1f1f9-1f1f7.png", "img-apple-64/1f1f9-1f1f9.png", "img-apple-64/1f1f9-1f1fb.png", "img-apple-64/1f1f9-1f1fc.png", "img-apple-64/1f1f9-1f1ff.png", "img-apple-64/1f1fa-1f1e6.png", "img-apple-64/1f1fa-1f1ec.png", "img-apple-64/1f1fa-1f1f2.png", "img-apple-64/1f1fa-1f1f3.png", "img-apple-64/1f1fa-1f1f8.png", "img-apple-64/1f1fa-1f1fe.png", "img-apple-64/1f1fa-1f1ff.png", "img-apple-64/1f1fb-1f1e6.png", "img-apple-64/1f1fb-1f1e8.png", "img-apple-64/1f1fb-1f1ea.png", "img-apple-64/1f1fb-1f1ec.png", "img-apple-64/1f1fb-1f1ee.png", "img-apple-64/1f1fb-1f1f3.png", "img-apple-64/1f1fb-1f1fa.png", "img-apple-64/1f1fc-1f1eb.png", "img-apple-64/1f1fc-1f1f8.png", "img-apple-64/1f1fd-1f1f0.png", "img-apple-64/1f1fe-1f1ea.png", "img-apple-64/1f1fe-1f1f9.png", "img-apple-64/1f1ff-1f1e6.png", "img-apple-64/1f1ff-1f1f2.png", "img-apple-64/1f1ff-1f1fc.png", "img-apple-64/1f201.png", "img-apple-64/1f202-fe0f.png", "img-apple-64/1f21a.png", "img-apple-64/1f22f.png", "img-apple-64/1f232.png", "img-apple-64/1f233.png", "img-apple-64/1f234.png", "img-apple-64/1f235.png", "img-apple-64/1f236.png", "img-apple-64/1f237-fe0f.png", "img-apple-64/1f238.png", "img-apple-64/1f239.png", "img-apple-64/1f23a.png", "img-apple-64/1f250.png", "img-apple-64/1f251.png", "img-apple-64/1f300.png", "img-apple-64/1f301.png", "img-apple-64/1f302.png", "img-apple-64/1f303.png", "img-apple-64/1f304.png", "img-apple-64/1f305.png", "img-apple-64/1f306.png", "img-apple-64/1f307.png", "img-apple-64/1f308.png", "img-apple-64/1f309.png", "img-apple-64/1f30a.png", "img-apple-64/1f30b.png", "img-apple-64/1f30c.png", "img-apple-64/1f30d.png", "img-apple-64/1f30e.png", "img-apple-64/1f30f.png", "img-apple-64/1f310.png", "img-apple-64/1f311.png", "img-apple-64/1f312.png", "img-apple-64/1f313.png", "img-apple-64/1f314.png", "img-apple-64/1f315.png", "img-apple-64/1f316.png", "img-apple-64/1f317.png", "img-apple-64/1f318.png", "img-apple-64/1f319.png", "img-apple-64/1f31a.png", "img-apple-64/1f31b.png", "img-apple-64/1f31c.png", "img-apple-64/1f31d.png", "img-apple-64/1f31e.png", "img-apple-64/1f31f.png", "img-apple-64/1f320.png", "img-apple-64/1f321-fe0f.png", "img-apple-64/1f324-fe0f.png", "img-apple-64/1f325-fe0f.png", "img-apple-64/1f326-fe0f.png", "img-apple-64/1f327-fe0f.png", "img-apple-64/1f328-fe0f.png", "img-apple-64/1f329-fe0f.png", "img-apple-64/1f32a-fe0f.png", "img-apple-64/1f32b-fe0f.png", "img-apple-64/1f32c-fe0f.png", "img-apple-64/1f32d.png", "img-apple-64/1f32e.png", "img-apple-64/1f32f.png", "img-apple-64/1f330.png", "img-apple-64/1f331.png", "img-apple-64/1f332.png", "img-apple-64/1f333.png", "img-apple-64/1f334.png", "img-apple-64/1f335.png", "img-apple-64/1f336-fe0f.png", "img-apple-64/1f337.png", "img-apple-64/1f338.png", "img-apple-64/1f339.png", "img-apple-64/1f33a.png", "img-apple-64/1f33b.png", "img-apple-64/1f33c.png", "img-apple-64/1f33d.png", "img-apple-64/1f33e.png", "img-apple-64/1f33f.png", "img-apple-64/1f340.png", "img-apple-64/1f341.png", "img-apple-64/1f342.png", "img-apple-64/1f343.png", "img-apple-64/1f344.png", "img-apple-64/1f345.png", "img-apple-64/1f346.png", "img-apple-64/1f347.png", "img-apple-64/1f348.png", "img-apple-64/1f349.png", "img-apple-64/1f34a.png", "img-apple-64/1f34b.png", "img-apple-64/1f34c.png", "img-apple-64/1f34d.png", "img-apple-64/1f34e.png", "img-apple-64/1f34f.png", "img-apple-64/1f350.png", "img-apple-64/1f351.png", "img-apple-64/1f352.png", "img-apple-64/1f353.png", "img-apple-64/1f354.png", "img-apple-64/1f355.png", "img-apple-64/1f356.png", "img-apple-64/1f357.png", "img-apple-64/1f358.png", "img-apple-64/1f359.png", "img-apple-64/1f35a.png", "img-apple-64/1f35b.png", "img-apple-64/1f35c.png", "img-apple-64/1f35d.png", "img-apple-64/1f35e.png", "img-apple-64/1f35f.png", "img-apple-64/1f360.png", "img-apple-64/1f361.png", "img-apple-64/1f362.png", "img-apple-64/1f363.png", "img-apple-64/1f364.png", "img-apple-64/1f365.png", "img-apple-64/1f366.png", "img-apple-64/1f367.png", "img-apple-64/1f368.png", "img-apple-64/1f369.png", "img-apple-64/1f36a.png", "img-apple-64/1f36b.png", "img-apple-64/1f36c.png", "img-apple-64/1f36d.png", "img-apple-64/1f36e.png", "img-apple-64/1f36f.png", "img-apple-64/1f370.png", "img-apple-64/1f371.png", "img-apple-64/1f372.png", "img-apple-64/1f373.png", "img-apple-64/1f374.png", "img-apple-64/1f375.png", "img-apple-64/1f376.png", "img-apple-64/1f377.png", "img-apple-64/1f378.png", "img-apple-64/1f379.png", "img-apple-64/1f37a.png", "img-apple-64/1f37b.png", "img-apple-64/1f37c.png", "img-apple-64/1f37d-fe0f.png", "img-apple-64/1f37e.png", "img-apple-64/1f37f.png", "img-apple-64/1f380.png", "img-apple-64/1f381.png", "img-apple-64/1f382.png", "img-apple-64/1f383.png", "img-apple-64/1f384.png", "img-apple-64/1f385-1f3fb.png", "img-apple-64/1f385-1f3fc.png", "img-apple-64/1f385-1f3fd.png", "img-apple-64/1f385-1f3fe.png", "img-apple-64/1f385-1f3ff.png", "img-apple-64/1f385.png", "img-apple-64/1f386.png", "img-apple-64/1f387.png", "img-apple-64/1f388.png", "img-apple-64/1f389.png", "img-apple-64/1f38a.png", "img-apple-64/1f38b.png", "img-apple-64/1f38c.png", "img-apple-64/1f38d.png", "img-apple-64/1f38e.png", "img-apple-64/1f38f.png", "img-apple-64/1f390.png", "img-apple-64/1f391.png", "img-apple-64/1f392.png", "img-apple-64/1f393.png", "img-apple-64/1f396-fe0f.png", "img-apple-64/1f397-fe0f.png", "img-apple-64/1f399-fe0f.png", "img-apple-64/1f39a-fe0f.png", "img-apple-64/1f39b-fe0f.png", "img-apple-64/1f39e-fe0f.png", "img-apple-64/1f39f-fe0f.png", "img-apple-64/1f3a0.png", "img-apple-64/1f3a1.png", "img-apple-64/1f3a2.png", "img-apple-64/1f3a3.png", "img-apple-64/1f3a4.png", "img-apple-64/1f3a5.png", "img-apple-64/1f3a6.png", "img-apple-64/1f3a7.png", "img-apple-64/1f3a8.png", "img-apple-64/1f3a9.png", "img-apple-64/1f3aa.png", "img-apple-64/1f3ab.png", "img-apple-64/1f3ac.png", "img-apple-64/1f3ad.png", "img-apple-64/1f3ae.png", "img-apple-64/1f3af.png", "img-apple-64/1f3b0.png", "img-apple-64/1f3b1.png", "img-apple-64/1f3b2.png", "img-apple-64/1f3b3.png", "img-apple-64/1f3b4.png", "img-apple-64/1f3b5.png", "img-apple-64/1f3b6.png", "img-apple-64/1f3b7.png", "img-apple-64/1f3b8.png", "img-apple-64/1f3b9.png", "img-apple-64/1f3ba.png", "img-apple-64/1f3bb.png", "img-apple-64/1f3bc.png", "img-apple-64/1f3bd.png", "img-apple-64/1f3be.png", "img-apple-64/1f3bf.png", "img-apple-64/1f3c0.png", "img-apple-64/1f3c1.png", "img-apple-64/1f3c2-1f3fb.png", "img-apple-64/1f3c2-1f3fc.png", "img-apple-64/1f3c2-1f3fd.png", "img-apple-64/1f3c2-1f3fe.png", "img-apple-64/1f3c2-1f3ff.png", "img-apple-64/1f3c2.png", "img-apple-64/1f3c3-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f3c3-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f3c3-1f3fb.png", "img-apple-64/1f3c3-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f3c3-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f3c3-1f3fc.png", "img-apple-64/1f3c3-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f3c3-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f3c3-1f3fd.png", "img-apple-64/1f3c3-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f3c3-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f3c3-1f3fe.png", "img-apple-64/1f3c3-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f3c3-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f3c3-1f3ff.png", "img-apple-64/1f3c3-200d-2640-fe0f.png", "img-apple-64/1f3c3-200d-2642-fe0f.png", "img-apple-64/1f3c3.png", "img-apple-64/1f3c4-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f3c4-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f3c4-1f3fb.png", "img-apple-64/1f3c4-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f3c4-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f3c4-1f3fc.png", "img-apple-64/1f3c4-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f3c4-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f3c4-1f3fd.png", "img-apple-64/1f3c4-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f3c4-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f3c4-1f3fe.png", "img-apple-64/1f3c4-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f3c4-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f3c4-1f3ff.png", "img-apple-64/1f3c4-200d-2640-fe0f.png", "img-apple-64/1f3c4-200d-2642-fe0f.png", "img-apple-64/1f3c4.png", "img-apple-64/1f3c5.png", "img-apple-64/1f3c6.png", "img-apple-64/1f3c7-1f3fb.png", "img-apple-64/1f3c7-1f3fc.png", "img-apple-64/1f3c7-1f3fd.png", "img-apple-64/1f3c7-1f3fe.png", "img-apple-64/1f3c7-1f3ff.png", "img-apple-64/1f3c7.png", "img-apple-64/1f3c8.png", "img-apple-64/1f3c9.png", "img-apple-64/1f3ca-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f3ca-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f3ca-1f3fb.png", "img-apple-64/1f3ca-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f3ca-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f3ca-1f3fc.png", "img-apple-64/1f3ca-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f3ca-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f3ca-1f3fd.png", "img-apple-64/1f3ca-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f3ca-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f3ca-1f3fe.png", "img-apple-64/1f3ca-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f3ca-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f3ca-1f3ff.png", "img-apple-64/1f3ca-200d-2640-fe0f.png", "img-apple-64/1f3ca-200d-2642-fe0f.png", "img-apple-64/1f3ca.png", "img-apple-64/1f3cb-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f3cb-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f3cb-1f3fb.png", "img-apple-64/1f3cb-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f3cb-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f3cb-1f3fc.png", "img-apple-64/1f3cb-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f3cb-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f3cb-1f3fd.png", "img-apple-64/1f3cb-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f3cb-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f3cb-1f3fe.png", "img-apple-64/1f3cb-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f3cb-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f3cb-1f3ff.png", "img-apple-64/1f3cb-fe0f-200d-2640-fe0f.png", "img-apple-64/1f3cb-fe0f-200d-2642-fe0f.png", "img-apple-64/1f3cb-fe0f.png", "img-apple-64/1f3cc-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f3cc-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f3cc-1f3fb.png", "img-apple-64/1f3cc-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f3cc-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f3cc-1f3fc.png", "img-apple-64/1f3cc-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f3cc-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f3cc-1f3fd.png", "img-apple-64/1f3cc-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f3cc-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f3cc-1f3fe.png", "img-apple-64/1f3cc-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f3cc-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f3cc-1f3ff.png", "img-apple-64/1f3cc-fe0f-200d-2640-fe0f.png", "img-apple-64/1f3cc-fe0f-200d-2642-fe0f.png", "img-apple-64/1f3cc-fe0f.png", "img-apple-64/1f3cd-fe0f.png", "img-apple-64/1f3ce-fe0f.png", "img-apple-64/1f3cf.png", "img-apple-64/1f3d0.png", "img-apple-64/1f3d1.png", "img-apple-64/1f3d2.png", "img-apple-64/1f3d3.png", "img-apple-64/1f3d4-fe0f.png", "img-apple-64/1f3d5-fe0f.png", "img-apple-64/1f3d6-fe0f.png", "img-apple-64/1f3d7-fe0f.png", "img-apple-64/1f3d8-fe0f.png", "img-apple-64/1f3d9-fe0f.png", "img-apple-64/1f3da-fe0f.png", "img-apple-64/1f3db-fe0f.png", "img-apple-64/1f3dc-fe0f.png", "img-apple-64/1f3dd-fe0f.png", "img-apple-64/1f3de-fe0f.png", "img-apple-64/1f3df-fe0f.png", "img-apple-64/1f3e0.png", "img-apple-64/1f3e1.png", "img-apple-64/1f3e2.png", "img-apple-64/1f3e3.png", "img-apple-64/1f3e4.png", "img-apple-64/1f3e5.png", "img-apple-64/1f3e6.png", "img-apple-64/1f3e7.png", "img-apple-64/1f3e8.png", "img-apple-64/1f3e9.png", "img-apple-64/1f3ea.png", "img-apple-64/1f3eb.png", "img-apple-64/1f3ec.png", "img-apple-64/1f3ed.png", "img-apple-64/1f3ee.png", "img-apple-64/1f3ef.png", "img-apple-64/1f3f0.png", "img-apple-64/1f3f3-fe0f-200d-1f308.png", "img-apple-64/1f3f3-fe0f.png", "img-apple-64/1f3f4-e0067-e0062-e0065-e006e-e0067-e007f.png", "img-apple-64/1f3f4-e0067-e0062-e0073-e0063-e0074-e007f.png", "img-apple-64/1f3f4-e0067-e0062-e0077-e006c-e0073-e007f.png", "img-apple-64/1f3f4.png", "img-apple-64/1f3f5-fe0f.png", "img-apple-64/1f3f7-fe0f.png", "img-apple-64/1f3f8.png", "img-apple-64/1f3f9.png", "img-apple-64/1f3fa.png", "img-apple-64/1f3fb.png", "img-apple-64/1f3fc.png", "img-apple-64/1f3fd.png", "img-apple-64/1f3fe.png", "img-apple-64/1f3ff.png", "img-apple-64/1f400.png", "img-apple-64/1f401.png", "img-apple-64/1f402.png", "img-apple-64/1f403.png", "img-apple-64/1f404.png", "img-apple-64/1f405.png", "img-apple-64/1f406.png", "img-apple-64/1f407.png", "img-apple-64/1f408.png", "img-apple-64/1f409.png", "img-apple-64/1f40a.png", "img-apple-64/1f40b.png", "img-apple-64/1f40c.png", "img-apple-64/1f40d.png", "img-apple-64/1f40e.png", "img-apple-64/1f40f.png", "img-apple-64/1f410.png", "img-apple-64/1f411.png", "img-apple-64/1f412.png", "img-apple-64/1f413.png", "img-apple-64/1f414.png", "img-apple-64/1f415.png", "img-apple-64/1f416.png", "img-apple-64/1f417.png", "img-apple-64/1f418.png", "img-apple-64/1f419.png", "img-apple-64/1f41a.png", "img-apple-64/1f41b.png", "img-apple-64/1f41c.png", "img-apple-64/1f41d.png", "img-apple-64/1f41e.png", "img-apple-64/1f41f.png", "img-apple-64/1f420.png", "img-apple-64/1f421.png", "img-apple-64/1f422.png", "img-apple-64/1f423.png", "img-apple-64/1f424.png", "img-apple-64/1f425.png", "img-apple-64/1f426.png", "img-apple-64/1f427.png", "img-apple-64/1f428.png", "img-apple-64/1f429.png", "img-apple-64/1f42a.png", "img-apple-64/1f42b.png", "img-apple-64/1f42c.png", "img-apple-64/1f42d.png", "img-apple-64/1f42e.png", "img-apple-64/1f42f.png", "img-apple-64/1f430.png", "img-apple-64/1f431.png", "img-apple-64/1f432.png", "img-apple-64/1f433.png", "img-apple-64/1f434.png", "img-apple-64/1f435.png", "img-apple-64/1f436.png", "img-apple-64/1f437.png", "img-apple-64/1f438.png", "img-apple-64/1f439.png", "img-apple-64/1f43a.png", "img-apple-64/1f43b.png", "img-apple-64/1f43c.png", "img-apple-64/1f43d.png", "img-apple-64/1f43e.png", "img-apple-64/1f43f-fe0f.png", "img-apple-64/1f440.png", "img-apple-64/1f441-fe0f-200d-1f5e8-fe0f.png", "img-apple-64/1f441-fe0f.png", "img-apple-64/1f442-1f3fb.png", "img-apple-64/1f442-1f3fc.png", "img-apple-64/1f442-1f3fd.png", "img-apple-64/1f442-1f3fe.png", "img-apple-64/1f442-1f3ff.png", "img-apple-64/1f442.png", "img-apple-64/1f443-1f3fb.png", "img-apple-64/1f443-1f3fc.png", "img-apple-64/1f443-1f3fd.png", "img-apple-64/1f443-1f3fe.png", "img-apple-64/1f443-1f3ff.png", "img-apple-64/1f443.png", "img-apple-64/1f444.png", "img-apple-64/1f445.png", "img-apple-64/1f446-1f3fb.png", "img-apple-64/1f446-1f3fc.png", "img-apple-64/1f446-1f3fd.png", "img-apple-64/1f446-1f3fe.png", "img-apple-64/1f446-1f3ff.png", "img-apple-64/1f446.png", "img-apple-64/1f447-1f3fb.png", "img-apple-64/1f447-1f3fc.png", "img-apple-64/1f447-1f3fd.png", "img-apple-64/1f447-1f3fe.png", "img-apple-64/1f447-1f3ff.png", "img-apple-64/1f447.png", "img-apple-64/1f448-1f3fb.png", "img-apple-64/1f448-1f3fc.png", "img-apple-64/1f448-1f3fd.png", "img-apple-64/1f448-1f3fe.png", "img-apple-64/1f448-1f3ff.png", "img-apple-64/1f448.png", "img-apple-64/1f449-1f3fb.png", "img-apple-64/1f449-1f3fc.png", "img-apple-64/1f449-1f3fd.png", "img-apple-64/1f449-1f3fe.png", "img-apple-64/1f449-1f3ff.png", "img-apple-64/1f449.png", "img-apple-64/1f44a-1f3fb.png", "img-apple-64/1f44a-1f3fc.png", "img-apple-64/1f44a-1f3fd.png", "img-apple-64/1f44a-1f3fe.png", "img-apple-64/1f44a-1f3ff.png", "img-apple-64/1f44a.png", "img-apple-64/1f44b-1f3fb.png", "img-apple-64/1f44b-1f3fc.png", "img-apple-64/1f44b-1f3fd.png", "img-apple-64/1f44b-1f3fe.png", "img-apple-64/1f44b-1f3ff.png", "img-apple-64/1f44b.png", "img-apple-64/1f44c-1f3fb.png", "img-apple-64/1f44c-1f3fc.png", "img-apple-64/1f44c-1f3fd.png", "img-apple-64/1f44c-1f3fe.png", "img-apple-64/1f44c-1f3ff.png", "img-apple-64/1f44c.png", "img-apple-64/1f44d-1f3fb.png", "img-apple-64/1f44d-1f3fc.png", "img-apple-64/1f44d-1f3fd.png", "img-apple-64/1f44d-1f3fe.png", "img-apple-64/1f44d-1f3ff.png", "img-apple-64/1f44d.png", "img-apple-64/1f44e-1f3fb.png", "img-apple-64/1f44e-1f3fc.png", "img-apple-64/1f44e-1f3fd.png", "img-apple-64/1f44e-1f3fe.png", "img-apple-64/1f44e-1f3ff.png", "img-apple-64/1f44e.png", "img-apple-64/1f44f-1f3fb.png", "img-apple-64/1f44f-1f3fc.png", "img-apple-64/1f44f-1f3fd.png", "img-apple-64/1f44f-1f3fe.png", "img-apple-64/1f44f-1f3ff.png", "img-apple-64/1f44f.png", "img-apple-64/1f450-1f3fb.png", "img-apple-64/1f450-1f3fc.png", "img-apple-64/1f450-1f3fd.png", "img-apple-64/1f450-1f3fe.png", "img-apple-64/1f450-1f3ff.png", "img-apple-64/1f450.png", "img-apple-64/1f451.png", "img-apple-64/1f452.png", "img-apple-64/1f453.png", "img-apple-64/1f454.png", "img-apple-64/1f455.png", "img-apple-64/1f456.png", "img-apple-64/1f457.png", "img-apple-64/1f458.png", "img-apple-64/1f459.png", "img-apple-64/1f45a.png", "img-apple-64/1f45b.png", "img-apple-64/1f45c.png", "img-apple-64/1f45d.png", "img-apple-64/1f45e.png", "img-apple-64/1f45f.png", "img-apple-64/1f460.png", "img-apple-64/1f461.png", "img-apple-64/1f462.png", "img-apple-64/1f463.png", "img-apple-64/1f464.png", "img-apple-64/1f465.png", "img-apple-64/1f466-1f3fb.png", "img-apple-64/1f466-1f3fc.png", "img-apple-64/1f466-1f3fd.png", "img-apple-64/1f466-1f3fe.png", "img-apple-64/1f466-1f3ff.png", "img-apple-64/1f466.png", "img-apple-64/1f467-1f3fb.png", "img-apple-64/1f467-1f3fc.png", "img-apple-64/1f467-1f3fd.png", "img-apple-64/1f467-1f3fe.png", "img-apple-64/1f467-1f3ff.png", "img-apple-64/1f467.png", "img-apple-64/1f468-1f3fb-200d-1f33e.png", "img-apple-64/1f468-1f3fb-200d-1f373.png", "img-apple-64/1f468-1f3fb-200d-1f393.png", "img-apple-64/1f468-1f3fb-200d-1f3a4.png", "img-apple-64/1f468-1f3fb-200d-1f3a8.png", "img-apple-64/1f468-1f3fb-200d-1f3eb.png", "img-apple-64/1f468-1f3fb-200d-1f3ed.png", "img-apple-64/1f468-1f3fb-200d-1f4bb.png", "img-apple-64/1f468-1f3fb-200d-1f4bc.png", "img-apple-64/1f468-1f3fb-200d-1f527.png", "img-apple-64/1f468-1f3fb-200d-1f52c.png", "img-apple-64/1f468-1f3fb-200d-1f680.png", "img-apple-64/1f468-1f3fb-200d-1f692.png", "img-apple-64/1f468-1f3fb-200d-2695-fe0f.png", "img-apple-64/1f468-1f3fb-200d-2696-fe0f.png", "img-apple-64/1f468-1f3fb-200d-2708-fe0f.png", "img-apple-64/1f468-1f3fb.png", "img-apple-64/1f468-1f3fc-200d-1f33e.png", "img-apple-64/1f468-1f3fc-200d-1f373.png", "img-apple-64/1f468-1f3fc-200d-1f393.png", "img-apple-64/1f468-1f3fc-200d-1f3a4.png", "img-apple-64/1f468-1f3fc-200d-1f3a8.png", "img-apple-64/1f468-1f3fc-200d-1f3eb.png", "img-apple-64/1f468-1f3fc-200d-1f3ed.png", "img-apple-64/1f468-1f3fc-200d-1f4bb.png", "img-apple-64/1f468-1f3fc-200d-1f4bc.png", "img-apple-64/1f468-1f3fc-200d-1f527.png", "img-apple-64/1f468-1f3fc-200d-1f52c.png", "img-apple-64/1f468-1f3fc-200d-1f680.png", "img-apple-64/1f468-1f3fc-200d-1f692.png", "img-apple-64/1f468-1f3fc-200d-2695-fe0f.png", "img-apple-64/1f468-1f3fc-200d-2696-fe0f.png", "img-apple-64/1f468-1f3fc-200d-2708-fe0f.png", "img-apple-64/1f468-1f3fc.png", "img-apple-64/1f468-1f3fd-200d-1f33e.png", "img-apple-64/1f468-1f3fd-200d-1f373.png", "img-apple-64/1f468-1f3fd-200d-1f393.png", "img-apple-64/1f468-1f3fd-200d-1f3a4.png", "img-apple-64/1f468-1f3fd-200d-1f3a8.png", "img-apple-64/1f468-1f3fd-200d-1f3eb.png", "img-apple-64/1f468-1f3fd-200d-1f3ed.png", "img-apple-64/1f468-1f3fd-200d-1f4bb.png", "img-apple-64/1f468-1f3fd-200d-1f4bc.png", "img-apple-64/1f468-1f3fd-200d-1f527.png", "img-apple-64/1f468-1f3fd-200d-1f52c.png", "img-apple-64/1f468-1f3fd-200d-1f680.png", "img-apple-64/1f468-1f3fd-200d-1f692.png", "img-apple-64/1f468-1f3fd-200d-2695-fe0f.png", "img-apple-64/1f468-1f3fd-200d-2696-fe0f.png", "img-apple-64/1f468-1f3fd-200d-2708-fe0f.png", "img-apple-64/1f468-1f3fd.png", "img-apple-64/1f468-1f3fe-200d-1f33e.png", "img-apple-64/1f468-1f3fe-200d-1f373.png", "img-apple-64/1f468-1f3fe-200d-1f393.png", "img-apple-64/1f468-1f3fe-200d-1f3a4.png", "img-apple-64/1f468-1f3fe-200d-1f3a8.png", "img-apple-64/1f468-1f3fe-200d-1f3eb.png", "img-apple-64/1f468-1f3fe-200d-1f3ed.png", "img-apple-64/1f468-1f3fe-200d-1f4bb.png", "img-apple-64/1f468-1f3fe-200d-1f4bc.png", "img-apple-64/1f468-1f3fe-200d-1f527.png", "img-apple-64/1f468-1f3fe-200d-1f52c.png", "img-apple-64/1f468-1f3fe-200d-1f680.png", "img-apple-64/1f468-1f3fe-200d-1f692.png", "img-apple-64/1f468-1f3fe-200d-2695-fe0f.png", "img-apple-64/1f468-1f3fe-200d-2696-fe0f.png", "img-apple-64/1f468-1f3fe-200d-2708-fe0f.png", "img-apple-64/1f468-1f3fe.png", "img-apple-64/1f468-1f3ff-200d-1f33e.png", "img-apple-64/1f468-1f3ff-200d-1f373.png", "img-apple-64/1f468-1f3ff-200d-1f393.png", "img-apple-64/1f468-1f3ff-200d-1f3a4.png", "img-apple-64/1f468-1f3ff-200d-1f3a8.png", "img-apple-64/1f468-1f3ff-200d-1f3eb.png", "img-apple-64/1f468-1f3ff-200d-1f3ed.png", "img-apple-64/1f468-1f3ff-200d-1f4bb.png", "img-apple-64/1f468-1f3ff-200d-1f4bc.png", "img-apple-64/1f468-1f3ff-200d-1f527.png", "img-apple-64/1f468-1f3ff-200d-1f52c.png", "img-apple-64/1f468-1f3ff-200d-1f680.png", "img-apple-64/1f468-1f3ff-200d-1f692.png", "img-apple-64/1f468-1f3ff-200d-2695-fe0f.png", "img-apple-64/1f468-1f3ff-200d-2696-fe0f.png", "img-apple-64/1f468-1f3ff-200d-2708-fe0f.png", "img-apple-64/1f468-1f3ff.png", "img-apple-64/1f468-200d-1f33e.png", "img-apple-64/1f468-200d-1f373.png", "img-apple-64/1f468-200d-1f393.png", "img-apple-64/1f468-200d-1f3a4.png", "img-apple-64/1f468-200d-1f3a8.png", "img-apple-64/1f468-200d-1f3eb.png", "img-apple-64/1f468-200d-1f3ed.png", "img-apple-64/1f468-200d-1f466-200d-1f466.png", "img-apple-64/1f468-200d-1f466.png", "img-apple-64/1f468-200d-1f467-200d-1f466.png", "img-apple-64/1f468-200d-1f467-200d-1f467.png", "img-apple-64/1f468-200d-1f467.png", "img-apple-64/1f468-200d-1f468-200d-1f466-200d-1f466.png", "img-apple-64/1f468-200d-1f468-200d-1f466.png", "img-apple-64/1f468-200d-1f468-200d-1f467-200d-1f466.png", "img-apple-64/1f468-200d-1f468-200d-1f467-200d-1f467.png", "img-apple-64/1f468-200d-1f468-200d-1f467.png", "img-apple-64/1f468-200d-1f469-200d-1f466-200d-1f466.png", "img-apple-64/1f468-200d-1f469-200d-1f466.png", "img-apple-64/1f468-200d-1f469-200d-1f467-200d-1f466.png", "img-apple-64/1f468-200d-1f469-200d-1f467-200d-1f467.png", "img-apple-64/1f468-200d-1f469-200d-1f467.png", "img-apple-64/1f468-200d-1f4bb.png", "img-apple-64/1f468-200d-1f4bc.png", "img-apple-64/1f468-200d-1f527.png", "img-apple-64/1f468-200d-1f52c.png", "img-apple-64/1f468-200d-1f680.png", "img-apple-64/1f468-200d-1f692.png", "img-apple-64/1f468-200d-2695-fe0f.png", "img-apple-64/1f468-200d-2696-fe0f.png", "img-apple-64/1f468-200d-2708-fe0f.png", "img-apple-64/1f468-200d-2764-fe0f-200d-1f468.png", "img-apple-64/1f468-200d-2764-fe0f-200d-1f48b-200d-1f468.png", "img-apple-64/1f468.png", "img-apple-64/1f469-1f3fb-200d-1f33e.png", "img-apple-64/1f469-1f3fb-200d-1f373.png", "img-apple-64/1f469-1f3fb-200d-1f393.png", "img-apple-64/1f469-1f3fb-200d-1f3a4.png", "img-apple-64/1f469-1f3fb-200d-1f3a8.png", "img-apple-64/1f469-1f3fb-200d-1f3eb.png", "img-apple-64/1f469-1f3fb-200d-1f3ed.png", "img-apple-64/1f469-1f3fb-200d-1f4bb.png", "img-apple-64/1f469-1f3fb-200d-1f4bc.png", "img-apple-64/1f469-1f3fb-200d-1f527.png", "img-apple-64/1f469-1f3fb-200d-1f52c.png", "img-apple-64/1f469-1f3fb-200d-1f680.png", "img-apple-64/1f469-1f3fb-200d-1f692.png", "img-apple-64/1f469-1f3fb-200d-2695-fe0f.png", "img-apple-64/1f469-1f3fb-200d-2696-fe0f.png", "img-apple-64/1f469-1f3fb-200d-2708-fe0f.png", "img-apple-64/1f469-1f3fb.png", "img-apple-64/1f469-1f3fc-200d-1f33e.png", "img-apple-64/1f469-1f3fc-200d-1f373.png", "img-apple-64/1f469-1f3fc-200d-1f393.png", "img-apple-64/1f469-1f3fc-200d-1f3a4.png", "img-apple-64/1f469-1f3fc-200d-1f3a8.png", "img-apple-64/1f469-1f3fc-200d-1f3eb.png", "img-apple-64/1f469-1f3fc-200d-1f3ed.png", "img-apple-64/1f469-1f3fc-200d-1f4bb.png", "img-apple-64/1f469-1f3fc-200d-1f4bc.png", "img-apple-64/1f469-1f3fc-200d-1f527.png", "img-apple-64/1f469-1f3fc-200d-1f52c.png", "img-apple-64/1f469-1f3fc-200d-1f680.png", "img-apple-64/1f469-1f3fc-200d-1f692.png", "img-apple-64/1f469-1f3fc-200d-2695-fe0f.png", "img-apple-64/1f469-1f3fc-200d-2696-fe0f.png", "img-apple-64/1f469-1f3fc-200d-2708-fe0f.png", "img-apple-64/1f469-1f3fc.png", "img-apple-64/1f469-1f3fd-200d-1f33e.png", "img-apple-64/1f469-1f3fd-200d-1f373.png", "img-apple-64/1f469-1f3fd-200d-1f393.png", "img-apple-64/1f469-1f3fd-200d-1f3a4.png", "img-apple-64/1f469-1f3fd-200d-1f3a8.png", "img-apple-64/1f469-1f3fd-200d-1f3eb.png", "img-apple-64/1f469-1f3fd-200d-1f3ed.png", "img-apple-64/1f469-1f3fd-200d-1f4bb.png", "img-apple-64/1f469-1f3fd-200d-1f4bc.png", "img-apple-64/1f469-1f3fd-200d-1f527.png", "img-apple-64/1f469-1f3fd-200d-1f52c.png", "img-apple-64/1f469-1f3fd-200d-1f680.png", "img-apple-64/1f469-1f3fd-200d-1f692.png", "img-apple-64/1f469-1f3fd-200d-2695-fe0f.png", "img-apple-64/1f469-1f3fd-200d-2696-fe0f.png", "img-apple-64/1f469-1f3fd-200d-2708-fe0f.png", "img-apple-64/1f469-1f3fd.png", "img-apple-64/1f469-1f3fe-200d-1f33e.png", "img-apple-64/1f469-1f3fe-200d-1f373.png", "img-apple-64/1f469-1f3fe-200d-1f393.png", "img-apple-64/1f469-1f3fe-200d-1f3a4.png", "img-apple-64/1f469-1f3fe-200d-1f3a8.png", "img-apple-64/1f469-1f3fe-200d-1f3eb.png", "img-apple-64/1f469-1f3fe-200d-1f3ed.png", "img-apple-64/1f469-1f3fe-200d-1f4bb.png", "img-apple-64/1f469-1f3fe-200d-1f4bc.png", "img-apple-64/1f469-1f3fe-200d-1f527.png", "img-apple-64/1f469-1f3fe-200d-1f52c.png", "img-apple-64/1f469-1f3fe-200d-1f680.png", "img-apple-64/1f469-1f3fe-200d-1f692.png", "img-apple-64/1f469-1f3fe-200d-2695-fe0f.png", "img-apple-64/1f469-1f3fe-200d-2696-fe0f.png", "img-apple-64/1f469-1f3fe-200d-2708-fe0f.png", "img-apple-64/1f469-1f3fe.png", "img-apple-64/1f469-1f3ff-200d-1f33e.png", "img-apple-64/1f469-1f3ff-200d-1f373.png", "img-apple-64/1f469-1f3ff-200d-1f393.png", "img-apple-64/1f469-1f3ff-200d-1f3a4.png", "img-apple-64/1f469-1f3ff-200d-1f3a8.png", "img-apple-64/1f469-1f3ff-200d-1f3eb.png", "img-apple-64/1f469-1f3ff-200d-1f3ed.png", "img-apple-64/1f469-1f3ff-200d-1f4bb.png", "img-apple-64/1f469-1f3ff-200d-1f4bc.png", "img-apple-64/1f469-1f3ff-200d-1f527.png", "img-apple-64/1f469-1f3ff-200d-1f52c.png", "img-apple-64/1f469-1f3ff-200d-1f680.png", "img-apple-64/1f469-1f3ff-200d-1f692.png", "img-apple-64/1f469-1f3ff-200d-2695-fe0f.png", "img-apple-64/1f469-1f3ff-200d-2696-fe0f.png", "img-apple-64/1f469-1f3ff-200d-2708-fe0f.png", "img-apple-64/1f469-1f3ff.png", "img-apple-64/1f469-200d-1f33e.png", "img-apple-64/1f469-200d-1f373.png", "img-apple-64/1f469-200d-1f393.png", "img-apple-64/1f469-200d-1f3a4.png", "img-apple-64/1f469-200d-1f3a8.png", "img-apple-64/1f469-200d-1f3eb.png", "img-apple-64/1f469-200d-1f3ed.png", "img-apple-64/1f469-200d-1f466-200d-1f466.png", "img-apple-64/1f469-200d-1f466.png", "img-apple-64/1f469-200d-1f467-200d-1f466.png", "img-apple-64/1f469-200d-1f467-200d-1f467.png", "img-apple-64/1f469-200d-1f467.png", "img-apple-64/1f469-200d-1f469-200d-1f466-200d-1f466.png", "img-apple-64/1f469-200d-1f469-200d-1f466.png", "img-apple-64/1f469-200d-1f469-200d-1f467-200d-1f466.png", "img-apple-64/1f469-200d-1f469-200d-1f467-200d-1f467.png", "img-apple-64/1f469-200d-1f469-200d-1f467.png", "img-apple-64/1f469-200d-1f4bb.png", "img-apple-64/1f469-200d-1f4bc.png", "img-apple-64/1f469-200d-1f527.png", "img-apple-64/1f469-200d-1f52c.png", "img-apple-64/1f469-200d-1f680.png", "img-apple-64/1f469-200d-1f692.png", "img-apple-64/1f469-200d-2695-fe0f.png", "img-apple-64/1f469-200d-2696-fe0f.png", "img-apple-64/1f469-200d-2708-fe0f.png", "img-apple-64/1f469-200d-2764-fe0f-200d-1f468.png", "img-apple-64/1f469-200d-2764-fe0f-200d-1f469.png", "img-apple-64/1f469-200d-2764-fe0f-200d-1f48b-200d-1f468.png", "img-apple-64/1f469-200d-2764-fe0f-200d-1f48b-200d-1f469.png", "img-apple-64/1f469.png", "img-apple-64/1f46a.png", "img-apple-64/1f46b.png", "img-apple-64/1f46c.png", "img-apple-64/1f46d.png", "img-apple-64/1f46e-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f46e-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f46e-1f3fb.png", "img-apple-64/1f46e-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f46e-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f46e-1f3fc.png", "img-apple-64/1f46e-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f46e-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f46e-1f3fd.png", "img-apple-64/1f46e-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f46e-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f46e-1f3fe.png", "img-apple-64/1f46e-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f46e-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f46e-1f3ff.png", "img-apple-64/1f46e-200d-2640-fe0f.png", "img-apple-64/1f46e-200d-2642-fe0f.png", "img-apple-64/1f46e.png", "img-apple-64/1f46f-200d-2640-fe0f.png", "img-apple-64/1f46f-200d-2642-fe0f.png", "img-apple-64/1f46f.png", "img-apple-64/1f470-1f3fb.png", "img-apple-64/1f470-1f3fc.png", "img-apple-64/1f470-1f3fd.png", "img-apple-64/1f470-1f3fe.png", "img-apple-64/1f470-1f3ff.png", "img-apple-64/1f470.png", "img-apple-64/1f471-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f471-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f471-1f3fb.png", "img-apple-64/1f471-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f471-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f471-1f3fc.png", "img-apple-64/1f471-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f471-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f471-1f3fd.png", "img-apple-64/1f471-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f471-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f471-1f3fe.png", "img-apple-64/1f471-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f471-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f471-1f3ff.png", "img-apple-64/1f471-200d-2640-fe0f.png", "img-apple-64/1f471-200d-2642-fe0f.png", "img-apple-64/1f471.png", "img-apple-64/1f472-1f3fb.png", "img-apple-64/1f472-1f3fc.png", "img-apple-64/1f472-1f3fd.png", "img-apple-64/1f472-1f3fe.png", "img-apple-64/1f472-1f3ff.png", "img-apple-64/1f472.png", "img-apple-64/1f473-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f473-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f473-1f3fb.png", "img-apple-64/1f473-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f473-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f473-1f3fc.png", "img-apple-64/1f473-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f473-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f473-1f3fd.png", "img-apple-64/1f473-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f473-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f473-1f3fe.png", "img-apple-64/1f473-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f473-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f473-1f3ff.png", "img-apple-64/1f473-200d-2640-fe0f.png", "img-apple-64/1f473-200d-2642-fe0f.png", "img-apple-64/1f473.png", "img-apple-64/1f474-1f3fb.png", "img-apple-64/1f474-1f3fc.png", "img-apple-64/1f474-1f3fd.png", "img-apple-64/1f474-1f3fe.png", "img-apple-64/1f474-1f3ff.png", "img-apple-64/1f474.png", "img-apple-64/1f475-1f3fb.png", "img-apple-64/1f475-1f3fc.png", "img-apple-64/1f475-1f3fd.png", "img-apple-64/1f475-1f3fe.png", "img-apple-64/1f475-1f3ff.png", "img-apple-64/1f475.png", "img-apple-64/1f476-1f3fb.png", "img-apple-64/1f476-1f3fc.png", "img-apple-64/1f476-1f3fd.png", "img-apple-64/1f476-1f3fe.png", "img-apple-64/1f476-1f3ff.png", "img-apple-64/1f476.png", "img-apple-64/1f477-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f477-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f477-1f3fb.png", "img-apple-64/1f477-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f477-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f477-1f3fc.png", "img-apple-64/1f477-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f477-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f477-1f3fd.png", "img-apple-64/1f477-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f477-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f477-1f3fe.png", "img-apple-64/1f477-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f477-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f477-1f3ff.png", "img-apple-64/1f477-200d-2640-fe0f.png", "img-apple-64/1f477-200d-2642-fe0f.png", "img-apple-64/1f477.png", "img-apple-64/1f478-1f3fb.png", "img-apple-64/1f478-1f3fc.png", "img-apple-64/1f478-1f3fd.png", "img-apple-64/1f478-1f3fe.png", "img-apple-64/1f478-1f3ff.png", "img-apple-64/1f478.png", "img-apple-64/1f479.png", "img-apple-64/1f47a.png", "img-apple-64/1f47b.png", "img-apple-64/1f47c-1f3fb.png", "img-apple-64/1f47c-1f3fc.png", "img-apple-64/1f47c-1f3fd.png", "img-apple-64/1f47c-1f3fe.png", "img-apple-64/1f47c-1f3ff.png", "img-apple-64/1f47c.png", "img-apple-64/1f47d.png", "img-apple-64/1f47e.png", "img-apple-64/1f47f.png", "img-apple-64/1f480.png", "img-apple-64/1f481-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f481-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f481-1f3fb.png", "img-apple-64/1f481-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f481-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f481-1f3fc.png", "img-apple-64/1f481-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f481-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f481-1f3fd.png", "img-apple-64/1f481-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f481-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f481-1f3fe.png", "img-apple-64/1f481-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f481-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f481-1f3ff.png", "img-apple-64/1f481-200d-2640-fe0f.png", "img-apple-64/1f481-200d-2642-fe0f.png", "img-apple-64/1f481.png", "img-apple-64/1f482-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f482-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f482-1f3fb.png", "img-apple-64/1f482-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f482-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f482-1f3fc.png", "img-apple-64/1f482-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f482-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f482-1f3fd.png", "img-apple-64/1f482-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f482-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f482-1f3fe.png", "img-apple-64/1f482-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f482-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f482-1f3ff.png", "img-apple-64/1f482-200d-2640-fe0f.png", "img-apple-64/1f482-200d-2642-fe0f.png", "img-apple-64/1f482.png", "img-apple-64/1f483-1f3fb.png", "img-apple-64/1f483-1f3fc.png", "img-apple-64/1f483-1f3fd.png", "img-apple-64/1f483-1f3fe.png", "img-apple-64/1f483-1f3ff.png", "img-apple-64/1f483.png", "img-apple-64/1f484.png", "img-apple-64/1f485-1f3fb.png", "img-apple-64/1f485-1f3fc.png", "img-apple-64/1f485-1f3fd.png", "img-apple-64/1f485-1f3fe.png", "img-apple-64/1f485-1f3ff.png", "img-apple-64/1f485.png", "img-apple-64/1f486-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f486-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f486-1f3fb.png", "img-apple-64/1f486-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f486-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f486-1f3fc.png", "img-apple-64/1f486-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f486-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f486-1f3fd.png", "img-apple-64/1f486-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f486-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f486-1f3fe.png", "img-apple-64/1f486-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f486-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f486-1f3ff.png", "img-apple-64/1f486-200d-2640-fe0f.png", "img-apple-64/1f486-200d-2642-fe0f.png", "img-apple-64/1f486.png", "img-apple-64/1f487-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f487-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f487-1f3fb.png", "img-apple-64/1f487-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f487-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f487-1f3fc.png", "img-apple-64/1f487-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f487-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f487-1f3fd.png", "img-apple-64/1f487-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f487-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f487-1f3fe.png", "img-apple-64/1f487-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f487-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f487-1f3ff.png", "img-apple-64/1f487-200d-2640-fe0f.png", "img-apple-64/1f487-200d-2642-fe0f.png", "img-apple-64/1f487.png", "img-apple-64/1f488.png", "img-apple-64/1f489.png", "img-apple-64/1f48a.png", "img-apple-64/1f48b.png", "img-apple-64/1f48c.png", "img-apple-64/1f48d.png", "img-apple-64/1f48e.png", "img-apple-64/1f48f.png", "img-apple-64/1f490.png", "img-apple-64/1f491.png", "img-apple-64/1f492.png", "img-apple-64/1f493.png", "img-apple-64/1f494.png", "img-apple-64/1f495.png", "img-apple-64/1f496.png", "img-apple-64/1f497.png", "img-apple-64/1f498.png", "img-apple-64/1f499.png", "img-apple-64/1f49a.png", "img-apple-64/1f49b.png", "img-apple-64/1f49c.png", "img-apple-64/1f49d.png", "img-apple-64/1f49e.png", "img-apple-64/1f49f.png", "img-apple-64/1f4a0.png", "img-apple-64/1f4a1.png", "img-apple-64/1f4a2.png", "img-apple-64/1f4a3.png", "img-apple-64/1f4a4.png", "img-apple-64/1f4a5.png", "img-apple-64/1f4a6.png", "img-apple-64/1f4a7.png", "img-apple-64/1f4a8.png", "img-apple-64/1f4a9.png", "img-apple-64/1f4aa-1f3fb.png", "img-apple-64/1f4aa-1f3fc.png", "img-apple-64/1f4aa-1f3fd.png", "img-apple-64/1f4aa-1f3fe.png", "img-apple-64/1f4aa-1f3ff.png", "img-apple-64/1f4aa.png", "img-apple-64/1f4ab.png", "img-apple-64/1f4ac.png", "img-apple-64/1f4ad.png", "img-apple-64/1f4ae.png", "img-apple-64/1f4af.png", "img-apple-64/1f4b0.png", "img-apple-64/1f4b1.png", "img-apple-64/1f4b2.png", "img-apple-64/1f4b3.png", "img-apple-64/1f4b4.png", "img-apple-64/1f4b5.png", "img-apple-64/1f4b6.png", "img-apple-64/1f4b7.png", "img-apple-64/1f4b8.png", "img-apple-64/1f4b9.png", "img-apple-64/1f4ba.png", "img-apple-64/1f4bb.png", "img-apple-64/1f4bc.png", "img-apple-64/1f4bd.png", "img-apple-64/1f4be.png", "img-apple-64/1f4bf.png", "img-apple-64/1f4c0.png", "img-apple-64/1f4c1.png", "img-apple-64/1f4c2.png", "img-apple-64/1f4c3.png", "img-apple-64/1f4c4.png", "img-apple-64/1f4c5.png", "img-apple-64/1f4c6.png", "img-apple-64/1f4c7.png", "img-apple-64/1f4c8.png", "img-apple-64/1f4c9.png", "img-apple-64/1f4ca.png", "img-apple-64/1f4cb.png", "img-apple-64/1f4cc.png", "img-apple-64/1f4cd.png", "img-apple-64/1f4ce.png", "img-apple-64/1f4cf.png", "img-apple-64/1f4d0.png", "img-apple-64/1f4d1.png", "img-apple-64/1f4d2.png", "img-apple-64/1f4d3.png", "img-apple-64/1f4d4.png", "img-apple-64/1f4d5.png", "img-apple-64/1f4d6.png", "img-apple-64/1f4d7.png", "img-apple-64/1f4d8.png", "img-apple-64/1f4d9.png", "img-apple-64/1f4da.png", "img-apple-64/1f4db.png", "img-apple-64/1f4dc.png", "img-apple-64/1f4dd.png", "img-apple-64/1f4de.png", "img-apple-64/1f4df.png", "img-apple-64/1f4e0.png", "img-apple-64/1f4e1.png", "img-apple-64/1f4e2.png", "img-apple-64/1f4e3.png", "img-apple-64/1f4e4.png", "img-apple-64/1f4e5.png", "img-apple-64/1f4e6.png", "img-apple-64/1f4e7.png", "img-apple-64/1f4e8.png", "img-apple-64/1f4e9.png", "img-apple-64/1f4ea.png", "img-apple-64/1f4eb.png", "img-apple-64/1f4ec.png", "img-apple-64/1f4ed.png", "img-apple-64/1f4ee.png", "img-apple-64/1f4ef.png", "img-apple-64/1f4f0.png", "img-apple-64/1f4f1.png", "img-apple-64/1f4f2.png", "img-apple-64/1f4f3.png", "img-apple-64/1f4f4.png", "img-apple-64/1f4f5.png", "img-apple-64/1f4f6.png", "img-apple-64/1f4f7.png", "img-apple-64/1f4f8.png", "img-apple-64/1f4f9.png", "img-apple-64/1f4fa.png", "img-apple-64/1f4fb.png", "img-apple-64/1f4fc.png", "img-apple-64/1f4fd-fe0f.png", "img-apple-64/1f4ff.png", "img-apple-64/1f500.png", "img-apple-64/1f501.png", "img-apple-64/1f502.png", "img-apple-64/1f503.png", "img-apple-64/1f504.png", "img-apple-64/1f505.png", "img-apple-64/1f506.png", "img-apple-64/1f507.png", "img-apple-64/1f508.png", "img-apple-64/1f509.png", "img-apple-64/1f50a.png", "img-apple-64/1f50b.png", "img-apple-64/1f50c.png", "img-apple-64/1f50d.png", "img-apple-64/1f50e.png", "img-apple-64/1f50f.png", "img-apple-64/1f510.png", "img-apple-64/1f511.png", "img-apple-64/1f512.png", "img-apple-64/1f513.png", "img-apple-64/1f514.png", "img-apple-64/1f515.png", "img-apple-64/1f516.png", "img-apple-64/1f517.png", "img-apple-64/1f518.png", "img-apple-64/1f519.png", "img-apple-64/1f51a.png", "img-apple-64/1f51b.png", "img-apple-64/1f51c.png", "img-apple-64/1f51d.png", "img-apple-64/1f51e.png", "img-apple-64/1f51f.png", "img-apple-64/1f520.png", "img-apple-64/1f521.png", "img-apple-64/1f522.png", "img-apple-64/1f523.png", "img-apple-64/1f524.png", "img-apple-64/1f525.png", "img-apple-64/1f526.png", "img-apple-64/1f527.png", "img-apple-64/1f528.png", "img-apple-64/1f529.png", "img-apple-64/1f52a.png", "img-apple-64/1f52b.png", "img-apple-64/1f52c.png", "img-apple-64/1f52d.png", "img-apple-64/1f52e.png", "img-apple-64/1f52f.png", "img-apple-64/1f530.png", "img-apple-64/1f531.png", "img-apple-64/1f532.png", "img-apple-64/1f533.png", "img-apple-64/1f534.png", "img-apple-64/1f535.png", "img-apple-64/1f536.png", "img-apple-64/1f537.png", "img-apple-64/1f538.png", "img-apple-64/1f539.png", "img-apple-64/1f53a.png", "img-apple-64/1f53b.png", "img-apple-64/1f53c.png", "img-apple-64/1f53d.png", "img-apple-64/1f549-fe0f.png", "img-apple-64/1f54a-fe0f.png", "img-apple-64/1f54b.png", "img-apple-64/1f54c.png", "img-apple-64/1f54d.png", "img-apple-64/1f54e.png", "img-apple-64/1f550.png", "img-apple-64/1f551.png", "img-apple-64/1f552.png", "img-apple-64/1f553.png", "img-apple-64/1f554.png", "img-apple-64/1f555.png", "img-apple-64/1f556.png", "img-apple-64/1f557.png", "img-apple-64/1f558.png", "img-apple-64/1f559.png", "img-apple-64/1f55a.png", "img-apple-64/1f55b.png", "img-apple-64/1f55c.png", "img-apple-64/1f55d.png", "img-apple-64/1f55e.png", "img-apple-64/1f55f.png", "img-apple-64/1f560.png", "img-apple-64/1f561.png", "img-apple-64/1f562.png", "img-apple-64/1f563.png", "img-apple-64/1f564.png", "img-apple-64/1f565.png", "img-apple-64/1f566.png", "img-apple-64/1f567.png", "img-apple-64/1f56f-fe0f.png", "img-apple-64/1f570-fe0f.png", "img-apple-64/1f573-fe0f.png", "img-apple-64/1f574-1f3fb.png", "img-apple-64/1f574-1f3fc.png", "img-apple-64/1f574-1f3fd.png", "img-apple-64/1f574-1f3fe.png", "img-apple-64/1f574-1f3ff.png", "img-apple-64/1f574-fe0f.png", "img-apple-64/1f575-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f575-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f575-1f3fb.png", "img-apple-64/1f575-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f575-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f575-1f3fc.png", "img-apple-64/1f575-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f575-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f575-1f3fd.png", "img-apple-64/1f575-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f575-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f575-1f3fe.png", "img-apple-64/1f575-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f575-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f575-1f3ff.png", "img-apple-64/1f575-fe0f-200d-2640-fe0f.png", "img-apple-64/1f575-fe0f-200d-2642-fe0f.png", "img-apple-64/1f575-fe0f.png", "img-apple-64/1f576-fe0f.png", "img-apple-64/1f577-fe0f.png", "img-apple-64/1f578-fe0f.png", "img-apple-64/1f579-fe0f.png", "img-apple-64/1f57a-1f3fb.png", "img-apple-64/1f57a-1f3fc.png", "img-apple-64/1f57a-1f3fd.png", "img-apple-64/1f57a-1f3fe.png", "img-apple-64/1f57a-1f3ff.png", "img-apple-64/1f57a.png", "img-apple-64/1f587-fe0f.png", "img-apple-64/1f58a-fe0f.png", "img-apple-64/1f58b-fe0f.png", "img-apple-64/1f58c-fe0f.png", "img-apple-64/1f58d-fe0f.png", "img-apple-64/1f590-1f3fb.png", "img-apple-64/1f590-1f3fc.png", "img-apple-64/1f590-1f3fd.png", "img-apple-64/1f590-1f3fe.png", "img-apple-64/1f590-1f3ff.png", "img-apple-64/1f590-fe0f.png", "img-apple-64/1f595-1f3fb.png", "img-apple-64/1f595-1f3fc.png", "img-apple-64/1f595-1f3fd.png", "img-apple-64/1f595-1f3fe.png", "img-apple-64/1f595-1f3ff.png", "img-apple-64/1f595.png", "img-apple-64/1f596-1f3fb.png", "img-apple-64/1f596-1f3fc.png", "img-apple-64/1f596-1f3fd.png", "img-apple-64/1f596-1f3fe.png", "img-apple-64/1f596-1f3ff.png", "img-apple-64/1f596.png", "img-apple-64/1f5a4.png", "img-apple-64/1f5a5-fe0f.png", "img-apple-64/1f5a8-fe0f.png", "img-apple-64/1f5b1-fe0f.png", "img-apple-64/1f5b2-fe0f.png", "img-apple-64/1f5bc-fe0f.png", "img-apple-64/1f5c2-fe0f.png", "img-apple-64/1f5c3-fe0f.png", "img-apple-64/1f5c4-fe0f.png", "img-apple-64/1f5d1-fe0f.png", "img-apple-64/1f5d2-fe0f.png", "img-apple-64/1f5d3-fe0f.png", "img-apple-64/1f5dc-fe0f.png", "img-apple-64/1f5dd-fe0f.png", "img-apple-64/1f5de-fe0f.png", "img-apple-64/1f5e1-fe0f.png", "img-apple-64/1f5e3-fe0f.png", "img-apple-64/1f5e8-fe0f.png", "img-apple-64/1f5ef-fe0f.png", "img-apple-64/1f5f3-fe0f.png", "img-apple-64/1f5fa-fe0f.png", "img-apple-64/1f5fb.png", "img-apple-64/1f5fc.png", "img-apple-64/1f5fd.png", "img-apple-64/1f5fe.png", "img-apple-64/1f5ff.png", "img-apple-64/1f600.png", "img-apple-64/1f601.png", "img-apple-64/1f602.png", "img-apple-64/1f603.png", "img-apple-64/1f604.png", "img-apple-64/1f605.png", "img-apple-64/1f606.png", "img-apple-64/1f607.png", "img-apple-64/1f608.png", "img-apple-64/1f609.png", "img-apple-64/1f60a.png", "img-apple-64/1f60b.png", "img-apple-64/1f60c.png", "img-apple-64/1f60d.png", "img-apple-64/1f60e.png", "img-apple-64/1f60f.png", "img-apple-64/1f610.png", "img-apple-64/1f611.png", "img-apple-64/1f612.png", "img-apple-64/1f613.png", "img-apple-64/1f614.png", "img-apple-64/1f615.png", "img-apple-64/1f616.png", "img-apple-64/1f617.png", "img-apple-64/1f618.png", "img-apple-64/1f619.png", "img-apple-64/1f61a.png", "img-apple-64/1f61b.png", "img-apple-64/1f61c.png", "img-apple-64/1f61d.png", "img-apple-64/1f61e.png", "img-apple-64/1f61f.png", "img-apple-64/1f620.png", "img-apple-64/1f621.png", "img-apple-64/1f622.png", "img-apple-64/1f623.png", "img-apple-64/1f624.png", "img-apple-64/1f625.png", "img-apple-64/1f626.png", "img-apple-64/1f627.png", "img-apple-64/1f628.png", "img-apple-64/1f629.png", "img-apple-64/1f62a.png", "img-apple-64/1f62b.png", "img-apple-64/1f62c.png", "img-apple-64/1f62d.png", "img-apple-64/1f62e.png", "img-apple-64/1f62f.png", "img-apple-64/1f630.png", "img-apple-64/1f631.png", "img-apple-64/1f632.png", "img-apple-64/1f633.png", "img-apple-64/1f634.png", "img-apple-64/1f635.png", "img-apple-64/1f636.png", "img-apple-64/1f637.png", "img-apple-64/1f638.png", "img-apple-64/1f639.png", "img-apple-64/1f63a.png", "img-apple-64/1f63b.png", "img-apple-64/1f63c.png", "img-apple-64/1f63d.png", "img-apple-64/1f63e.png", "img-apple-64/1f63f.png", "img-apple-64/1f640.png", "img-apple-64/1f641.png", "img-apple-64/1f642.png", "img-apple-64/1f643.png", "img-apple-64/1f644.png", "img-apple-64/1f645-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f645-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f645-1f3fb.png", "img-apple-64/1f645-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f645-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f645-1f3fc.png", "img-apple-64/1f645-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f645-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f645-1f3fd.png", "img-apple-64/1f645-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f645-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f645-1f3fe.png", "img-apple-64/1f645-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f645-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f645-1f3ff.png", "img-apple-64/1f645-200d-2640-fe0f.png", "img-apple-64/1f645-200d-2642-fe0f.png", "img-apple-64/1f645.png", "img-apple-64/1f646-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f646-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f646-1f3fb.png", "img-apple-64/1f646-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f646-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f646-1f3fc.png", "img-apple-64/1f646-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f646-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f646-1f3fd.png", "img-apple-64/1f646-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f646-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f646-1f3fe.png", "img-apple-64/1f646-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f646-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f646-1f3ff.png", "img-apple-64/1f646-200d-2640-fe0f.png", "img-apple-64/1f646-200d-2642-fe0f.png", "img-apple-64/1f646.png", "img-apple-64/1f647-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f647-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f647-1f3fb.png", "img-apple-64/1f647-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f647-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f647-1f3fc.png", "img-apple-64/1f647-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f647-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f647-1f3fd.png", "img-apple-64/1f647-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f647-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f647-1f3fe.png", "img-apple-64/1f647-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f647-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f647-1f3ff.png", "img-apple-64/1f647-200d-2640-fe0f.png", "img-apple-64/1f647-200d-2642-fe0f.png", "img-apple-64/1f647.png", "img-apple-64/1f648.png", "img-apple-64/1f649.png", "img-apple-64/1f64a.png", "img-apple-64/1f64b-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f64b-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f64b-1f3fb.png", "img-apple-64/1f64b-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f64b-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f64b-1f3fc.png", "img-apple-64/1f64b-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f64b-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f64b-1f3fd.png", "img-apple-64/1f64b-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f64b-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f64b-1f3fe.png", "img-apple-64/1f64b-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f64b-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f64b-1f3ff.png", "img-apple-64/1f64b-200d-2640-fe0f.png", "img-apple-64/1f64b-200d-2642-fe0f.png", "img-apple-64/1f64b.png", "img-apple-64/1f64c-1f3fb.png", "img-apple-64/1f64c-1f3fc.png", "img-apple-64/1f64c-1f3fd.png", "img-apple-64/1f64c-1f3fe.png", "img-apple-64/1f64c-1f3ff.png", "img-apple-64/1f64c.png", "img-apple-64/1f64d-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f64d-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f64d-1f3fb.png", "img-apple-64/1f64d-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f64d-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f64d-1f3fc.png", "img-apple-64/1f64d-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f64d-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f64d-1f3fd.png", "img-apple-64/1f64d-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f64d-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f64d-1f3fe.png", "img-apple-64/1f64d-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f64d-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f64d-1f3ff.png", "img-apple-64/1f64d-200d-2640-fe0f.png", "img-apple-64/1f64d-200d-2642-fe0f.png", "img-apple-64/1f64d.png", "img-apple-64/1f64e-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f64e-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f64e-1f3fb.png", "img-apple-64/1f64e-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f64e-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f64e-1f3fc.png", "img-apple-64/1f64e-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f64e-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f64e-1f3fd.png", "img-apple-64/1f64e-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f64e-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f64e-1f3fe.png", "img-apple-64/1f64e-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f64e-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f64e-1f3ff.png", "img-apple-64/1f64e-200d-2640-fe0f.png", "img-apple-64/1f64e-200d-2642-fe0f.png", "img-apple-64/1f64e.png", "img-apple-64/1f64f-1f3fb.png", "img-apple-64/1f64f-1f3fc.png", "img-apple-64/1f64f-1f3fd.png", "img-apple-64/1f64f-1f3fe.png", "img-apple-64/1f64f-1f3ff.png", "img-apple-64/1f64f.png", "img-apple-64/1f680.png", "img-apple-64/1f681.png", "img-apple-64/1f682.png", "img-apple-64/1f683.png", "img-apple-64/1f684.png", "img-apple-64/1f685.png", "img-apple-64/1f686.png", "img-apple-64/1f687.png", "img-apple-64/1f688.png", "img-apple-64/1f689.png", "img-apple-64/1f68a.png", "img-apple-64/1f68b.png", "img-apple-64/1f68c.png", "img-apple-64/1f68d.png", "img-apple-64/1f68e.png", "img-apple-64/1f68f.png", "img-apple-64/1f690.png", "img-apple-64/1f691.png", "img-apple-64/1f692.png", "img-apple-64/1f693.png", "img-apple-64/1f694.png", "img-apple-64/1f695.png", "img-apple-64/1f696.png", "img-apple-64/1f697.png", "img-apple-64/1f698.png", "img-apple-64/1f699.png", "img-apple-64/1f69a.png", "img-apple-64/1f69b.png", "img-apple-64/1f69c.png", "img-apple-64/1f69d.png", "img-apple-64/1f69e.png", "img-apple-64/1f69f.png", "img-apple-64/1f6a0.png", "img-apple-64/1f6a1.png", "img-apple-64/1f6a2.png", "img-apple-64/1f6a3-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f6a3-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f6a3-1f3fb.png", "img-apple-64/1f6a3-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f6a3-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f6a3-1f3fc.png", "img-apple-64/1f6a3-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f6a3-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f6a3-1f3fd.png", "img-apple-64/1f6a3-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f6a3-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f6a3-1f3fe.png", "img-apple-64/1f6a3-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f6a3-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f6a3-1f3ff.png", "img-apple-64/1f6a3-200d-2640-fe0f.png", "img-apple-64/1f6a3-200d-2642-fe0f.png", "img-apple-64/1f6a3.png", "img-apple-64/1f6a4.png", "img-apple-64/1f6a5.png", "img-apple-64/1f6a6.png", "img-apple-64/1f6a7.png", "img-apple-64/1f6a8.png", "img-apple-64/1f6a9.png", "img-apple-64/1f6aa.png", "img-apple-64/1f6ab.png", "img-apple-64/1f6ac.png", "img-apple-64/1f6ad.png", "img-apple-64/1f6ae.png", "img-apple-64/1f6af.png", "img-apple-64/1f6b0.png", "img-apple-64/1f6b1.png", "img-apple-64/1f6b2.png", "img-apple-64/1f6b3.png", "img-apple-64/1f6b4-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f6b4-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f6b4-1f3fb.png", "img-apple-64/1f6b4-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f6b4-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f6b4-1f3fc.png", "img-apple-64/1f6b4-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f6b4-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f6b4-1f3fd.png", "img-apple-64/1f6b4-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f6b4-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f6b4-1f3fe.png", "img-apple-64/1f6b4-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f6b4-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f6b4-1f3ff.png", "img-apple-64/1f6b4-200d-2640-fe0f.png", "img-apple-64/1f6b4-200d-2642-fe0f.png", "img-apple-64/1f6b4.png", "img-apple-64/1f6b5-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f6b5-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f6b5-1f3fb.png", "img-apple-64/1f6b5-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f6b5-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f6b5-1f3fc.png", "img-apple-64/1f6b5-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f6b5-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f6b5-1f3fd.png", "img-apple-64/1f6b5-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f6b5-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f6b5-1f3fe.png", "img-apple-64/1f6b5-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f6b5-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f6b5-1f3ff.png", "img-apple-64/1f6b5-200d-2640-fe0f.png", "img-apple-64/1f6b5-200d-2642-fe0f.png", "img-apple-64/1f6b5.png", "img-apple-64/1f6b6-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f6b6-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f6b6-1f3fb.png", "img-apple-64/1f6b6-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f6b6-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f6b6-1f3fc.png", "img-apple-64/1f6b6-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f6b6-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f6b6-1f3fd.png", "img-apple-64/1f6b6-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f6b6-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f6b6-1f3fe.png", "img-apple-64/1f6b6-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f6b6-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f6b6-1f3ff.png", "img-apple-64/1f6b6-200d-2640-fe0f.png", "img-apple-64/1f6b6-200d-2642-fe0f.png", "img-apple-64/1f6b6.png", "img-apple-64/1f6b7.png", "img-apple-64/1f6b8.png", "img-apple-64/1f6b9.png", "img-apple-64/1f6ba.png", "img-apple-64/1f6bb.png", "img-apple-64/1f6bc.png", "img-apple-64/1f6bd.png", "img-apple-64/1f6be.png", "img-apple-64/1f6bf.png", "img-apple-64/1f6c0-1f3fb.png", "img-apple-64/1f6c0-1f3fc.png", "img-apple-64/1f6c0-1f3fd.png", "img-apple-64/1f6c0-1f3fe.png", "img-apple-64/1f6c0-1f3ff.png", "img-apple-64/1f6c0.png", "img-apple-64/1f6c1.png", "img-apple-64/1f6c2.png", "img-apple-64/1f6c3.png", "img-apple-64/1f6c4.png", "img-apple-64/1f6c5.png", "img-apple-64/1f6cb-fe0f.png", "img-apple-64/1f6cc-1f3fb.png", "img-apple-64/1f6cc-1f3fc.png", "img-apple-64/1f6cc-1f3fd.png", "img-apple-64/1f6cc-1f3fe.png", "img-apple-64/1f6cc-1f3ff.png", "img-apple-64/1f6cc.png", "img-apple-64/1f6cd-fe0f.png", "img-apple-64/1f6ce-fe0f.png", "img-apple-64/1f6cf-fe0f.png", "img-apple-64/1f6d0.png", "img-apple-64/1f6d1.png", "img-apple-64/1f6d2.png", "img-apple-64/1f6e0-fe0f.png", "img-apple-64/1f6e1-fe0f.png", "img-apple-64/1f6e2-fe0f.png", "img-apple-64/1f6e3-fe0f.png", "img-apple-64/1f6e4-fe0f.png", "img-apple-64/1f6e5-fe0f.png", "img-apple-64/1f6e9-fe0f.png", "img-apple-64/1f6eb.png", "img-apple-64/1f6ec.png", "img-apple-64/1f6f0-fe0f.png", "img-apple-64/1f6f3-fe0f.png", "img-apple-64/1f6f4.png", "img-apple-64/1f6f5.png", "img-apple-64/1f6f6.png", "img-apple-64/1f6f7.png", "img-apple-64/1f6f8.png", "img-apple-64/1f6f9.png", "img-apple-64/1f910.png", "img-apple-64/1f911.png", "img-apple-64/1f912.png", "img-apple-64/1f913.png", "img-apple-64/1f914.png", "img-apple-64/1f915.png", "img-apple-64/1f916.png", "img-apple-64/1f917.png", "img-apple-64/1f918-1f3fb.png", "img-apple-64/1f918-1f3fc.png", "img-apple-64/1f918-1f3fd.png", "img-apple-64/1f918-1f3fe.png", "img-apple-64/1f918-1f3ff.png", "img-apple-64/1f918.png", "img-apple-64/1f919-1f3fb.png", "img-apple-64/1f919-1f3fc.png", "img-apple-64/1f919-1f3fd.png", "img-apple-64/1f919-1f3fe.png", "img-apple-64/1f919-1f3ff.png", "img-apple-64/1f919.png", "img-apple-64/1f91a-1f3fb.png", "img-apple-64/1f91a-1f3fc.png", "img-apple-64/1f91a-1f3fd.png", "img-apple-64/1f91a-1f3fe.png", "img-apple-64/1f91a-1f3ff.png", "img-apple-64/1f91a.png", "img-apple-64/1f91b-1f3fb.png", "img-apple-64/1f91b-1f3fc.png", "img-apple-64/1f91b-1f3fd.png", "img-apple-64/1f91b-1f3fe.png", "img-apple-64/1f91b-1f3ff.png", "img-apple-64/1f91b.png", "img-apple-64/1f91c-1f3fb.png", "img-apple-64/1f91c-1f3fc.png", "img-apple-64/1f91c-1f3fd.png", "img-apple-64/1f91c-1f3fe.png", "img-apple-64/1f91c-1f3ff.png", "img-apple-64/1f91c.png", "img-apple-64/1f91d.png", "img-apple-64/1f91e-1f3fb.png", "img-apple-64/1f91e-1f3fc.png", "img-apple-64/1f91e-1f3fd.png", "img-apple-64/1f91e-1f3fe.png", "img-apple-64/1f91e-1f3ff.png", "img-apple-64/1f91e.png", "img-apple-64/1f91f-1f3fb.png", "img-apple-64/1f91f-1f3fc.png", "img-apple-64/1f91f-1f3fd.png", "img-apple-64/1f91f-1f3fe.png", "img-apple-64/1f91f-1f3ff.png", "img-apple-64/1f91f.png", "img-apple-64/1f920.png", "img-apple-64/1f921.png", "img-apple-64/1f922.png", "img-apple-64/1f923.png", "img-apple-64/1f924.png", "img-apple-64/1f925.png", "img-apple-64/1f926-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f926-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f926-1f3fb.png", "img-apple-64/1f926-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f926-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f926-1f3fc.png", "img-apple-64/1f926-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f926-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f926-1f3fd.png", "img-apple-64/1f926-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f926-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f926-1f3fe.png", "img-apple-64/1f926-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f926-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f926-1f3ff.png", "img-apple-64/1f926-200d-2640-fe0f.png", "img-apple-64/1f926-200d-2642-fe0f.png", "img-apple-64/1f926.png", "img-apple-64/1f927.png", "img-apple-64/1f928.png", "img-apple-64/1f929.png", "img-apple-64/1f92a.png", "img-apple-64/1f92b.png", "img-apple-64/1f92c.png", "img-apple-64/1f92d.png", "img-apple-64/1f92e.png", "img-apple-64/1f92f.png", "img-apple-64/1f930-1f3fb.png", "img-apple-64/1f930-1f3fc.png", "img-apple-64/1f930-1f3fd.png", "img-apple-64/1f930-1f3fe.png", "img-apple-64/1f930-1f3ff.png", "img-apple-64/1f930.png", "img-apple-64/1f931-1f3fb.png", "img-apple-64/1f931-1f3fc.png", "img-apple-64/1f931-1f3fd.png", "img-apple-64/1f931-1f3fe.png", "img-apple-64/1f931-1f3ff.png", "img-apple-64/1f931.png", "img-apple-64/1f932-1f3fb.png", "img-apple-64/1f932-1f3fc.png", "img-apple-64/1f932-1f3fd.png", "img-apple-64/1f932-1f3fe.png", "img-apple-64/1f932-1f3ff.png", "img-apple-64/1f932.png", "img-apple-64/1f933-1f3fb.png", "img-apple-64/1f933-1f3fc.png", "img-apple-64/1f933-1f3fd.png", "img-apple-64/1f933-1f3fe.png", "img-apple-64/1f933-1f3ff.png", "img-apple-64/1f933.png", "img-apple-64/1f934-1f3fb.png", "img-apple-64/1f934-1f3fc.png", "img-apple-64/1f934-1f3fd.png", "img-apple-64/1f934-1f3fe.png", "img-apple-64/1f934-1f3ff.png", "img-apple-64/1f934.png", "img-apple-64/1f935-1f3fb.png", "img-apple-64/1f935-1f3fc.png", "img-apple-64/1f935-1f3fd.png", "img-apple-64/1f935-1f3fe.png", "img-apple-64/1f935-1f3ff.png", "img-apple-64/1f935.png", "img-apple-64/1f936-1f3fb.png", "img-apple-64/1f936-1f3fc.png", "img-apple-64/1f936-1f3fd.png", "img-apple-64/1f936-1f3fe.png", "img-apple-64/1f936-1f3ff.png", "img-apple-64/1f936.png", "img-apple-64/1f937-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f937-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f937-1f3fb.png", "img-apple-64/1f937-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f937-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f937-1f3fc.png", "img-apple-64/1f937-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f937-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f937-1f3fd.png", "img-apple-64/1f937-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f937-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f937-1f3fe.png", "img-apple-64/1f937-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f937-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f937-1f3ff.png", "img-apple-64/1f937-200d-2640-fe0f.png", "img-apple-64/1f937-200d-2642-fe0f.png", "img-apple-64/1f937.png", "img-apple-64/1f938-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f938-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f938-1f3fb.png", "img-apple-64/1f938-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f938-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f938-1f3fc.png", "img-apple-64/1f938-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f938-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f938-1f3fd.png", "img-apple-64/1f938-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f938-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f938-1f3fe.png", "img-apple-64/1f938-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f938-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f938-1f3ff.png", "img-apple-64/1f938-200d-2640-fe0f.png", "img-apple-64/1f938-200d-2642-fe0f.png", "img-apple-64/1f938.png", "img-apple-64/1f939-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f939-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f939-1f3fb.png", "img-apple-64/1f939-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f939-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f939-1f3fc.png", "img-apple-64/1f939-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f939-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f939-1f3fd.png", "img-apple-64/1f939-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f939-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f939-1f3fe.png", "img-apple-64/1f939-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f939-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f939-1f3ff.png", "img-apple-64/1f939-200d-2640-fe0f.png", "img-apple-64/1f939-200d-2642-fe0f.png", "img-apple-64/1f939.png", "img-apple-64/1f93a.png", "img-apple-64/1f93c-200d-2640-fe0f.png", "img-apple-64/1f93c-200d-2642-fe0f.png", "img-apple-64/1f93c.png", "img-apple-64/1f93d-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f93d-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f93d-1f3fb.png", "img-apple-64/1f93d-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f93d-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f93d-1f3fc.png", "img-apple-64/1f93d-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f93d-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f93d-1f3fd.png", "img-apple-64/1f93d-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f93d-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f93d-1f3fe.png", "img-apple-64/1f93d-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f93d-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f93d-1f3ff.png", "img-apple-64/1f93d-200d-2640-fe0f.png", "img-apple-64/1f93d-200d-2642-fe0f.png", "img-apple-64/1f93d.png", "img-apple-64/1f93e-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f93e-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f93e-1f3fb.png", "img-apple-64/1f93e-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f93e-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f93e-1f3fc.png", "img-apple-64/1f93e-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f93e-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f93e-1f3fd.png", "img-apple-64/1f93e-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f93e-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f93e-1f3fe.png", "img-apple-64/1f93e-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f93e-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f93e-1f3ff.png", "img-apple-64/1f93e-200d-2640-fe0f.png", "img-apple-64/1f93e-200d-2642-fe0f.png", "img-apple-64/1f93e.png", "img-apple-64/1f940.png", "img-apple-64/1f941.png", "img-apple-64/1f942.png", "img-apple-64/1f943.png", "img-apple-64/1f944.png", "img-apple-64/1f945.png", "img-apple-64/1f947.png", "img-apple-64/1f948.png", "img-apple-64/1f949.png", "img-apple-64/1f94a.png", "img-apple-64/1f94b.png", "img-apple-64/1f94c.png", "img-apple-64/1f94d.png", "img-apple-64/1f94e.png", "img-apple-64/1f94f.png", "img-apple-64/1f950.png", "img-apple-64/1f951.png", "img-apple-64/1f952.png", "img-apple-64/1f953.png", "img-apple-64/1f954.png", "img-apple-64/1f955.png", "img-apple-64/1f956.png", "img-apple-64/1f957.png", "img-apple-64/1f958.png", "img-apple-64/1f959.png", "img-apple-64/1f95a.png", "img-apple-64/1f95b.png", "img-apple-64/1f95c.png", "img-apple-64/1f95d.png", "img-apple-64/1f95e.png", "img-apple-64/1f95f.png", "img-apple-64/1f960.png", "img-apple-64/1f961.png", "img-apple-64/1f962.png", "img-apple-64/1f963.png", "img-apple-64/1f964.png", "img-apple-64/1f965.png", "img-apple-64/1f966.png", "img-apple-64/1f967.png", "img-apple-64/1f968.png", "img-apple-64/1f969.png", "img-apple-64/1f96a.png", "img-apple-64/1f96b.png", "img-apple-64/1f96c.png", "img-apple-64/1f96d.png", "img-apple-64/1f96e.png", "img-apple-64/1f96f.png", "img-apple-64/1f970.png", "img-apple-64/1f973.png", "img-apple-64/1f974.png", "img-apple-64/1f975.png", "img-apple-64/1f976.png", "img-apple-64/1f97a.png", "img-apple-64/1f97c.png", "img-apple-64/1f97d.png", "img-apple-64/1f97e.png", "img-apple-64/1f97f.png", "img-apple-64/1f980.png", "img-apple-64/1f981.png", "img-apple-64/1f982.png", "img-apple-64/1f983.png", "img-apple-64/1f984.png", "img-apple-64/1f985.png", "img-apple-64/1f986.png", "img-apple-64/1f987.png", "img-apple-64/1f988.png", "img-apple-64/1f989.png", "img-apple-64/1f98a.png", "img-apple-64/1f98b.png", "img-apple-64/1f98c.png", "img-apple-64/1f98d.png", "img-apple-64/1f98e.png", "img-apple-64/1f98f.png", "img-apple-64/1f990.png", "img-apple-64/1f991.png", "img-apple-64/1f992.png", "img-apple-64/1f993.png", "img-apple-64/1f994.png", "img-apple-64/1f995.png", "img-apple-64/1f996.png", "img-apple-64/1f997.png", "img-apple-64/1f998.png", "img-apple-64/1f999.png", "img-apple-64/1f99a.png", "img-apple-64/1f99b.png", "img-apple-64/1f99c.png", "img-apple-64/1f99d.png", "img-apple-64/1f99e.png", "img-apple-64/1f99f.png", "img-apple-64/1f9a0.png", "img-apple-64/1f9a1.png", "img-apple-64/1f9a2.png", "img-apple-64/1f9b0.png", "img-apple-64/1f9b1.png", "img-apple-64/1f9b2.png", "img-apple-64/1f9b3.png", "img-apple-64/1f9b4.png", "img-apple-64/1f9b5.png", "img-apple-64/1f9b6.png", "img-apple-64/1f9b7.png", "img-apple-64/1f9b8.png", "img-apple-64/1f9b9.png", "img-apple-64/1f9c0.png", "img-apple-64/1f9c1.png", "img-apple-64/1f9c2.png", "img-apple-64/1f9d0.png", "img-apple-64/1f9d1-1f3fb.png", "img-apple-64/1f9d1-1f3fc.png", "img-apple-64/1f9d1-1f3fd.png", "img-apple-64/1f9d1-1f3fe.png", "img-apple-64/1f9d1-1f3ff.png", "img-apple-64/1f9d1.png", "img-apple-64/1f9d2-1f3fb.png", "img-apple-64/1f9d2-1f3fc.png", "img-apple-64/1f9d2-1f3fd.png", "img-apple-64/1f9d2-1f3fe.png", "img-apple-64/1f9d2-1f3ff.png", "img-apple-64/1f9d2.png", "img-apple-64/1f9d3-1f3fb.png", "img-apple-64/1f9d3-1f3fc.png", "img-apple-64/1f9d3-1f3fd.png", "img-apple-64/1f9d3-1f3fe.png", "img-apple-64/1f9d3-1f3ff.png", "img-apple-64/1f9d3.png", "img-apple-64/1f9d4-1f3fb.png", "img-apple-64/1f9d4-1f3fc.png", "img-apple-64/1f9d4-1f3fd.png", "img-apple-64/1f9d4-1f3fe.png", "img-apple-64/1f9d4-1f3ff.png", "img-apple-64/1f9d4.png", "img-apple-64/1f9d5-1f3fb.png", "img-apple-64/1f9d5-1f3fc.png", "img-apple-64/1f9d5-1f3fd.png", "img-apple-64/1f9d5-1f3fe.png", "img-apple-64/1f9d5-1f3ff.png", "img-apple-64/1f9d5.png", "img-apple-64/1f9d6-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f9d6-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f9d6-1f3fb.png", "img-apple-64/1f9d6-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f9d6-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f9d6-1f3fc.png", "img-apple-64/1f9d6-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f9d6-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f9d6-1f3fd.png", "img-apple-64/1f9d6-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f9d6-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f9d6-1f3fe.png", "img-apple-64/1f9d6-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f9d6-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f9d6-1f3ff.png", "img-apple-64/1f9d6-200d-2640-fe0f.png", "img-apple-64/1f9d6-200d-2642-fe0f.png", "img-apple-64/1f9d6.png", "img-apple-64/1f9d7-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f9d7-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f9d7-1f3fb.png", "img-apple-64/1f9d7-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f9d7-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f9d7-1f3fc.png", "img-apple-64/1f9d7-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f9d7-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f9d7-1f3fd.png", "img-apple-64/1f9d7-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f9d7-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f9d7-1f3fe.png", "img-apple-64/1f9d7-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f9d7-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f9d7-1f3ff.png", "img-apple-64/1f9d7-200d-2640-fe0f.png", "img-apple-64/1f9d7-200d-2642-fe0f.png", "img-apple-64/1f9d7.png", "img-apple-64/1f9d8-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f9d8-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f9d8-1f3fb.png", "img-apple-64/1f9d8-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f9d8-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f9d8-1f3fc.png", "img-apple-64/1f9d8-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f9d8-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f9d8-1f3fd.png", "img-apple-64/1f9d8-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f9d8-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f9d8-1f3fe.png", "img-apple-64/1f9d8-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f9d8-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f9d8-1f3ff.png", "img-apple-64/1f9d8-200d-2640-fe0f.png", "img-apple-64/1f9d8-200d-2642-fe0f.png", "img-apple-64/1f9d8.png", "img-apple-64/1f9d9-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f9d9-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f9d9-1f3fb.png", "img-apple-64/1f9d9-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f9d9-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f9d9-1f3fc.png", "img-apple-64/1f9d9-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f9d9-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f9d9-1f3fd.png", "img-apple-64/1f9d9-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f9d9-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f9d9-1f3fe.png", "img-apple-64/1f9d9-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f9d9-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f9d9-1f3ff.png", "img-apple-64/1f9d9-200d-2640-fe0f.png", "img-apple-64/1f9d9-200d-2642-fe0f.png", "img-apple-64/1f9d9.png", "img-apple-64/1f9da-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f9da-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f9da-1f3fb.png", "img-apple-64/1f9da-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f9da-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f9da-1f3fc.png", "img-apple-64/1f9da-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f9da-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f9da-1f3fd.png", "img-apple-64/1f9da-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f9da-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f9da-1f3fe.png", "img-apple-64/1f9da-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f9da-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f9da-1f3ff.png", "img-apple-64/1f9da-200d-2640-fe0f.png", "img-apple-64/1f9da-200d-2642-fe0f.png", "img-apple-64/1f9da.png", "img-apple-64/1f9db-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f9db-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f9db-1f3fb.png", "img-apple-64/1f9db-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f9db-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f9db-1f3fc.png", "img-apple-64/1f9db-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f9db-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f9db-1f3fd.png", "img-apple-64/1f9db-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f9db-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f9db-1f3fe.png", "img-apple-64/1f9db-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f9db-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f9db-1f3ff.png", "img-apple-64/1f9db-200d-2640-fe0f.png", "img-apple-64/1f9db-200d-2642-fe0f.png", "img-apple-64/1f9db.png", "img-apple-64/1f9dc-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f9dc-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f9dc-1f3fb.png", "img-apple-64/1f9dc-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f9dc-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f9dc-1f3fc.png", "img-apple-64/1f9dc-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f9dc-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f9dc-1f3fd.png", "img-apple-64/1f9dc-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f9dc-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f9dc-1f3fe.png", "img-apple-64/1f9dc-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f9dc-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f9dc-1f3ff.png", "img-apple-64/1f9dc-200d-2640-fe0f.png", "img-apple-64/1f9dc-200d-2642-fe0f.png", "img-apple-64/1f9dc.png", "img-apple-64/1f9dd-1f3fb-200d-2640-fe0f.png", "img-apple-64/1f9dd-1f3fb-200d-2642-fe0f.png", "img-apple-64/1f9dd-1f3fb.png", "img-apple-64/1f9dd-1f3fc-200d-2640-fe0f.png", "img-apple-64/1f9dd-1f3fc-200d-2642-fe0f.png", "img-apple-64/1f9dd-1f3fc.png", "img-apple-64/1f9dd-1f3fd-200d-2640-fe0f.png", "img-apple-64/1f9dd-1f3fd-200d-2642-fe0f.png", "img-apple-64/1f9dd-1f3fd.png", "img-apple-64/1f9dd-1f3fe-200d-2640-fe0f.png", "img-apple-64/1f9dd-1f3fe-200d-2642-fe0f.png", "img-apple-64/1f9dd-1f3fe.png", "img-apple-64/1f9dd-1f3ff-200d-2640-fe0f.png", "img-apple-64/1f9dd-1f3ff-200d-2642-fe0f.png", "img-apple-64/1f9dd-1f3ff.png", "img-apple-64/1f9dd-200d-2640-fe0f.png", "img-apple-64/1f9dd-200d-2642-fe0f.png", "img-apple-64/1f9dd.png", "img-apple-64/1f9de-200d-2640-fe0f.png", "img-apple-64/1f9de-200d-2642-fe0f.png", "img-apple-64/1f9de.png", "img-apple-64/1f9df-200d-2640-fe0f.png", "img-apple-64/1f9df-200d-2642-fe0f.png", "img-apple-64/1f9df.png", "img-apple-64/1f9e0.png", "img-apple-64/1f9e1.png", "img-apple-64/1f9e2.png", "img-apple-64/1f9e3.png", "img-apple-64/1f9e4.png", "img-apple-64/1f9e5.png", "img-apple-64/1f9e6.png", "img-apple-64/1f9e7.png", "img-apple-64/1f9e8.png", "img-apple-64/1f9e9.png", "img-apple-64/1f9ea.png", "img-apple-64/1f9eb.png", "img-apple-64/1f9ec.png", "img-apple-64/1f9ed.png", "img-apple-64/1f9ee.png", "img-apple-64/1f9ef.png", "img-apple-64/1f9f0.png", "img-apple-64/1f9f1.png", "img-apple-64/1f9f2.png", "img-apple-64/1f9f3.png", "img-apple-64/1f9f4.png", "img-apple-64/1f9f5.png", "img-apple-64/1f9f6.png", "img-apple-64/1f9f7.png", "img-apple-64/1f9f8.png", "img-apple-64/1f9f9.png", "img-apple-64/1f9fa.png", "img-apple-64/1f9fb.png", "img-apple-64/1f9fc.png", "img-apple-64/1f9fd.png", "img-apple-64/1f9fe.png", "img-apple-64/1f9ff.png", "img-apple-64/203c-fe0f.png", "img-apple-64/2049-fe0f.png", "img-apple-64/2122-fe0f.png", "img-apple-64/2139-fe0f.png", "img-apple-64/2194-fe0f.png", "img-apple-64/2195-fe0f.png", "img-apple-64/2196-fe0f.png", "img-apple-64/2197-fe0f.png", "img-apple-64/2198-fe0f.png", "img-apple-64/2199-fe0f.png", "img-apple-64/21a9-fe0f.png", "img-apple-64/21aa-fe0f.png", "img-apple-64/231a.png", "img-apple-64/231b.png", "img-apple-64/2328-fe0f.png", "img-apple-64/23cf-fe0f.png", "img-apple-64/23e9.png", "img-apple-64/23ea.png", "img-apple-64/23eb.png", "img-apple-64/23ec.png", "img-apple-64/23ed-fe0f.png", "img-apple-64/23ee-fe0f.png", "img-apple-64/23ef-fe0f.png", "img-apple-64/23f0.png", "img-apple-64/23f1-fe0f.png", "img-apple-64/23f2-fe0f.png", "img-apple-64/23f3.png", "img-apple-64/23f8-fe0f.png", "img-apple-64/23f9-fe0f.png", "img-apple-64/23fa-fe0f.png", "img-apple-64/24c2-fe0f.png", "img-apple-64/25aa-fe0f.png", "img-apple-64/25ab-fe0f.png", "img-apple-64/25b6-fe0f.png", "img-apple-64/25c0-fe0f.png", "img-apple-64/25fb-fe0f.png", "img-apple-64/25fc-fe0f.png", "img-apple-64/25fd.png", "img-apple-64/25fe.png", "img-apple-64/2600-fe0f.png", "img-apple-64/2601-fe0f.png", "img-apple-64/2602-fe0f.png", "img-apple-64/2603-fe0f.png", "img-apple-64/2604-fe0f.png", "img-apple-64/260e-fe0f.png", "img-apple-64/2611-fe0f.png", "img-apple-64/2614.png", "img-apple-64/2615.png", "img-apple-64/2618-fe0f.png", "img-apple-64/261d-1f3fb.png", "img-apple-64/261d-1f3fc.png", "img-apple-64/261d-1f3fd.png", "img-apple-64/261d-1f3fe.png", "img-apple-64/261d-1f3ff.png", "img-apple-64/261d-fe0f.png", "img-apple-64/2620-fe0f.png", "img-apple-64/2622-fe0f.png", "img-apple-64/2623-fe0f.png", "img-apple-64/2626-fe0f.png", "img-apple-64/262a-fe0f.png", "img-apple-64/262e-fe0f.png", "img-apple-64/262f-fe0f.png", "img-apple-64/2638-fe0f.png", "img-apple-64/2639-fe0f.png", "img-apple-64/263a-fe0f.png", "img-apple-64/2648.png", "img-apple-64/2649.png", "img-apple-64/264a.png", "img-apple-64/264b.png", "img-apple-64/264c.png", "img-apple-64/264d.png", "img-apple-64/264e.png", "img-apple-64/264f.png", "img-apple-64/2650.png", "img-apple-64/2651.png", "img-apple-64/2652.png", "img-apple-64/2653.png", "img-apple-64/265f.png", "img-apple-64/2660-fe0f.png", "img-apple-64/2663-fe0f.png", "img-apple-64/2665-fe0f.png", "img-apple-64/2666-fe0f.png", "img-apple-64/2668-fe0f.png", "img-apple-64/267b-fe0f.png", "img-apple-64/267e.png", "img-apple-64/267f.png", "img-apple-64/2692-fe0f.png", "img-apple-64/2693.png", "img-apple-64/2694-fe0f.png", "img-apple-64/2696-fe0f.png", "img-apple-64/2697-fe0f.png", "img-apple-64/2699-fe0f.png", "img-apple-64/269b-fe0f.png", "img-apple-64/269c-fe0f.png", "img-apple-64/26a0-fe0f.png", "img-apple-64/26a1.png", "img-apple-64/26aa.png", "img-apple-64/26ab.png", "img-apple-64/26b0-fe0f.png", "img-apple-64/26b1-fe0f.png", "img-apple-64/26bd.png", "img-apple-64/26be.png", "img-apple-64/26c4.png", "img-apple-64/26c5.png", "img-apple-64/26c8-fe0f.png", "img-apple-64/26ce.png", "img-apple-64/26cf-fe0f.png", "img-apple-64/26d1-fe0f.png", "img-apple-64/26d3-fe0f.png", "img-apple-64/26d4.png", "img-apple-64/26e9-fe0f.png", "img-apple-64/26ea.png", "img-apple-64/26f0-fe0f.png", "img-apple-64/26f1-fe0f.png", "img-apple-64/26f2.png", "img-apple-64/26f3.png", "img-apple-64/26f4-fe0f.png", "img-apple-64/26f5.png", "img-apple-64/26f7-fe0f.png", "img-apple-64/26f8-fe0f.png", "img-apple-64/26f9-1f3fb-200d-2640-fe0f.png", "img-apple-64/26f9-1f3fb-200d-2642-fe0f.png", "img-apple-64/26f9-1f3fb.png", "img-apple-64/26f9-1f3fc-200d-2640-fe0f.png", "img-apple-64/26f9-1f3fc-200d-2642-fe0f.png", "img-apple-64/26f9-1f3fc.png", "img-apple-64/26f9-1f3fd-200d-2640-fe0f.png", "img-apple-64/26f9-1f3fd-200d-2642-fe0f.png", "img-apple-64/26f9-1f3fd.png", "img-apple-64/26f9-1f3fe-200d-2640-fe0f.png", "img-apple-64/26f9-1f3fe-200d-2642-fe0f.png", "img-apple-64/26f9-1f3fe.png", "img-apple-64/26f9-1f3ff-200d-2640-fe0f.png", "img-apple-64/26f9-1f3ff-200d-2642-fe0f.png", "img-apple-64/26f9-1f3ff.png", "img-apple-64/26f9-fe0f-200d-2640-fe0f.png", "img-apple-64/26f9-fe0f-200d-2642-fe0f.png", "img-apple-64/26f9-fe0f.png", "img-apple-64/26fa.png", "img-apple-64/26fd.png", "img-apple-64/2702-fe0f.png", "img-apple-64/2705.png", "img-apple-64/2708-fe0f.png", "img-apple-64/2709-fe0f.png", "img-apple-64/270a-1f3fb.png", "img-apple-64/270a-1f3fc.png", "img-apple-64/270a-1f3fd.png", "img-apple-64/270a-1f3fe.png", "img-apple-64/270a-1f3ff.png", "img-apple-64/270a.png", "img-apple-64/270b-1f3fb.png", "img-apple-64/270b-1f3fc.png", "img-apple-64/270b-1f3fd.png", "img-apple-64/270b-1f3fe.png", "img-apple-64/270b-1f3ff.png", "img-apple-64/270b.png", "img-apple-64/270c-1f3fb.png", "img-apple-64/270c-1f3fc.png", "img-apple-64/270c-1f3fd.png", "img-apple-64/270c-1f3fe.png", "img-apple-64/270c-1f3ff.png", "img-apple-64/270c-fe0f.png", "img-apple-64/270d-1f3fb.png", "img-apple-64/270d-1f3fc.png", "img-apple-64/270d-1f3fd.png", "img-apple-64/270d-1f3fe.png", "img-apple-64/270d-1f3ff.png", "img-apple-64/270d-fe0f.png", "img-apple-64/270f-fe0f.png", "img-apple-64/2712-fe0f.png", "img-apple-64/2714-fe0f.png", "img-apple-64/2716-fe0f.png", "img-apple-64/271d-fe0f.png", "img-apple-64/2721-fe0f.png", "img-apple-64/2728.png", "img-apple-64/2733-fe0f.png", "img-apple-64/2734-fe0f.png", "img-apple-64/2744-fe0f.png", "img-apple-64/2747-fe0f.png", "img-apple-64/274c.png", "img-apple-64/274e.png", "img-apple-64/2753.png", "img-apple-64/2754.png", "img-apple-64/2755.png", "img-apple-64/2757.png", "img-apple-64/2763-fe0f.png", "img-apple-64/2764-fe0f.png", "img-apple-64/2795.png", "img-apple-64/2796.png", "img-apple-64/2797.png", "img-apple-64/27a1-fe0f.png", "img-apple-64/27b0.png", "img-apple-64/27bf.png", "img-apple-64/2934-fe0f.png", "img-apple-64/2935-fe0f.png", "img-apple-64/2b05-fe0f.png", "img-apple-64/2b06-fe0f.png", "img-apple-64/2b07-fe0f.png", "img-apple-64/2b1b.png", "img-apple-64/2b1c.png", "img-apple-64/2b50.png", "img-apple-64/2b55.png", "img-apple-64/3030-fe0f.png", "img-apple-64/303d-fe0f.png", "img-apple-64/3297-fe0f.png", "img-apple-64/3299-fe0f.png"];


function new_populate_emojis(emojis, id) {
    var ul = document.getElementById(id);
    var completed = 0;
    for (let i = 0; i < 100; i++) {
        if (completed >= 6)
            break;

        var li = document.createElement("li");
        li.classList.add("emojiLi");
        var img = document.createElement("img");
        li.classList.add("emojiImage");
        img.classList.add("emojiImage");
        var s = "img-apple-64/";

        var t = emojis[i];
        /*console.log(t);
        console.log(typeof (t));*/
        if (typeof (t) != typeof ("string"))
            continue;
        t = t.substring(3, t.length - 1);

        //console.log(t);

        s += t;
        s += ".png";
        if (!allFiles.includes(s)) {
            emojis.splice(i, 1);
            i--;
            continue;
        }

        img.src = s;
        li.appendChild(img);
        ul.appendChild(li);
        completed++;
    }
}

function populate_emojiRanks(id, length) {
    var ul = document.getElementById(id);
    for (var i = 0; i < length && i < 6; i++) {

        var li = document.createElement("li");
        li.classList.add("emojiRankLi");
        li.innerHTML = (i + 1).toString() + ".";
        ul.appendChild(li);
    }
}

function populate_wordRanks(id) {
    var ul = document.getElementById(id);
    for (var i = 0; i < 6; i++) {
        var li = document.createElement("li");
        li.classList.add("wordRankLi");
        li.innerHTML = (i + 1).toString() + ".";
        ul.appendChild(li);
    }
}


const datePickerFrom = document.getElementById("dateFromId");
const datePickerTo = document.getElementById("dateToId");

const applyButton = document.getElementById("dateApplyId");
applyButton.addEventListener("click", function () {
    var invalid = document.getElementById("invalidDate");
    if (datePickerFrom.value == "" || datePickerTo.value == "") {
        invalid.innerHTML = "Select valid dates";
        return;
    }
    invalid.innerHTML = "";

    var dateFrom = new Date(Date.parse(datePickerFrom.value));
    var dateTo = new Date(Date.parse(datePickerTo.value));

    dateFrom.setTime(dateFrom.getTime() - (24 * 60 * 60 * 1000));
    dateTo.setTime(dateTo.getTime() + (24 * 60 * 60 * 1000));

    if (dateFrom > dateTo) {
        invalid.innerHTML = "Select valid range";
        return;
    }
    invalid.innerHTML = "";

    var _monthFrom = ('0' + (dateFrom.getMonth() + 1)).slice(-2);
    var _dayFrom = ('0' + (dateFrom.getDate())).slice(-2);
    var stringDateFrom = dateFrom.getFullYear() + "-" + _monthFrom + "-" + _dayFrom;

    var _monthTo = ('0' + (dateTo.getMonth() + 1)).slice(-2);
    var _dayTo = ('0' + (dateTo.getDate())).slice(-2);
    var stringDateTo = dateTo.getFullYear() + "-" + _monthTo + "-" + _dayTo;

    var daysdiff = (Date.parse(stringDateTo) - Date.parse(stringDateFrom)) / (1000 * 60 * 60 * 24);
    var unit;
    if (daysdiff < 40)
        unit = "day";
    else if (daysdiff < 90)
        unit = "week"
    else
        unit = "month";


    //---------------------------------------------------------------------------------

    var newData = newKeysValues(stringDateFrom, stringDateTo);

    updateChronologicalChart(newData[0], newData[1], newData[2], unit);

});


function newKeysValues(stringDateFrom, stringDateTo) {
    var fromElement = [];
    var toElement = [];

    //console.log(senders[0].messagesPerDay);
    //console.log(senders[1].messagesPerDay);

    if (!(stringDateFrom in senders[0].messagesPerDay)) {
        senders[0].messagesPerDay[stringDateFrom] = 0;
    }
    if (!(stringDateFrom in senders[1].messagesPerDay)) {
        senders[1].messagesPerDay[stringDateFrom] = 0;
    }
    if (!(stringDateTo in senders[0].messagesPerDay)) {
        senders[0].messagesPerDay[stringDateTo] = 0;
    }
    if (!(stringDateTo in senders[1].messagesPerDay)) {
        senders[1].messagesPerDay[stringDateTo] = 0;
    }

    var sortedMessages = Object.keys(senders[0].messagesPerDay).map(function (key) {
        if (key == stringDateFrom) {
            var el = [key, senders[0].messagesPerDay[key]];
            fromElement = el;
            return el;
        }
        else if (key == stringDateTo) {
            var el = [key, senders[0].messagesPerDay[key]];
            toElement = el;
            return el;
        }
        return [key, senders[0].messagesPerDay[key]];
    });
    sortedMessages.sort(function (first, second) {
        var d1 = new Date(Date.parse(first[0]));
        var d2 = new Date(Date.parse(second[0]));
        return d1 - d2;
    });

    var sortedMessages2 = Object.keys(senders[1].messagesPerDay).map(function (key) {
        return [key, senders[1].messagesPerDay[key]];
    });
    sortedMessages2.sort(function (first, second) {
        var d1 = new Date(Date.parse(first[0]));
        var d2 = new Date(Date.parse(second[0]));
        return d1 - d2;
    });

    var fromIndex = sortedMessages.findIndex(x => x == fromElement);
    var toIndex = sortedMessages.findIndex(x => x == toElement);

    var newKeys = [];
    var newValues = [];
    var newValues2 = [];

    var j = 0;
    for (var i = fromIndex; i <= toIndex; i++) {
        newKeys[j] = sortedMessages[i][0];
        newValues[j] = sortedMessages[i][1];
        newValues2[j] = sortedMessages2[i][1];
        j++;
    }

    return [newKeys, newValues, newValues2];
}


function updateChronologicalChart(keys, values, values2, unit) {
    globalChronologicalChart.data.labels = keys;
    globalChronologicalChart.data.datasets[0].data = values;
    globalChronologicalChart.data.datasets[1].data = values2;
    globalChronologicalChart.options.scales.xAxes[0].time.unit = unit;
    globalChronologicalChart.update();
}

const revertButton = document.getElementById("dateRevertId");
revertButton.addEventListener("click", function () {
    var newData = newKeysValues(originalFirstDate, originalLastDate);
    updateChronologicalChart(newData[0], newData[1], newData[2], "month");
    datePickerFrom.value = originalFirstDate;
    datePickerTo.value = originalLastDate;
})