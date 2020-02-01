//section - updating chart
function _updateChart(chart, iterations, newlabels, newdata) {
    var _newlabels = [];
    var _newdata = [];
    for (let i = 0; i < iterations; i++) {
        _newlabels[i] = newlabels[i];
        _newdata[i] = newdata[i];
    }

    chart.data.labels = _newlabels;
    chart.data.datasets[0].data = _newdata;
    chart.update();
}

function updateWordInput() {
    var text = document.getElementById("wordInputId").value;
    //console.log(text);
    if (text == "") {
        _updateChart(_wordChart, 6, _sortedWordKeys, _sortedWordValues);
        return;
    }

    var newlabels = ["", "", "", "", "", ""];
    newlabels[0] = text;

    var newdata = [0, 0, 0, 0, 0, 0];

    //for (let i = 0; i < _sortedWordKeys.length; i++) {
    //    if (_sortedWordKeys[i] == text) {
    //        newdata[0] = _sortedWordValues[i];
    //        break;
    //    }
    //}
    if (_sortedWordKeys.includes(text)) {
        console.log("ano");
        var index = _sortedWordKeys.findIndex(x => x == text);
        newdata[0] = _sortedWordValues[index];
    }
    _updateChart(_wordChart, 6, newlabels, newdata);
}


function updateWordInput2() {
    var text = document.getElementById("wordInputId2").value;
    //console.log(text);
    if (text == "") {
        _updateChart(_wordChart2, 6, _sortedWordKeys2, _sortedWordValues2);
        return;
    }

    var newlabels = ["", "", "", "", "", ""];
    newlabels[0] = text;

    var newdata = [0, 0, 0, 0, 0, 0];

    for (let i = 0; i < _sortedWordKeys2.length; i++) {
        if (_sortedWordKeys2[i] == text) {
            newdata[0] = _sortedWordValues2[i];
            break;
        }
    }
    _updateChart(_wordChart2, 6, newlabels, newdata);
}

function updateWordInputUpgrade() {
    var text = document.getElementById("wordInputId").value;
    if (text == "") {
        resetRanks("wordRankUl");
        _updateChart(_wordChart, 6, _sortedWordKeys, _sortedWordValues);
        return;
    }

    var texts = text.split(" ");
    ranks = [];
    var newlabels = ["", "", "", "", "", ""];
    var newdata = [0, 0, 0, 0, 0, 0];
    for (var i = 0; i < texts.length; i++) {
        if (texts[i] != "" && texts[i] != " ") {
            newlabels[i] = texts[i];
            var index = _sortedWordKeys.findIndex(x => x == texts[i]);
            ranks[i] = "";
            if (index != -1) {
                newdata[i] = _sortedWordValues[index];
                ranks[i] = (index + 1).toString();
            }
        }
    }
    //console.log(texts);

    updateRanks("wordRankUl", ranks);
    _updateChart(_wordChart, 6, newlabels, newdata);
}

function updateWordInputUpgrade2() {
    var text = document.getElementById("wordInputId2").value;
    if (text == "") {
        resetRanks("wordRankUl2");
        _updateChart(_wordChart2, 6, _sortedWordKeys2, _sortedWordValues2);
        return;
    }

    var texts = text.split(" ");
    ranks = [];
    var newlabels = ["", "", "", "", "", ""];
    var newdata = [0, 0, 0, 0, 0, 0];
    for (var i = 0; i < texts.length; i++) {
        if (texts[i] != "" && texts[i] != " ") {
            newlabels[i] = texts[i];
            var index = _sortedWordKeys2.findIndex(x => x == texts[i]);
            ranks[i] = "";
            if (index != -1) {
                newdata[i] = _sortedWordValues2[index];
                ranks[i] = (index + 1).toString();
            }
        }
    }
    //console.log(texts);

    updateRanks("wordRankUl2", ranks);
    _updateChart(_wordChart2, 6, newlabels, newdata);
}

$("#wordInputId").on("keyup", function () { updateWordInputUpgrade() });
$("#wordInputId2").on("keyup", function () { updateWordInputUpgrade2() });