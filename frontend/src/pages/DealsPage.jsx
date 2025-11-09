import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function DealsPage() {
    const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const game = searchParams.get("game");
  const storeID = searchParams.get("storeID");

  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true);

      let url;
      if (storeID) {
        url = `https://www.cheapshark.com/api/1.0/deals?storeID=${storeID}&upperPrice=50&pageSize=20`;
      } else if (game) {
        url = `https://www.cheapshark.com/api/1.0/deals?title=${encodeURIComponent(game)}&upperPrice=50&pageSize=20`;
      }

      const res = await axios.get(url);
      setDeals(res.data);
      setLoading(false);
    };

    fetchDeals();
  }, [game, storeID]);

  const storeMap = {
    1: "Steam",
    2: "GamersGate",
    3: "GreenManGaming",
    7: "GOG",
    11: "Humble Store",
    13: "Uplay",
    15: "Fanatical",
    21: "WinGameStore",
    23: "GameBillet",
    25: "Epic Games Store",
    27: "Gamesplanet",
    28: "Gamesload",
    29: "2Game",
    30: "IndieGala",
    34: "Noctre",
    35: "DreamGame",
  };

  return (
    <div className="bg-white dark:bg-black min-h-screen text-black dark:text-white">
      <Header />

      <div className="pt-28 px-6">
        <h1 className="text-3xl font-bold">
          {storeID
            ? ` ${storeID ? `Deals from ${storeMap[storeID]} store` : `Deals for ${game}`}
`
            : `Deals for ${game} `}
        </h1>

        {loading ? (
          <p className="mt-6 text-lg">Loading...</p>
        ) : deals.length === 0 ? (
          <p className="mt-6 text-lg">No deals found.</p>
        ) : (
          <div className="flex flex-wrap gap-8 mt-8">
            {deals.map((deal) => (
              <div
                key={deal.dealID}
                onClick={() => navigate(`/deal/${deal.dealID}`)}
                className="w-48 shadow-md rounded-lg overflow-hidden bg-white dark:bg-gray-800 cursor-pointer hover:shadow-xl transition"
              >
                <img
                  src={deal.thumb}
                  alt={deal.title}
                  className="w-full h-32 object-contain bg-gray-200 dark:bg-gray-700"
                />
                <div className="p-2">
                  <h3 className="font-semibold truncate">{deal.title}</h3>
                  <p className="text-sm line-through text-gray-500">
                    ${deal.normalPrice}
                  </p>
                  <p className="text-lg text-blue-600 font-bold">
                    ${deal.salePrice}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
