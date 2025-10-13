import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const navigate = useNavigate();

  // --- STORES LIST ---
 const stores = [
  { id: 1, name: "Steam", img: "https://www.cheapshark.com/img/stores/logos/0.png" },
  { id: 2, name: "GamersGate", img: "https://www.cheapshark.com/img/stores/logos/1.png" },
  { id: 3, name: "GreenManGaming", img: "https://www.cheapshark.com/img/stores/logos/2.png" },
  { id: 7, name: "GOG", img: "https://www.cheapshark.com/img/stores/logos/6.png" },
  { id: 11, name: "Humble Store", img: "https://www.cheapshark.com/img/stores/logos/10.png" },
  { id: 13, name: "Uplay", img: "https://www.cheapshark.com/img/stores/logos/12.png" },
  { id: 15, name: "Fanatical", img: "https://www.cheapshark.com/img/stores/logos/14.png" },
  { id: 21, name: "WinGameStore", img: "https://www.cheapshark.com/img/stores/logos/20.png" },
  { id: 23, name: "GameBillet", img: "https://www.cheapshark.com/img/stores/logos/22.png" },
  { id: 25, name: "Epic Games Store", img: "https://www.cheapshark.com/img/stores/logos/24.png" },
  { id: 27, name: "Gamesplanet", img: "https://www.cheapshark.com/img/stores/logos/26.png" },
  { id: 28, name: "Gamesload", img: "https://www.cheapshark.com/img/stores/logos/27.png" },
  { id: 29, name: "2Game", img: "https://www.cheapshark.com/img/stores/logos/28.png" },
  { id: 30, name: "IndieGala", img: "https://www.cheapshark.com/img/stores/logos/29.png" },
  { id: 34, name: "Noctre", img: "https://www.cheapshark.com/img/stores/logos/33.png" },
  { id: 35, name: "DreamGame", img: "https://www.cheapshark.com/img/stores/logos/34.png" }
];

  const dashstrore=[
    {id: 1, name: "Steam", img: "https://www.cheapshark.com/images/stores/1.png"},
    {id: 11, name: "Humble Store", img: "https://www.cheapshark.com/images/stores/11.png" },
    { id: 47, name: "GreenManGaming", img: "https://www.cheapshark.com/images/stores/47.png" },
    { id: 25, name: "Epic Games", img: "https://www.cheapshark.com/images/stores/25.png" }, 
    { id: 3, name: "GreenManGaming", img: "https://www.cheapshark.com/images/stores/3.png" },
    { id: 21, name: "Microsoft Store", img: "https://www.cheapshark.com/images/stores/21.png" },




  ]
 


  // --- Store ID to name mapping ---
  const storeMap = Object.fromEntries(stores.map((s) => [s.id, s.name]));

  // --- Fetch user info ---
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  // --- Search games (debounced) ---
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim()) handleSearch();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const response = await axios.get(
        `https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(
          searchQuery
        )}`
      );
      setSearchResults(response.data);
    } catch (err) {
      console.error("Error searching games:", err);
    }
  };

  // --- Fetch deals by store ---
  const fetchDealsByStore = async (storeID) => {
    setLoading(true);
    setSelectedStore(storeID);
    setSearchResults([]);
    setDeals([]);

    try {
      const response = await axios.get(
        `https://www.cheapshark.com/api/1.0/deals?storeID=${storeID}&upperPrice=50&pageSize=15`
      );

      const formatted = response.data.map((deal) => ({
        title: deal.title,
        image: deal.thumb,
        normalPrice: deal.normalPrice,
        salePrice: deal.salePrice,
        dealID: deal.dealID,
        storeID: deal.storeID,
        storeName: storeMap[parseInt(deal.storeID)] || "Unknown",
      }));

      setDeals(formatted);
    } catch (err) {
      console.error("Error fetching deals by store:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- Fetch deals by searched game ---
  const fetchDealsByGame = async (title) => {
    setLoading(true);
    setSelectedStore(null);
    setDeals([]);
    setSearchResults([]);

    try {
      const response = await axios.get(
        `https://www.cheapshark.com/api/1.0/deals?title=${encodeURIComponent(
          title
        )}&upperPrice=50&pageSize=15`
      );

      const formatted = response.data.map((deal) => ({
        title: deal.title,
        image: deal.thumb,
        normalPrice: deal.normalPrice,
        salePrice: deal.salePrice,
        dealID: deal.dealID,
        storeID: deal.storeID,
        storeName: storeMap[parseInt(deal.storeID)] || "Unknown",
      }));

      setDeals(formatted);
    } catch (err) {
      console.error("Error fetching deals for game:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- Close dropdown when clicking outside ---
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".search-dropdown")) setSearchResults([]);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white min-h-screen">
      <Header />

      {/* --- Welcome + Search Section --- */}
      <div className="pt-28 px-6 py-4 text-2xl font-semibold flex justify-between gap-4">
        <div>Welcome, {user ? user.firstname : "User"} 👋</div>

        <div className="relative w-full max-w-md">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your game here"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-400 dark:border-gray-600
              focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
              bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
          />

          {/* --- Search results dropdown --- */}
          {searchResults.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto search-dropdown">
              {searchResults.map((game) => (
                <div
                  key={game.gameID}
                  onClick={() => fetchDealsByGame(game.external)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  {game.external}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* --- Store Tiles --- */}
      <div className="px-6 py-8">
        <h2 className="text-xl font-bold mb-4">Top deals by a store</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {stores.map((store) => (
            <div
              key={store.id}
              onClick={() => fetchDealsByStore(store.id)}
              className={`cursor-pointer flex flex-col items-center justify-center p-4 rounded-2xl shadow-md bg-gray-100 dark:bg-gray-800 hover:shadow-lg transition-all border-2 ${
                selectedStore === store.id
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
            >
              <img
                src={store.img}
                alt={store.name}
                className="w-16 h-16 object-contain mb-2"
              />
              <span className="font-medium">{store.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- Deals Section --- */}
      {(selectedStore || deals.length > 0) && (
        <div className="px-6 py-8">
          <h2 className="text-xl font-bold mb-4">
            {selectedStore
              ? `Deals from ${storeMap[selectedStore]}`
              : "Game Deals"}
          </h2>

          {loading ? (
            <p>Loading deals...</p>
          ) : deals.length === 0 ? (
            <p>No deals found.</p>
          ) : (
            <div className="flex flex-wrap gap-8">
              {deals.map((deal) => (
                <div
                  key={deal.dealID}
                  className="w-48 shadow-lg rounded-lg overflow-hidden bg-white dark:bg-gray-800 hover:shadow-xl transition-all"
                >
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-32 object-contain bg-gray-200 dark:bg-gray-700"
                  />
                  <div className="p-2">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {deal.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
                      ${deal.normalPrice}
                    </p>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      ${deal.salePrice}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Platform:{" "}
                      <span className="font-medium">
                        {deal.storeName || "Unknown"}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
