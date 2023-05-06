const { format } = require("date-fns");

const format_date = (date) => {
  try {
    if (!date || isNaN(new Date(date))) {
      console.error("Invalid date:", date);
      return "Invalid date";
    }
    const formattedDate = format(new Date(date), "MM-dd-yyyy, h:mm a");
    console.log("Formatted date:", formattedDate);
    return formattedDate;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};

const truncate = (text, length = 100, ending = "...") => {
  if (!text || typeof text !== "string") {
    console.log("Invalid text content:", JSON.stringify(text, null, 2));
    return "";
  }

  if (text.length <= length) {
    return text;
  }

  return text.slice(0, length) + ending;
};

const json = (value) => {
  try {
    return JSON.stringify(value);
  } catch (error) {
    console.error("Error converting to JSON:", error);
    return "";
  }
};

module.exports = {
  format_date,
  truncate,
  json,
};
