const { format } = require("date-fns");

const format_date = (date, dateFormat = "MM/dd/yyyy") => {
  console.log("Date:", date);
  console.log("Date format:", dateFormat);
  try {
    return format(new Date(date), dateFormat);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};

module.exports = {
  format_date,
};
