import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function OwnerDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/owner/dashboard").then(res => setData(res.data));
  }, []);

  if (!data) return null;

  return (
    <div>
      <h2>{data.storeName}</h2>
      <p>Average Rating: {data.averageRating}</p>

      <h3>Ratings</h3>
      {data.ratings.map(r => (
        <p key={r.id}>{r.name} rated {r.rating}</p>
      ))}
    </div>
  );
}
