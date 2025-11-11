export function getYear(dateStr) {
  const date = new Date(dateStr);
  return date.getFullYear();
}

export function shortenOverview(overview, maxLength = 30) {
  const str =
    overview.length <= maxLength
      ? overview
      : `${overview.slice(0, maxLength)}...`;
  return str;
}
export function getReleasedDate(dateStr) {
  const monthArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, "0");
  const month = monthArr[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
}
export function getGenreNames(genresArr) {
  return genresArr.map((genre) => genre.name).join(", ");
}
