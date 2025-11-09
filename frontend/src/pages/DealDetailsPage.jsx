import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

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

export default function DealDetails() {
  const { dealID } = useParams();
  const navigate = useNavigate();
  const [dealData, setDealData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.cheapshark.com/api/1.0/deals?id=${dealID}%3D`
        );
        console.log(dealID)
        setDealData(response.data);
      } catch (err) {
        console.log(dealID)
        console.error("Error fetching deal details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [dealID]);

  if (loading)
    return <div className="pt-24 px-10 text-center">Loading details...</div>;

  if (!dealData || !dealData.gameInfo)
    return <div className="pt-24 px-10 text-center">Deal not found.</div>;

  const deal = dealData.gameInfo;
  const store = dealData.storeInfo || {};

  const savingPercentage = Math.round(
    ((deal.retailPrice - deal.salePrice) / deal.retailPrice) * 100
  );

  const storeName =
    storeMap[parseInt(deal.storeID)] ||
    store.storeName ||
    "Unknown Store";

  const storeLogo =
    store.images?.logo &&
    `https://www.cheapshark.com/${store.images.logo}`;

  return (
    <>
      <Header />

      <div className="pt-24 px-10 min-h-screen bg-white dark:bg-black text-black dark:text-white">

        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"
        >
          ⬅ Back
        </button>

        <div className="flex flex-wrap gap-10">
          <img
            src={deal.thumb}
            alt={deal.name}
            className="w-72 h-72 object-contain rounded-xl bg-gray-200 dark:bg-gray-700 shadow-lg"
          />

          <div className="max-w-xl">
            <h1 className="text-4xl font-bold mb-3">{deal.name}</h1>

            <p className="text-gray-500 line-through text-lg">
              Retail: ${deal.retailPrice}
            </p>

            <p className="text-4xl text-blue-500 font-bold mb-2">
              ${deal.salePrice}
            </p>

            <p className="text-green-500 font-semibold text-lg mb-3">
              💸 Save {savingPercentage}%!
            </p>

            {deal.steamRatingPercent && (
              <p className="text-lg mb-1">
                ⭐ Steam Rating: {deal.steamRatingPercent}% ({deal.steamRatingText})
              </p>
            )}

            {deal.metacriticScore && (
              <p className="text-lg mb-1">🎯 Metacritic: {deal.metacriticScore}</p>
            )}

            {deal.releaseDate && (
              <p className="text-md mb-3 text-gray-400">
                📅 Release: {new Date(deal.releaseDate * 1000).toLocaleDateString()}
              </p>
            )}

            <p className="text-lg mb-4 flex items-center gap-2">
              🏪 Store: <span className="font-bold">{storeName}</span>
              {storeLogo && (
                <img
                  src={storeLogo}
                  alt={storeName}
                  className="w-10 h-10 object-contain"
                />
              )}
            </p>

            {/* ✅ Correct Buy Redirect */}
            <a
              href={`https://www.cheapshark.com/redirect?dealID=${dealID}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition"
            >
              Buy Now 🔥
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
