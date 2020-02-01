document.getElementById("filedrag").addEventListener("click", function () {
    document.getElementById("selectFiles").click();
})
document.getElementById("filedrag").addEventListener("mouseover", function () {
    document.body.style.cursor = "pointer";
})
document.getElementById("filedrag").addEventListener("mouseleave", function () {
    document.body.style.cursor = "auto";
})


var allCharts = [];
var isDemo = false;
var results = [];
var groupcreated = false;
var normalcreated = false;

document.getElementById("dummyButton").addEventListener("click", function () {
    isDemo = true;
    var cap2 = document.getElementById("capture2");
    cap2.style.display = "none";
    if(normalcreated){
        var cap = document.getElementById("capture");
        cap.style.display = "block";
        return;
    }
    normalcreated = true;

    var notjson = document.getElementById("notjsonId");
    notjson.innerHTML = "";
    let spinner = lv.create(document.getElementById("element_id"));
    spinner.show();
    
    results = [];
    results.push(dummy);

    merge();
    process();

    spinner.hide();
});

document.getElementById("groupDummyButton").addEventListener("click", function () {
    isDemo = true;
    var cap = document.getElementById("capture");
    cap.style.display = "none";
    if(groupcreated){
        var cap2 = document.getElementById("capture2");
        cap2.style.display = "block";
        return;
    }
    groupcreated = true;
    

    var notjson = document.getElementById("notjsonId");
    notjson.innerHTML = "";

    let spinner = lv.create(document.getElementById("element_id"));
    spinner.show();

    results = [];
    results.push(groupdummy);

    merge();
    process();

    spinner.hide();
});

const input = document.querySelector('input[type="file"]');

input.addEventListener('change', async () => {
    results = [];
    isDemo = false;

    var notjson = document.getElementById("notjsonId");
    notjson.innerHTML = "";
    let spinner = lv.create(document.getElementById("element_id"));
    spinner.show();


    await Promise.all([...input.files].map(file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            try {
                resolve(results.push(JSON.parse(reader.result)));
            } catch (err) {
                // Return a blank value; ignore non-JSON (or do whatever else)
                spinner.hide();
                console.log('Please use .json!');
                var notjson = document.getElementById("notjsonId");
                notjson.innerHTML = "Select a .json file please";
                return;
                resolve();
            }
        }
        reader.readAsText(file);
    })));

    // Do Stuff
    console.log(results);
    console.log(results.length);
    merge();
    process();

    spinner.hide();
    var demo = document.getElementById("load");
    demo.style.display = "none";
});


var participants = [];
var messages = [];

function merge() {
    participants = results[0].participants;

    var temp = [];
    for (var i = 0; i < results.length; i++) {
        var temparr = results[i].messages.reverse();
        temp[i] = [i, new Date(temparr[i].timestamp_ms)];
    }
    console.log(temp);
    temp.sort(function (first, second) {
        return first[1] - second[1];
    });
    console.log(temp);
    for (var i = 0; i < temp.length; i++) {
        console.log(temp[i][0]);
        messages = messages.concat(results[temp[i][0]].messages);
    }
    messages = messages.reverse();
    console.log(messages);
}


var messageInfo;
var senders;
var analyzer;
function process() {
    var _analyzer = new Analyzer();
    _analyzer.createSenders(participants);
    _analyzer.processMessages(messages);
    senders = _analyzer.senders;
    analyzer = _analyzer;

    var tutorial = document.getElementById("tutorial");
    tutorial.style.display = "none";
    if (senders.length > 2)             //GROUP CHAT
    {
        var cap = document.getElementById("capture");
        cap.style.display = "none";
        var cap2 = document.getElementById("capture2");
        cap2.style.display = "block";

        createGroupCharts(isDemo);

        return;
    }
    else {
        var p = document.getElementById("groupChatId");
        p.innerHTML = "";
    }

    var cap = document.getElementById("capture");
    cap.style.display = "block";

    var cap2 = document.getElementById("capture2");
    cap2.style.display = "none";

    recover(["emojiRankUl", "emojiRankUl2", "emojiUl", "emojiUl2", "wordRankUl", "wordRankUl2",
        "statsUl", "statsUl2"]);

    createCharts(isDemo);
    createStats(isDemo);
}

