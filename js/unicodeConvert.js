//var jsontext = '{"name": "Matou\u00c5\u00a1 Pelik\u00c3\u00a1n Adriana Jur\u00c4\u008d\u00c3\u00adkov\u00c3\u00a1", "emoji": "5\u00f0\u009f\u0098\u0081\u00f0\u009f\u0098\u0098","age": 18,"address": {"street": "Svatoplukova","number": 56},"degrees": ["Bc.","Ing.","Ph.D."],"photos": [{"uri": "photouri","creation_timestamp": 4561436453}]}';

//var messageInfo = JSON.parse(jsontext);
//console.log(messageInfo);

//document.write(messageInfo.name + "<br>");
//decode(messageInfo.emoji);

function getbytes(text) {
    var s = []
    for (let i = 0; i < text.length; i++) {
        s[i] = text.charCodeAt(i);
    }
    return s;
    return x.charCodeAt(1)
}

function pad8(binary) {
    pad = "00000000";
    return pad.substring(0, pad.length - binary.length) + binary;
}

function bytesToUtf8(decimal) {
    var v = parseInt(decimal, 10).toString(2);
    return pad8(v);
}

function decodeUtf8(utf8) {
    var bytes = utf8.length / 8;
    var text = "";
    for (var i = 0; i < bytes; i++) {
        if (i == 0) {
            text += utf8.substring(bytes + 1, i * 8 + 8);
        }
        else {
            text += utf8.substring(i * 8 + 2, i * 8 + 8);
        }
    }
    return text;
}

function utf8ToHex(utf8) {
    var result = [];
    var index = 0;
    for (var i = 0; i < utf8.length; i++) {
        if (utf8[i][0] == "0") {
            result[index] = utf8[i];
            index++;
        }
        else {
            var ones = 0;
            var combined = "";
            for (var j = 0; j < utf8[i].length; j++) {
                if (utf8[i][j] == "1") {
                    ones++;
                    combined += utf8[i + j];
                }
                else
                    break;
            }
            i += ones - 1;
            result[index] = decodeUtf8(combined);
            index++;
        }
    }
    return result;
}

function bin2String(array) {
    var result = "";
    for (var i = 0; i < array.length; i++) {
        var decimalValue = binaryToDecimal(array[i]);
        if (decimalValue > 8000) {
            result += " {u+" + binaryToHex(array[i]) + "} ";
        }
        else {
            result += String.fromCharCode(parseInt(array[i], 2));
        }
    }
    return result;
}

function binaryToDecimal(binary) {
    return parseInt(binary, 2);
}

function binaryToHex(binary) {
    return parseInt(binary, 2).toString(16);
}

function decode(rawtext) {
    var bytes = getbytes(rawtext);
        //for (var i = 0; i < bytes.length; i++) {
        //    document.writeln(bytes[i]);
        //}
        //document.write("<br>");

    var utf8 = [];
    for (var i = 0; i < bytes.length; i++) {
        utf8[i] = bytesToUtf8(bytes[i]);
        //document.writeln(utf8[i]);
    }
    //document.write("<br>");

    var hex = utf8ToHex(utf8);
    //for (var i = 0; i < hex.length; i++) {
    //    document.writeln(hex[i]);
    //}
    ////document.write("<br>");

    var text = bin2String(hex);
    //document.write(text);

    return text;
}

//document.write(bin2String(["101100001", "01101111", "01101111"]));


