class Sender {
    constructor(name) {
        this.name = name;
        this.sentMessages = 0;
        this.repliesCount = 0;
        this.conversationInits = 0;

        this.sentPhotos = 0;
        this.sentVideos = 0;
        this.sentAudiofiles = 0;
        this.startedCalls = 0;
        this.callDuration = 0;
        this.gifsCount = 0;
        this.deletedMessages = 0;
        this.sentWords = 0;
        this.sentLetters = 0;

        this.allMessLen = 0;

        this.wordCounts = {};
        this.emojiCounts = {};
        this.WordInMessageCounts = [];
        this.CharactersInMessageCounts = [];
        this.timesDuringDay = {};
        this.reactionCounts = {};
        this.messagesPerDay = {};
        this.weekdays = {};

        this.sortedWordKeys = [];
        this.sortedWordValues = [];

        for (var i = 0; i < 24; i += 0.5) {
            this.timesDuringDay[i] = 0;
        }

        for (var i = 0; i < 7; i++) {
            this.weekdays[i] = 0;
        }
    }
    getAvgMessPerReply() {
        return this.sentMessages / this.repliesCount;
    }
    getAvgWordsPerMessage() {
        
    }
    getCharactersPerMessage() {

    }
}