function recover(Uls) {
    for (var i = 0; i < Uls.length; i++) {
        var ul = document.getElementById(Uls[i]);
        while (ul.firstChild)
            ul.removeChild(ul.firstChild);
    }

    if (allCharts.length > 0) {
        for (var i = 0; i < allCharts.length; i++) {
            allCharts[i].destroy();
        }
    }
}

class Analyzer {
    constructor() {
        this.senders = [];

        this.combinedMessagesPerDay = {};
        this.combinedSentMessages = 0;
        this.combinedTimesDuringDay = {};
        this.combinedWeekdays = {};
        for (var i = 0; i < 7; i++) {
            this.combinedWeekdays[i] = 0;
        }

        for (var i = 0; i < 24; i += 0.5) {
            this.combinedTimesDuringDay[i] = 0;
        }
    }

    getSenders() {
        return this.senders;
    }

    createSenders(_participants) {
        for (var i = 0; i < _participants.length; i++) {
            var _name = decode(_participants[i].name);
            this.senders[i] = new Sender(_name);
        }
    }

    returnCombinedInfo() {

    }

    processMessages(messages) {
        messages.reverse();
        var previousSender = null;
        var previousMessage = null;
        for (var i = 0; i < messages.length; i++) {
            var name = messages[i].sender_name;
            var nameDecoded = decode(name);
            //var sender = this.senders.find(function (n) { return n.name == nameDecoded });
            var sender = this.senders.find(n => n.name == nameDecoded);
            if (sender == null) continue;
            var otherSenders = this.senders.filter(n => n.name != sender.name);

            sender.sentMessages++;
            this.combinedSentMessages++;                //combined
            if (previousSender != sender) sender.repliesCount++;
            
            this.time_analysis(messages[i].timestamp_ms, sender, otherSenders);
            this.messages_per_day(messages[i].timestamp_ms, sender, otherSenders);

            if (previousMessage != null) {
                var temp = Math.abs(
                    new Date(messages[i].timestamp_ms) - new Date(previousMessage.timestamp_ms));
                var diff = (temp / (1000 * 60 * 60));
                if (diff > 8) sender.conversationInits++;
            }

            if (messages[i].content != null) {
                //console.log(messages[i].content);
                messages[i].content = decode(messages[i].content);
                this.word_emoji_count(messages[i].content, sender);
                this.characters_count(messages[i].content, sender);
            }
            else if (messages[i].photos != null) sender.sentPhotos++;
            else if (messages[i].videos != null) sender.sentVideos++;

            if (messages[i].reactions != null) {
                for (var j = 0; j < messages[i].reactions.length; j++) {
                    var _name = messages[i].reactions[j].actor;
                    _name = decode(_name);
                    var _sender = this.senders.find(n => n.name == _name);
                    var react_emoji = decode(messages[i].reactions[j].reaction);
                    if (react_emoji in _sender.reactionCounts)
                        _sender.reactionCounts[react_emoji]++;
                    else
                        _sender.reactionCounts[react_emoji] = 1;
                }
            }

            if (messages[i].audio_files != null) {
                sender.sentAudiofiles++;
            }

            if (messages[i].type == "Call") {
                sender.startedCalls++;
                sender.callDuration += messages[i].call_duration;
            }

            if (messages[i].gifs != null)
                sender.gifsCount++;

            if (Object.keys(messages[i]).length == 3) {
                sender.deletedMessages++;
            }

            previousMessage = messages[i];
            previousSender = sender;
        }
    }

