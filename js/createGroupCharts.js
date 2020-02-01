var sendercharts = {};

var globalGroupChronologicalChart;
var originalGroupFirstDate;
var originalGroupLastDate;

function createGroupCharts(isDemo = false) {
    originalGroupFirstDate = Object.keys(analyzer.combinedMessagesPerDay)[0];
    originalGroupLastDate = Object.keys(analyzer.combinedMessagesPerDay)[Object.keys(analyzer.combinedMessagesPerDay).length - 1];

    groupDatePickerFrom.value = originalGroupFirstDate;
    groupDatePickerTo.value = originalGroupLastDate;

    var ctxChronological = document.getElementById("grouptimelineId");
    var groupChronologicalChart = createGroupChronologicalChart("bar", ctxChronological, Object.keys(analyzer.combinedMessagesPerDay),
        Object.values(analyzer.combinedMessagesPerDay), "month", 0);
    globalGroupChronologicalChart = groupChronologicalChart;

    var p = document.getElementById("groupSentMessages");
    p.innerHTML = analyzer.combinedSentMessages;


    var ginfo = document.getElementById("groupbasicinfo");
    ginfo.innerHTML = "Group chat analysis from <span class='rangedate'>" + originalGroupFirstDate +
        "</span> until <span class='rangedate'>" + originalGroupLastDate + "</span>";


    var ctxPieSent = document.getElementById("sentMessagesPie");
    var _senders = senders;
    _senders.sort((a, b) => (a.sentMessages < b.sentMessages) ? 1 : -1);
    var _sendersNames = [];
    var _sendersSentMess = [];
    var _sendersInits = [];
    for (var i = 0; i < _senders.length; i++) {
        _sendersNames[i] = _senders[i].name;
        _sendersSentMess[i] = _senders[i].sentMessages;
        _sendersInits[i] = _senders[i].conversationInits;
    }
    var pieSentChart = createCombinedPieChart(ctxPieSent, _sendersNames, _sendersSentMess);

    var ctxPieInits = document.getElementById("conInitsPie");
    var pieInitsChart = createCombinedPieChart(ctxPieInits, _sendersNames, _sendersInits);


    
    var sortedgroupWeekdays = Object.keys(analyzer.combinedWeekdays).map(function (key) {
        return [key, analyzer.combinedWeekdays[key]];
    });
    sortedgroupWeekdays.sort(function (first, second) {
        return first[0] - second[0];
    });
    sortedgroupWeekdaysValues = [];
    for (var i = 0; i < sortedgroupWeekdays.length; i++) {
        sortedgroupWeekdaysValues[i] = sortedgroupWeekdays[i][1];
    }

    var ctxgroupWeekdays = document.getElementById("groupweekdaysId");
    var groupWeekdaysChart = creategroupWeekdaysChart(ctxgroupWeekdays, sortedgroupWeekdaysValues, 0);


    var sortedgroupTimes = Object.keys(analyzer.combinedTimesDuringDay).map(function (key) {
        return [key, analyzer.combinedTimesDuringDay[key]];
    })
    sortedgroupTimes.sort(function (first, second) {
        return first[0] - second[0];
    });

    var stringgroupTimeKeys = [];
    var sortedgroupTimeKeys = [];
    var sortedgroupTimeValues = [];

    for (var i = 0; i < sortedgroupTimes.length; i++) {
        var t = sortedgroupTimes[i][0];
        var u = parseFloat(t);
        var s = "";
        if (u % 1 != 0) {
            s += (u - 0.5).toString();
            s += ":30";
        }
        else {
            s += u.toString();
            s += ":00";
        }
        stringgroupTimeKeys[i] = s;

        sortedgroupTimeKeys[i] = sortedgroupTimes[i][0];
        sortedgroupTimeValues[i] = sortedgroupTimes[i][1];
    }

    var ctxgroupTimes = document.getElementById("grouptimesChart");
    var grouptimesChart = createGroupTimesDuringDayChart("line", ctxgroupTimes, stringgroupTimeKeys, sortedgroupTimeValues, 0);

    createTable();
}


