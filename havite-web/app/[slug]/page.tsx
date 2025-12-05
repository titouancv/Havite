"use client";

import { use, useState, useEffect } from "react";
import { CATEGORIES, Recap } from "@/types";
import { fetchRecapById } from "@/api/recap";
import Social from "@/components/Social";
import MessageInfoBoxComponent from "@/components/ui/MessageInfoBox";
import Sources from "@/components/Sources";
import Comments from "@/components/Comments";
import ImageViewer from "@/components/ImageViewer";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import glyph from "../../assets/glyph.svg";
import Button from "@/components/ui/Button";

interface RecapViewProps {
  params: Promise<{ slug: string }>;
}

export default function RecapView({ params }: RecapViewProps) {
  const { slug } = use(params);
  const [recap, setRecap] = useState<Recap | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const scrollToComments = searchParams.get("comments") === "true";

  useEffect(() => {
    if (!slug) return;
    fetchRecapById(slug)
      .then(setRecap)
      .catch((error) => console.error("Error fetching recap:", error))
      .finally(() => setIsLoading(false));
  }, [slug]);

  useEffect(() => {
    if (!isLoading && scrollToComments) {
      setTimeout(() => {
        document
          .getElementById("comments")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [isLoading, scrollToComments]);

  const imageUrl = recap?.article?.imageUrl || undefined;

  const [isImageValid, setIsImageValid] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollTop > 20);
  };

  const categoryName = recap?.article?.category
    ? CATEGORIES[recap?.article?.category].label
    : "Actualité";

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Chargement...
      </div>
    );
  }

  if (!recap) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Article non trouvé
      </div>
    );
  }

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-start gap-2 md:gap-6`}
    >
      <div className="flex items-start justify-between w-full">
        <h1
          className={`font-bold max-w-[80%] text-base sm:text-xl transition-all duration-300 ease-in-out ${
            isScrolled ? "line-clamp-2 opacity-90" : "opacity-100"
          }`}
        >
          {recap?.article.title}
        </h1>
        <Button variant="transparent" onClick={router.back}>
          <Image src={glyph} alt="Close icon" />
        </Button>
      </div>
      <div
        className="flex-1 w-full overflow-y-auto pb-4"
        onScroll={handleScroll}
      >
        <div className="grid md:grid-cols-[60%_35%] items-start justify-between w-full grid-cols-1 md:gap-6">
          {isImageValid && imageUrl && (
            <ImageViewer
              src={imageUrl}
              alt=""
              className="col-span-full w-full h-[250px] object-cover rounded mb-4"
              onError={() => setIsImageValid(false)}
              description={recap?.article.title}
            />
          )}
          <div className="flex flex-col items-start justify-start gap-4">
            <div className="flex flex-col items-start justify-start w-full">
              <div className="flex items-center gap-2 text-sm text-gray-800 mb-2">
                <span className="font-semibold uppercase tracking-wide">
                  {categoryName}
                </span>
                <span>•</span>
                <span>{recap?.article?.readingTime} min de lecture</span>
              </div>
            </div>
            <p>{recap?.article?.content}</p>
          </div>
          <div className="flex flex-col items-start justify-start gap-3">
            <Social recapId={slug} />
            <MessageInfoBoxComponent
              content="Article généré par l'intelligence artificielle"
              type="info"
            />
            <Sources sources={recap?.sources} />
          </div>
          <div className="col-span-full w-full pt-4">
            <Comments recapId={slug} />
          </div>
        </div>
      </div>
    </div>
  );
}