    word_emoji_count(message, sender) {
        var words = message.toLowerCase().split(/[\s .,?!()'/\;-]/).filter(m => m != "");
        var emojis = words.filter(w => w.length > 3 && w.substring(0, 3) == "{u+");

        var wordCount = 0;
        for (var i = 0; i < words.length; i++) {
            var _word = words[i];

            if (_word == "") continue;
            if (_word.length > 3 && _word.substring(0, 3) == "{u+") continue;
            wordCount++;
            if (_word in sender.wordCounts)
                sender.wordCounts[_word]++;
            else
                sender.wordCounts[_word] = 1;
            sender.sentWords++;
            sender.sentLetters += _word.length;
        }

        sender.WordInMessageCounts[sender.WordInMessageCounts.length] = wordCount;

        var skinTones = ["{u+1f3fb}", "{u+1f3fc}", "{u+1f3fd}", "{u+1f3fe}", "{u+1f3ff}", "{u+fe0f}"];

        var newemojis = [];
        for (var i = 0; i < emojis.length; i++) {
            if (skinTones.includes(emojis[i])) {
                var addedIndex = 0;
                var temp = newemojis[newemojis.length - 1];
                if (typeof (temp) != typeof ("string"))                   //????
                    continue;
                temp = temp.substring(0, temp.length - 1);
                temp += "-" + emojis[i].substring(3, emojis[i].length - 1);
                if (i + 1 < emojis.length && emojis[i + 1] == "{u+200d}") {
                    temp += "-200d-";
                    temp += emojis[i + 2].substring(3, emojis[i + 2].length - 1);
                    addedIndex += 2;
                    if (i + 3 < emojis.length && emojis[i + 3] == "{u+fe0f}") {
                        temp += "-fe0f}";
                        addedIndex++;
                    }
                    else
                        temp += "}"
                }
                else
                    temp += "}"
                newemojis[newemojis.length - 1] = temp;
                i += addedIndex;
            }
            else if (emojis[i] == "{u+200d}") {
                var temp = newemojis[newemojis.length - 1];
                temp = temp.substring(0, temp.length - 1);
                temp += "-200d-";
                temp += emojis[i + 1].substring(3, emojis[i + 1].length - 1);
                var addedIndex = 1;
                if (i + 2 < emojis.length && emojis[i + 2] == "{u+fe0f}") {
                    temp += "-fe0f}";
                    addedIndex++;
                }
                else
                    temp += "}"
                newemojis[newemojis.length - 1] = temp;
                i += addedIndex;
            }
            else
                newemojis[newemojis.length] = emojis[i];
        }
        //console.log(newemojis);

        for (var i = 0; i < newemojis.length; i++) {
            var _emoji = newemojis[i];
            if (_emoji in sender.emojiCounts)
                sender.emojiCounts[_emoji]++;
            else
                sender.emojiCounts[_emoji] = 1;
        }
    }

    time_analysis(timestamp, sender, otherSenders) {
        var date = new Date(timestamp);
        var time = this.time_clamp(date.getHours(), date.getMinutes());

        if (time in sender.timesDuringDay)
            sender.timesDuringDay[time]++;
        else
            sender.timesDuringDay[time] = 1;

        for (var i = 0; i < otherSenders.length; i++) {
            if (time in otherSenders[i].timesDuringDay)
                continue
            else
                otherSenders[i].timesDuringDay[time] = 0;
        }


        if (time in this.combinedTimesDuringDay)
            this.combinedTimesDuringDay[time]++;
        else
            this.combinedTimesDuringDay[time] = 1;
    }

    time_clamp(hour, minute) {
        var _hour = hour;
        var _minute = minute;
        if (minute > 15 && minute <= 45)
            _minute = 30;
        else if (minute > 45 && minute < 60) {
            _minute = 0;
            _hour++;
        }
        else if (minute >= 0 && minute <= 15)
            _minute = 0;

        if (_minute == 30) _hour += 0.5;
        if (_hour >= 24) _hour -= 24;
        return _hour;
    }

    messages_per_day(timestamp, sender, otherSenders) {
        var date = new Date(timestamp);

        var weekday = date.getDay();
        sender.weekdays[weekday]++;
        this.combinedWeekdays[weekday]++; //combined

        var _month = ('0' + (date.getMonth() + 1)).slice(-2);
        var _day = ('0' + (date.getDate())).slice(-2);

        var stringDate = date.getFullYear() + "-" + _month + "-" + _day;
        //var stringDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
        var newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

        if (stringDate in sender.messagesPerDay)
            sender.messagesPerDay[stringDate]++;
        else
            sender.messagesPerDay[stringDate] = 1;

        for (var i = 0; i < otherSenders.length; i++) {
            if (stringDate in otherSenders[i].messagesPerDay)
                continue
            else
                otherSenders[i].messagesPerDay[stringDate] = 0;
        }

        if (stringDate in this.combinedMessagesPerDay)      //combined
            this.combinedMessagesPerDay[stringDate]++;
        else
            this.combinedMessagesPerDay[stringDate] = 1;
    }

    characters_count(message, sender) {
        sender.CharactersInMessageCounts[sender.CharactersInMessageCounts.length] = message.length;
        sender.allMessLen += message.length;
    }
}