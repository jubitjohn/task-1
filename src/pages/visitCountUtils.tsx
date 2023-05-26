import { useEffect, useState } from "react";

export function useIncrementVisitCount(ipAddress: string | string[]): number {
  const [visitCount, setVisitCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set the flag to true after the initial mount

    return () => {
      setIsMounted(false); // Set the flag to false when the component unmounts
    };
  }, []);

  useEffect(() => {
    if (isMounted) {
      const visitCountsString = localStorage.getItem("visitCounts") || "{}";
      const visitCounts = JSON.parse(visitCountsString);

      const ipAddressToUse = Array.isArray(ipAddress) ? ipAddress[0] : ipAddress;

      if (ipAddressToUse) {
        visitCounts[ipAddressToUse] = visitCounts[ipAddressToUse]
          ? visitCounts[ipAddressToUse] + 1
          : 1;
      }

      localStorage.setItem("visitCounts", JSON.stringify(visitCounts));

      const updatedVisitCount = visitCounts[ipAddressToUse] || 0;
      setVisitCount(updatedVisitCount);
      console.log("fn running");
    }
  }, [ipAddress, isMounted]);

  return visitCount;
}
