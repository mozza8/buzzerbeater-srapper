const backendUrl = import.meta.env.VITE_API_URL;

export const callScraper = async () => {
  try {
    const res = await fetch(`${backendUrl}/scrape/`);
    if (!res.ok) throw new Error("Request failed");
    return true;
  } catch (err) {
    return false;
  }
};

export const getLastCallScraper = async () => {
  let data = "";
  try {
    const res = await fetch(`${backendUrl}/lastCall/`);
    if (!res.ok) throw new Error("Request failed");
    data = await res.json();
    console.log("data", data);
  } catch (err) {
  } finally {
    return data;
  }
};

export const getPlayers = async () => {
  let data = [];
  try {
    const res = await fetch(`${backendUrl}/players/`);
    if (!res.ok) throw new Error("Request failed");
    data = await res.json();
    console.log("data", data);
  } catch (err) {
  } finally {
    return data.players;
  }
};
