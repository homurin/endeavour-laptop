export function dateFormatFromIsoString(isoDate: string | Date) {
  const date = new Date(isoDate);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${year}${month !== "00" || day !== "00" ? `-${month}` : ""}${
    day !== "0" ? `-${day}` : ""
  }`;
}
