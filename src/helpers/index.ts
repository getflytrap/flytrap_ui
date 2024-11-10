export const convertHandledToBoolean = (handled: string): boolean | null => {
  if (handled === "Handled") return true;
  if (handled === "Unhandled") return false;
  return null;
}

export const convertToTimeStamp = (period: string): string | null => {
  const now = new Date();
  let pastDate: Date;

  switch (period) {
    case "Today":
      pastDate = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
      break;
    case "Last 7 days":
      pastDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "Last 14 days":
      pastDate = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
      break;
    case "Last 30 days":
      pastDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case "Last 90 days":
      pastDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      break;
    case "Forever":
      return null;
    default:
      console.error('Invalid time period provided.');
      return null;
  }

  return pastDate.toISOString();
};
