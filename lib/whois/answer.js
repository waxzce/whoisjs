(function() {
  var Answer;
  Answer = (function() {
    function Answer(negative_regex, positive_regex, error_regex) {
      this.nRegex = new RegExp(negative_regex);
      this.pRegex = new RegExp(positive_regex);
      this.eRegex = new RegExp(error_regex);
      this.raw = new Array;
    }
    Answer.prototype.isAvailable = function() {
      var result;
      result = false;
      if (this.raw) {
        if (this.raw === "timeout") {
          this.reason = "timeout";
        } else if (this.error()) {
          this.reason = "error";
        } else if (this.positive()) {
          this.reason = "Domain taken!";
        } else {
          result = !this.positive() && this.negative();
        }
      }
      return result;
    };
    Answer.prototype.available = function() {
      return !this.positive() && !this.error() && this.negative();
    };
    Answer.prototype.unavailable = function() {
      return this.positive() && !this.negative() && !this.error();
    };
    Answer.prototype.timeout = function() {
      return this.raw === "timeout";
    };
    Answer.prototype.positive = function() {
      return !!this.raw.match(this.pRegex);
    };
    Answer.prototype.negative = function() {
      return !!this.raw.match(this.nRegex);
    };
    Answer.prototype.error = function() {
      return !!this.raw.match(this.eRegex) || this.raw === "error";
    };
    return Answer;
  })();
  exports.answer = Answer;
}).call(this);
