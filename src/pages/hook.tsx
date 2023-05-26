import { useEffect, useState } from "react";

export function IncrementVisitCount(ipAddress: string | string[]) {
  // Set the value received from the local storage to a local state
  const [favoriteNumber, setFavoriteNumber] = useState<string>("");

  useEffect(() => {
    let value: string | null;
    // Get the value from local storage if it exists
    value = localStorage.getItem("favoriteNumber") || "";
    setFavoriteNumber(value);
  }, []);

  // When user submits the form, save the favorite number to the local storage
  const saveToLocalStorage = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("favoriteNumber", favoriteNumber);
  };

  return (
    <div>
      <label htmlFor="number">Your favorite number</label>
      <form onSubmit={saveToLocalStorage}>
        <input
          id="number"
          value={favoriteNumber}
          onChange={(e) => setFavoriteNumber(e.target.value)}
        />
        <input type="submit" value="Save" />
      </form>
    </div>
  );
}
