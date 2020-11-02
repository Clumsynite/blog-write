import moment from "moment";

export const getRelativeTime = (time) => {
  const hours = moment(time).startOf("hour").fromNow();
  return hours;
};

export const getContentPreview = (content) => {
  const words = content.split(" ");
  const limit = 30;
  if (words.length < limit) {
    return content;
  } else {
    let preview = "";
    for (let i = 0; i < words.length; i++) {
      if (i >= limit) {
        break;
      }
      preview += ` ${words[i]}`;
    }
    return `${preview} ...`;
  }
};

export const getFullname = (author) => {
  return `${author.firstname} ${author.lastname}`;
};