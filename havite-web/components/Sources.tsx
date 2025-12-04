import Button from "./ui/Button";
import { Sources as SourcesType } from "@/types";

interface SourcesProps {
  sources?: SourcesType[];
}

const Sources: React.FC<SourcesProps> = ({ sources = [] }) => {
  const openSourceLink = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-col items-start justify-start w-full p-3 bg-gray-200 text-gray-800">
      <h2 className="font-bold">Sources</h2>
      {sources.map((source, index) => (
        <div
          key={index}
          className="flex items-center justify-between w-full border-b border-gray-400 py-3 last:border-b-0"
        >
          <p>{source.media.name}</p>
          <Button variant="primary" onClick={() => openSourceLink(source.url)}>
            {"Voir l'article"}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Sources;
