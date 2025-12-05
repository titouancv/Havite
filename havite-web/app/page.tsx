"use client";

import { useState, useEffect, useCallback } from "react";
import { CATEGORIES, RecapOverview } from "@/types";
import { fetchAllRecapsOverview } from "@/api/recap";
import RecapCardList from "@/components/RecapCardList";
import Input from "@/components/ui/Input";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [recapOverviews, setRecapOverviews] = useState<RecapOverview[]>([]);
  const [nextCursor, setNextCursor] = useState<number | undefined>(undefined);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  const loadRecaps = useCallback(async (cursor?: number) => {
    try {
      const result = await fetchAllRecapsOverview(cursor?.toString(), 10);
      if (cursor) {
        setRecapOverviews((prev) => [...prev, ...result.items]);
      } else {
        setRecapOverviews(result.items);
      }
      setNextCursor(result.nextCursor);
      setHasNextPage(!!result.nextCursor);
    } catch (error) {
      console.error("Failed to fetch recaps:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecaps();
  }, [loadRecaps]);

  const fetchNextPage = useCallback(async () => {
    if (!hasNextPage || isFetchingNextPage) return;
    setIsFetchingNextPage(true);
    await loadRecaps(nextCursor);
    setIsFetchingNextPage(false);
  }, [hasNextPage, isFetchingNextPage, nextCursor, loadRecaps]);

  const filteredRecaps = recapOverviews.filter((recap) => {
    const category = CATEGORIES[recap.category] || CATEGORIES["all"];
    const matchesSearch = recap.summary
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      (category.id === "all" && selectedCategory === "news") ||
      recap.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full h-full overflow-hidden">
      <h1 className="font-bold hidden md:block">Quoi de neuf ?</h1>
      <Input
        type="text"
        placeholder="Rechercher un sujet..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="flex gap-2 overflow-x-auto w-full scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {Object.values(CATEGORIES).map((category, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelectedCategory(category.id)}
          >
            <div
              className={`shrink-0 px-4 py-2 rounded-[20px] border text-sm cursor-pointer whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? "text-gray-800"
                  : "border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200 hover:border-gray-400"
              }`}
              style={
                selectedCategory === category.id
                  ? {
                      backgroundColor: category.color,
                      borderColor: category.color,
                      color: "#1f2937",
                    }
                  : undefined
              }
            >
              {category.label}
            </div>
          </button>
        ))}
      </div>
      <RecapCardList
        recapOverviews={filteredRecaps}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
}

export default Home;
