export function formatDate(timestamp) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(timestamp));
}

export function formatDateTime(timestamp) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  }).format(new Date(timestamp));
}

export function calculateGMT (timestamp) {
  let utc = timestamp.slice(-6)
  let symbol = utc.charAt(0);
  let gmtNumber = utc.substring(1, 3);
  let gmtNumberDecimal = utc.substring(4, 6);

  //covers all timezones even those with decimal like "Asia/Kolkata"
  if(+gmtNumber>0) {
    return `GMT${symbol}${+gmtNumber}` + (+gmtNumberDecimal > 0 ? `:${gmtNumberDecimal}`:"")
  }
  else {
    return "GMT";
  }
}

export function formatDateTimeLaunchTime(timestamp) {
  let timestampNoUTC = timestamp.slice(0, -6)

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(new Date(timestampNoUTC)) + " " + calculateGMT(timestamp);
}
