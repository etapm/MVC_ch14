module.exports = {
  format_date: function (date) {
    var month = new Date(date).getMonth() + 1;
    var day = new Date(date).getDate();
    var year = new Date(date).getFullYear();
    return month + "/" + day + "/" + year;
  },
  format_plural: function (word, amount) {
    if (amount !== 1) {
      return word + "s";
    } else {
      return word;
    }
  },
};
