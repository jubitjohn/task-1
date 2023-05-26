import { useEffect, useState } from "react";

export function useIncrementVisitCount(ipAddress: string | string[]): number {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    const visitCountsString = localStorage.getItem("visitCounts") || "{}";
    const visitCounts = JSON.parse(visitCountsString);

    const ipAddressToUse = Array.isArray(ipAddress) ? ipAddress[0] : ipAddress;

    if (ipAddressToUse) {
      visitCounts[ipAddressToUse] = visitCounts[ipAddressToUse] ? visitCounts[ipAddressToUse] + 1 : 1;
    }

    localStorage.setItem("visitCounts", JSON.stringify(visitCounts));

    const updatedVisitCount = visitCounts[ipAddressToUse] || 0;
    setVisitCount(updatedVisitCount);
  }, [ipAddress]);

  return visitCount;
}
















// import { useEffect } from "react";

// export function IncrementVisitCount(ipAddress: string | string[]) {
//   useEffect(() => {
//     // Retrieve the visitCounts object from localStorage or initialize it if it doesn't exist
//     const visitCountsString = window.localStorage.getItem("visitCounts") || "{}";
//     const visitCounts = JSON.parse(visitCountsString);

//     // Extract the first IP address if it is an array
//     const ipAddressToUse = Array.isArray(ipAddress) ? ipAddress[0] : ipAddress;

//     // Increment visit count for the IP address
//     if (ipAddressToUse) {
//       visitCounts[ipAddressToUse] = visitCounts[ipAddressToUse] ? visitCounts[ipAddressToUse] + 1 : 1;
//     }

//     // Save the updated visitCounts object to localStorage
//     window.localStorage.setItem("visitCounts", JSON.stringify(visitCounts));
//   }, [ipAddress]);

//   // Retrieve the visitCounts object from localStorage
//   const visitCountsString = window.localStorage.getItem("visitCounts") || "{}";
//   const visitCounts = JSON.parse(visitCountsString);

//   // Extract the first IP address if it is an array
//   const ipAddressToUse = Array.isArray(ipAddress) ? ipAddress[0] : ipAddress;

//   // Return the visit count
//   const visitCount = visitCounts && visitCounts[ipAddressToUse] ? visitCounts[ipAddressToUse] : 0;
//   return visitCount;
// }
