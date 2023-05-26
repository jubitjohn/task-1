// VisitCountClient.ts

type VisitCounts = { [ipAddress: string]: number };

export const incrementVisitCount = (ipAddress: string | string[]): number => {
  // Retrieve the visitCounts object from localStorage or initialize it if it doesn't exist
  let visitCounts: VisitCounts = JSON.parse(localStorage.getItem('visitCounts') || '{}');

  // Extract the first IP address if it is an array
  const ipAddressToUse = Array.isArray(ipAddress) ? ipAddress[0] : ipAddress;
  console.log('IP Address:', ipAddress);

  // Increment visit count for the IP address
  if (ipAddressToUse) {
    visitCounts[ipAddressToUse] = visitCounts[ipAddressToUse] ? visitCounts[ipAddressToUse] + 1 : 1;
  }

  // Save the updated visitCounts object to localStorage
  localStorage.setItem('visitCounts', JSON.stringify(visitCounts));

  const visitCount = visitCounts[ipAddressToUse] || 0;

  return visitCount;
};
