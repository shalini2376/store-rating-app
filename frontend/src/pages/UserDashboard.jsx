import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function UserDashboard() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    api.get("/user/stores").then(res => setStores(res.data));
  }, []);

  const rateStore = async (storeId, rating) => {
    await api.post("/user/ratings", { store_id: storeId, rating });
    alert("Rating submitted");
  };

  return (
    <div>
      <h2>Stores</h2>
      {stores.map(store => (
        <div key={store.id}>
          <h4>{store.name}</h4>
          <p>Avg Rating: {store.avgRating}</p>
          <button onClick={() => rateStore(store.id, 5)}>Rate 5</button>
        </div>
      ))}
    </div>
  );
}
