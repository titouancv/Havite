"use client";

import { useState } from "react";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface ImageViewerProps {
  src: string;
  alt?: string;
  className?: string;
  description?: string;
  onError?: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  src,
  alt = "",
  className = "",
  description = "",
  onError,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const MIN_SCALE = 1;
  const MAX_SCALE = 5;
  const SCALE_STEP = 0.5;

  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }, 200);
  };

  const zoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => Math.min(prev + SCALE_STEP, MAX_SCALE));
  };

  const zoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newScale = Math.max(scale - SCALE_STEP, MIN_SCALE);
    setScale(newScale);
    if (newScale === MIN_SCALE) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const delta = e.deltaY > 0 ? -SCALE_STEP : SCALE_STEP;
    const newScale = Math.max(MIN_SCALE, Math.min(scale + delta, MAX_SCALE));
    setScale(newScale);
    if (newScale === MIN_SCALE) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      e.stopPropagation();
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      e.stopPropagation();
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(2.5);
    }
  };

  return (
    <>
      {/* Thumbnail Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`cursor-pointer hover:opacity-90 transition-opacity ${className}`}
        onClick={openModal}
        onError={onError}
      />

      {/* Modal */}
      {isModalOpen && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-200 ${
            isClosing ? "opacity-0" : "opacity-100"
          }`}
          onClick={closeModal}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Zoom Controls */}
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            <button
              className="p-2 text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              onClick={zoomIn}
              aria-label="Zoom avant"
            >
              <ZoomIn size={24} />
            </button>
            <button
              className="p-2 text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              onClick={zoomOut}
              aria-label="Zoom arrière"
            >
              <ZoomOut size={24} />
            </button>
            <button
              className="p-2 text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              onClick={handleReset}
              aria-label="Réinitialiser"
            >
              <RotateCcw size={24} />
            </button>
            <span className="flex items-center px-3 text-white text-sm bg-white/10 rounded-full">
              {Math.round(scale * 100)}%
            </span>
          </div>

          {/* Close Button */}
          <button
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors z-10"
            onClick={closeModal}
            aria-label="Fermer"
          >
            <X size={32} />
          </button>

          {/* Full Size Image */}
          <div
            className="overflow-hidden flex items-center justify-center w-full h-full"
            onWheel={handleWheel}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className={`max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl transition-transform ${
                isDragging
                  ? "cursor-grabbing"
                  : scale > 1
                    ? "cursor-grab"
                    : "cursor-zoom-in"
              } ${isClosing ? "scale-95" : ""}`}
              style={{
                transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                transitionDuration: isDragging ? "0ms" : "200ms",
              }}
              onClick={handleDoubleClick}
              onMouseDown={handleMouseDown}
              draggable={false}
            />
          </div>

          {/* Instructions */}
          <div className="absolute bottom-12 w-full text-center text-white/60 text-sm">
            {description}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageViewer;
