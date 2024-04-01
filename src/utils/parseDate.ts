export function dateFormatFromIsoString(isoDate: string | Date) {
  const day = new Date(isoDate).getDay();
  const month = new Date(isoDate).getMonth();
  const year = new Date(isoDate).getFullYear();

  return `${day == 0 || month == 0 ? "" : `${day}/`}${month == 0 ? "" : `${month}/`}${year}`;
}
