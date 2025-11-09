import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

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
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setUser(response.data);
      } catch (err) {
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);


  // Search with API debounce
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!searchQuery.trim()) return;
      const response = await axios.get(
        `https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(searchQuery)}`
      );
      setSearchResults(response.data);
    }, 500);
    return () => clearTimeout(delay);
  }, [searchQuery]);

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

      {/* Welcome + Search */}
      <div className="pt-28 px-6 py-4 text-2xl font-semibold flex justify-between gap-4">
        <div>Welcome, {user ? user.firstname : "User"} 👋</div>

        <div className="relative w-full max-w-md">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your game here"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-400 dark:border-gray-600
              bg-gray-100 dark:bg-gray-700"
          />

          {searchResults.length > 0 && (
            <div className="absolute mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto search-dropdown">
              {searchResults.map((game) => (
                <div
                  key={game.gameID}
                  onClick={() =>
                    navigate(`/deals?game=${encodeURIComponent(game.external)}`)
                  }
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  {game.external}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Store grid */}
      <div className="px-6 py-8">
        <h2 className="text-xl font-bold mb-4">Top deals by a store</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {stores.map((store) => (
            <div
              key={store.id}
              onClick={() => navigate(`/deals?storeID=${store.id}`)}
              className="cursor-pointer flex flex-col items-center justify-center p-4 rounded-2xl shadow-md bg-gray-100 dark:bg-gray-800 hover:shadow-lg"
            >
              <img src={store.img} className="w-16 h-16 object-contain mb-2" />
              <span className="font-medium">{store.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