function createCombinedPieChart(context, senderNames, data){
    var newChart = new Chart(context, {
        type: "pie",
        data: {
            labels: senderNames,
            datasets: [{
                label: senderNames,
                data: data,
                backgroundColor: lightSpectrum,
                borderColor: "#fff",
                borderWidth: 2
            }]
        },
        options: {
            legend: {
                display: false
            }
        }
    });
    return newChart;
}


function createTable() {
    var _senders = senders;
    _senders.sort((a, b) => (a.sentMessages < b.sentMessages) ? 1 : -1);

    console.log(senders);
    console.log(_senders);

    var table = document.getElementById("groupTable");

    var head = document.createElement("div");
    head.classList.add("row", "head");

    var headname = document.createElement("div");
    headname.classList.add("col-3");
    headname.innerHTML = "Name";

    var headsentmessages = document.createElement("div");
    headsentmessages.classList.add("col-2");
    headsentmessages.innerHTML = "Sent Messages";

    var headconversationinits = document.createElement("div");
    headconversationinits.classList.add("col-2");
    headconversationinits.innerHTML = "Conversation Starts";

    var headmesslen = document.createElement("div");
    headmesslen.classList.add("col-2");
    headmesslen.innerHTML = "Characters per Message";

    var headsentphotos = document.createElement("div");
    headsentphotos.classList.add("col-2");
    headsentphotos.innerHTML = "Sent Photos";

    

    head.appendChild(headname);
    head.appendChild(headsentmessages);
    head.appendChild(headconversationinits);
    head.appendChild(headmesslen);
    head.appendChild(headsentphotos);

    table.appendChild(head);

    
    
    for (var i = 0; i < _senders.length; i++) {
        var senderdiv = document.createElement("div");
        var identifier = "identity_" + i.toString();
        senderdiv.classList.add("row","collapsible");
        senderdiv.setAttribute("id", identifier);

        var sendername = document.createElement("div");
        sendername.classList.add("col-3");
        sendername.innerHTML = _senders[i].name;

        var sendersentmessages = document.createElement("div");
        sendersentmessages.classList.add("col-2");
        sendersentmessages.innerHTML = _senders[i].sentMessages;

        var senderreplies = document.createElement("div");
        senderreplies.classList.add("col-2");
        senderreplies.innerHTML = _senders[i].repliesCount;

        var senderconversationinits = document.createElement("div");
        senderconversationinits.classList.add("col-2");
        senderconversationinits.innerHTML = _senders[i].conversationInits;

        var sendermesslen = document.createElement("div");
        sendermesslen.classList.add("col-2");
        sendermesslen.innerHTML = Math.round((_senders[i].allMessLen / _senders[i].sentMessages) *100)/100;

        var sendersentphotos = document.createElement("div");
        sendersentphotos.classList.add("col-1");
        sendersentphotos.innerHTML = _senders[i].sentPhotos;

        var senderdetails = document.createElement("div");
        senderdetails.classList.add("col-2", "detailsbutton", identifier);
        senderdetails.innerHTML = "details +";

        senderdetails.addEventListener("click", function (e) {
            var identity_id = e.target.classList[e.target.classList.length - 1];
            var identity = identity_id + "_coll";

            var index = identity_id.split('_')[1];

            var _senderdiv = document.getElementById(identity_id);
            var lastchild = _senderdiv.children[_senderdiv.children.length - 1];
            var seclastclass = lastchild.classList[lastchild.classList.length - 2];

            if (seclastclass == "content") {
                var content = document.getElementById(identity);

                var _senderdetails = _senderdiv.children[_senderdiv.children.length - 2];

                if (content.style.display == "block") {
                    content.style.display = "none";
                    _senderdetails.innerHTML = "details +";
                }
                else {
                    content.style.display = "block";
                    _senderdetails.innerHTML = "details -";
                }
            }
            else {
                lastchild.innerHTML = "details -";

                var content = document.createElement("div");
                content.classList.add("row", identity, "content", identity_id);
                content.setAttribute("id", identity);
                content.style.display = "block";

                var senderEmojiIcons = document.createElement("div");
                senderEmojiIcons.classList.add("float-left", "senderemojiicons");
                var senderEmojiUl = document.createElement("ul");
                senderEmojiUl.classList.add("groupemojiUl");
                senderEmojiUl.setAttribute("id", ("groupemojiUl" + index.toString()));
                senderEmojiIcons.appendChild(senderEmojiUl);

                var senderEmojiChartDiv = document.createElement("div");
                senderEmojiChartDiv.classList.add("float-left", "senderchart", "senderemojichart");

                var senderEmojiChart = document.createElement("canvas");
                var _id = "senderEmojiId" + index.toString();
                senderEmojiChart.setAttribute("id", _id);




                var senderWordChartDiv = document.createElement("div");
                senderWordChartDiv.classList.add("float-left", "senderchart", "senderwordchart");

                var senderWordInput = document.createElement("input");
                senderWordInput.classList.add("senderWordInput", "index_" + index.toString());
                senderWordInput.placeholder = "Search for a word";

                senderWordInput.addEventListener("keyup", function (e) {
                    var _index = e.target.classList[e.target.classList.length - 1].split('_')[1];
                    var _senderchart = sendercharts[index];

                    var text = e.target.value;
                    if (text == "") {
                        _updateChart(_senderchart, 6, senders[_index].sortedWordKeys,
                            senders[_index].sortedWordValues);
                        return;
                    }

                    var texts = text.split(" ");
                    var newlabels = ["", "", "", "", "", ""];
                    var newdata = [0, 0, 0, 0, 0, 0];
                    for (var i = 0; i < texts.length; i++) {
                        if (texts[i] != "" && texts[i] != " ") {
                            newlabels[i] = texts[i];
                            var __index = senders[_index].sortedWordKeys.findIndex(x => x == texts[i]);
                            if (index != -1) {
                                newdata[i] = senders[_index].sortedWordValues[__index];
                            }
                        }
                    }

                    _updateChart(_senderchart, 6, newlabels, newdata);
                })

                var senderWordChart = document.createElement("canvas");
                var __id = "senderWordId" + index.toString();
                senderWordChart.setAttribute("id", __id);


                content.appendChild(senderEmojiIcons);
                content.appendChild(senderEmojiChartDiv);
                content.appendChild(senderWordChartDiv);

                senderEmojiChartDiv.appendChild(senderEmojiChart);
                senderWordChartDiv.appendChild(senderWordInput);
                senderWordChartDiv.appendChild(senderWordChart);

                _senderdiv.appendChild(content);

                var sortedEmojis = Object.keys(senders[index].emojiCounts).map(function (key) {
                    return [key, senders[index].emojiCounts[key]];
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

                var ctx = document.getElementById(_id);
                if(isDemo){
                    var emojiChart = createChart(ctx, senders[index].name, "horizontalBar",
                        ["", "", "", "", "", ""], [300,200,100], 0);
                    allCharts[allCharts.length] = emojiChart;
                    group_populate_emojis(["{u+1f602}", "{u+1f31d}", "{u+1f440}"], ("groupemojiUl" + index.toString()));
                }
                else{
                    var emojiChart = createChart(ctx, senders[index].name, "horizontalBar",
                        ["", "", "", "", "", ""], sortedEmojiValues, 0);
                    allCharts[allCharts.length] = emojiChart;
                    console.log(sortedEmojiKeys);
                    group_populate_emojis(sortedEmojiKeys, ("groupemojiUl" + index.toString()));
                }




                var sortedWords = Object.keys(senders[index].wordCounts).map(function (key) {
                    return [key, senders[index].wordCounts[key]];
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

                senders[index].sortedWordKeys = sortedWordKeys;
                senders[index].sortedWordValues = sortedWordValues;

                var ctxWords = document.getElementById(__id);
                if(isDemo){
                    var wordChart = createChart(ctxWords, senders[index].name, "horizontalBar",
                        ["hello", "i", "you", "fck", "omg", "wow"], [3000, 2500, 2000, 1500, 1000, 500], 0);
                    allCharts[allCharts.length] = wordChart;
                    sendercharts[index] = wordChart;
                }
                else{
                    var wordChart = createChart(ctxWords, senders[index].name, "horizontalBar",
                        sortedWordKeys.slice(0, 6), sortedWordValues.slice(0, 6), 0);
                    allCharts[allCharts.length] = wordChart;
                    sendercharts[index] = wordChart;
                }



                var senderstats = document.createElement("div");
                senderstats.classList.add("row", "senderstats");

                content.appendChild(senderstats);

                addGroupStat("Sent videos: ", senders[index].sentVideos, senderstats);
                addGroupStat("Total words: ", senders[index].sentWords, senderstats);
                addGroupStat("Sent audiofiles: ", senders[index].sentAudiofiles, senderstats);
                addGroupStat("Sent gifs: ", senders[index].gifsCount, senderstats);
                addGroupStat("Deleted messages: ", senders[index].deletedMessages, senderstats);
                addGroupStat("Letters per Message: ", (senders[index].allMessLen / senders[index].sentMessages).toFixed(2), senderstats);

            }

        });


        senderdiv.addEventListener("mouseenter", function (e) {
            var lastchild = e.target.children[e.target.children.length - 1];
            var identity_id = lastchild.classList[lastchild.classList.length - 1];

            var index = identity_id.split('_')[1];

            var highlight = document.getElementById("identity_" + index.toString());
            highlight.style.border = "solid 1px #dfdfdf";
            highlight.style.borderRadius = "5px";
        });

        senderdiv.addEventListener("mouseleave", function (e) {
            var lastchild = e.target.children[e.target.children.length - 1];
            var identity_id = lastchild.classList[lastchild.classList.length - 1];
            var identity = identity_id + "_coll";

            var index = identity_id.split('_')[1];


            var content = document.getElementById(identity);
            if (content != null && content.style.display == "block")
                return;

            var highlight = document.getElementById("identity_" + index.toString());
            highlight.style.border = "";
        });


        senderdiv.appendChild(sendername);
        senderdiv.appendChild(sendersentmessages);
        senderdiv.appendChild(senderconversationinits);
        senderdiv.appendChild(sendermesslen);
        senderdiv.appendChild(sendersentphotos);
        senderdiv.appendChild(senderdetails);

        table.appendChild(senderdiv);
    }
}

function addGroupStat(label, data, element) {
    var div = document.createElement("div");
    div.classList.add("col-2");
    div.innerHTML = label + data;
    element.appendChild(div);
}

function group_populate_emojis(emojis, id) {
    var ul = document.getElementById(id);
    var completed = 0;
    for (let i = 0; i < 100; i++) {
        if (completed >= 6)
            break;

        var li = document.createElement("li");
        li.classList.add("groupemojiLi");
        var img = document.createElement("img");
        li.classList.add("groupemojiImage");
        img.classList.add("groupemojiImage");
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
        console.log(s);

        if (!allFiles.includes(s)) {
            console.log("NE");
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

function createGroupTimesDuringDayChart(type, context, labels, data, _colorIndex) {
    var newChart = new Chart(context, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: "Your Group",
                data: data,
                backgroundColor: backgroundColors[_colorIndex],
                borderColor: borderColors[_colorIndex],
                pointHoverBackgroundColor: backgroundColors[_colorIndex],
                pointHoverBorderColor: borderColors[_colorIndex],
                borderWidth: 1,
                lineTension: 0.1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    return newChart;
}

function createGroupChronologicalChart(type, context, labels, data, unit, _colorIndex) {

    var newChart = new Chart(context, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: "Your Group",
                data: data,
                backgroundColor: backgroundColors[_colorIndex],
                borderColor: borderColors[_colorIndex],
                pointHoverBackgroundColor: backgroundColors[_colorIndex],
                pointHoverBorderColor: borderColors[_colorIndex],
                borderWidth: 1,
                lineTension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                xAxes: [
                    {
                        categoryPercentage: 1.0,
                        barPercentage: 1.0,
                        type: "time",
                        distribution: "linear",
                        time: {
                            unit: unit
                        }
                    }
                ]
            }
        }
    });
    return newChart;
}

function creategroupWeekdaysChart(context, data, _colorIndex) {
    var newChart = new Chart(context, {
        type: "horizontalBar",
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
                label: "Your Group",
                data: data,
                backgroundColor: backgroundColors[_colorIndex],
                borderColor: borderColors[_colorIndex],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    return newChart;
}


const groupDatePickerFrom = document.getElementById("groupdateFromId");
const groupDatePickerTo = document.getElementById("groupdateToId");



const groupApplyButton = document.getElementById("groupdateApplyId");
groupApplyButton.addEventListener("click", function () {
    var invalid = document.getElementById("groupinvalidDate");
    if (groupDatePickerFrom.value == "" || groupDatePickerTo.value == "") {
        invalid.innerHTML = "Select valid dates";
        return;
    }
    invalid.innerHTML = "";
    
    var dateFrom = new Date(Date.parse(groupDatePickerFrom.value));
    var dateTo = new Date(Date.parse(groupDatePickerTo.value));

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

    var newData = newGroupKeysValues(stringDateFrom, stringDateTo);

    updateGroupChronologicalChart(newData[0], newData[1], unit);
});

function newGroupKeysValues(stringDateFrom, stringDateTo) {
    var fromElement = [];
    var toElement = [];

    if (!(stringDateFrom in analyzer.combinedMessagesPerDay)) {
        analyzer.combinedMessagesPerDay[stringDateFrom] = 0;
    }
    if (!(stringDateTo in analyzer.combinedMessagesPerDay)) {
        analyzer.combinedMessagesPerDay[stringDateTo] = 0;
    }

    var sortedCombinedMessages = Object.keys(analyzer.combinedMessagesPerDay).map(function (key) {
        if (key == stringDateFrom) {
            var el = [key, analyzer.combinedMessagesPerDay[key]];
            fromElement = el;
            return el;
        }
        else if (key == stringDateTo) {
            var el = [key, analyzer.combinedMessagesPerDay[key]];
            toElement = el;
            return el;
        }
        return [key, analyzer.combinedMessagesPerDay[key]];
    });
    sortedCombinedMessages.sort(function (first, second) {
        var d1 = new Date(Date.parse(first[0]));

        var d2 = new Date(Date.parse(second[0]));

        return d1 - d2;
    });

    var fromIndex = sortedCombinedMessages.findIndex(x => x == fromElement);
    var toIndex = sortedCombinedMessages.findIndex(x => x == toElement);

    var newKeys = [];
    var newValues = [];

    var j = 0;
    for (var i = fromIndex; i <= toIndex; i++) {
        newKeys[j] = sortedCombinedMessages[i][0];
        newValues[j] = sortedCombinedMessages[i][1];
        j++;
    }

    return [newKeys, newValues];
}

function updateGroupChronologicalChart(keys, values, unit) {
    globalGroupChronologicalChart.data.labels = keys;
    globalGroupChronologicalChart.data.datasets[0].data = values;
    globalGroupChronologicalChart.options.scales.xAxes[0].time.unit = unit;
    globalGroupChronologicalChart.update();
}

const groupRevertButton = document.getElementById("groupdateRevertId");
groupRevertButton.addEventListener("click", function () {
    var newData = newGroupKeysValues(originalGroupFirstDate, originalGroupLastDate);
    updateGroupChronologicalChart(newData[0], newData[1], "month");
    groupDatePickerFrom.value = originalGroupFirstDate;
    groupDatePickerTo.value = originalGroupLastDate;
})