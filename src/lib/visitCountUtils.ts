// visitCountUtils.ts

export function incrementVisitCount(ipAddress: string | string[]) {
    let visitCounts;
  
    // Client-side code
    if (typeof window !== 'undefined') {
      try {
        // Retrieve the visitCounts object from localStorage or initialize it if it doesn't exist
        const visitCountsString = window.localStorage.getItem('visitCounts') || '{}';
        visitCounts = JSON.parse(visitCountsString);
      } catch (error) {
        console.error('Error parsing visitCounts from localStorage:', error);
        visitCounts = {};
      }
  
      // Extract the first IP address if it is an array
      const ipAddressToUse = Array.isArray(ipAddress) ? ipAddress[0] : ipAddress;
      console.log('IP Address:', ipAddressToUse);
  
      // Increment visit count for the IP address
      if (ipAddressToUse) {
        visitCounts[ipAddressToUse] = visitCounts[ipAddressToUse] ? visitCounts[ipAddressToUse] + 1 : 1;
      }
  
      // Save the updated visitCounts object to localStorage
      console.log(visitCounts);
      window.localStorage.setItem('visitCounts', JSON.stringify(visitCounts));
    }
    console.log('If not exected');
  
    // Return the visit count
    const ipAddressToUse = Array.isArray(ipAddress) ? ipAddress[0] : ipAddress;
    const visitCount = visitCounts && visitCounts[ipAddressToUse] ? visitCounts[ipAddressToUse] : 0;
    console.log(visitCount);
    return visitCount;
  }
  