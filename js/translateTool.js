
var fromSentences = [];
var toSentences = [];
var fromLanguage = null;
var toLanguage = null;
var sentenceNdx = 0;

function startTranslation() {
    // Capture input, parse and populate global variables
    var textInput = $("#inputText").val();
    fromLanguage = $("#from").val();
    toLanguage = $("#to").val();

    if (!(textInput && fromLanguage && toLanguage)) {
        $("#errorMessage").css("display", "block");
    } else {

        parseInput(textInput);  

        // Prep new view
        $("#title").html("Translating from " + fromLanguage + " to " + toLanguage);
        $("#fromLanguageDiv").scroll(highlightSentence);
        $("#fromLanguageDiv").html(fromLanguageHTML());
        $("#toLanguageDiv").html(toLanguageHTML());
        $("#fromLanguageDiv").scrollTop(0);

        // Hide input and reveal translation tool.
        $("#getStarted").css("display", "none");
        $("#translateTool").css("display", "block");
        highlightSentence();
    }
}

function toLanguageHTML() {
    var html = "";
    html += '<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />';
    for (var ndx = 0; ndx < toSentences.length; ndx++) {
        var sentence = toSentences[ndx];
        html += '<div class="sentenceDiv" id="toSentence'+ndx+'">'+sentence+'</div><br />';
    }
    html += '<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />';
    return html;
}

function fromLanguageHTML() {
    var html = "";
    html += '<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />';
    for (var ndx = 0; ndx < fromSentences.length; ndx++) {
        var sentence = fromSentences[ndx];
        html += '<div class="sentenceDiv" id="fromSentence'+ndx+'">'+sentence+'</div><br />';
    }
    html += '<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />';
    return html;
}

function parseInput(text) {
    // regex from https://stackoverflow.com/questions/11761563/javascript-regexp-for-splitting-text-into-sentences-and-keeping-the-delimiter
    var parts = text.match(/[^.?!]+[.!?]+[\])'"`’”]*|.+/g);
    for (var ndx = 0; ndx < parts.length; ndx++) {
        fromSentences.push(parts[ndx]);
        toSentences.push(" ");
    }
}

function updateResults() {
    var html = "";
    for (var ndx = 0; ndx < toSentences.length; ndx++) {
        html += toSentences[ndx];
    }
    $("#results").html(html);
}

function highlightSentence() {
    var point = getCenterOfElem($("#fromLanguageDiv"));
    var elemInCenter = document.elementFromPoint(point[0], point[1]);
    var oldSentenceNdx = sentenceNdx;
    if (elemInCenter.id.includes("fromSentence")) {
        sentenceNdx = parseInt(elemInCenter.id.replace("fromSentence",""));
    }
    
    if (oldSentenceNdx != sentenceNdx) {
        $("#fromSentence"+oldSentenceNdx).css("color", "black");
        $("#fromSentence"+oldSentenceNdx).css("font-weight", "normal");
    }
    $("#fromSentence"+sentenceNdx).css("color", "red");
    $("#fromSentence"+sentenceNdx).css("font-weight", "bold");

    if (oldSentenceNdx != sentenceNdx || oldSentenceNdx == 0 && sentenceNdx == 0) {
        toSentences[oldSentenceNdx] = $("#toSentence"+oldSentenceNdx+"Input").val() || " ";
        $("#toSentence"+oldSentenceNdx).html("<p>"+toSentences[oldSentenceNdx]+"</p>");
        $("#toSentence"+sentenceNdx).html('<textarea style="height:10px;" id="'+"toSentence"+sentenceNdx+"Input"+'"></textarea>');
        $("#toSentence"+sentenceNdx+"Input").val(toSentences[sentenceNdx]);
    }

    var fromHeight = $("#fromSentence"+sentenceNdx).height();
    var toHeight = $("#toSentence"+sentenceNdx).height();
    var maxHeight = fromHeight > toHeight ? fromHeight : toHeight;
    $("#fromSentence"+sentenceNdx).css("height", maxHeight);
    $("#toSentence"+sentenceNdx).css("height", maxHeight);
    $("#toSentence"+sentenceNdx+"Input").css("height", maxHeight);

    $('#toLanguageDiv').scrollTop($(this).scrollTop());

    updateResults();
}


function getCenterOfElem(elem) {
    var offset = elem.offset();
    var width = elem.width();
    var height = elem.height();

    var centerX = offset.left + width / 2;
    var centerY = offset.top + height / 2;
    return [centerX, centerY];
}