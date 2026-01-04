"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

export default function RoomGallery({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* 1. 메인 갤러리 영역 */}
      <div className="relative h-[50vh] md:h-[70vh] w-full bg-gray-100 group overflow-hidden">
        <img 
          src={images[currentIndex]} 
          alt={`Room Image ${currentIndex + 1}`} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />
        
        {/* 화살표 버튼 (PC에서는 호버시 등장, 모바일은 항상 표시) */}
        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button onClick={prevImage} className="pointer-events-auto bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white hover:text-[#4A4036] transition">
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextImage} className="pointer-events-auto bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white hover:text-[#4A4036] transition">
            <ChevronRight size={24} />
          </button>
        </div>

        {/* 하단 인디케이터 & 확대 버튼 */}
        <div className="absolute bottom-6 right-6 flex items-center gap-3">
          <span className="bg-black/30 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs tracking-widest">
            {currentIndex + 1} / {images.length}
          </span>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white hover:text-[#4A4036] transition"
          >
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      {/* 2. 전체화면 모달 (Lightbox) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center animate-fade-in">
          {/* 닫기 버튼 */}
          <button 
            onClick={() => setIsModalOpen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2"
          >
            <X size={40} />
          </button>

          {/* 큰 이미지 */}
          <div className="relative w-full max-w-7xl h-[80vh] px-4 md:px-20 flex items-center justify-center">
            <img 
              src={images[currentIndex]} 
              alt="Full Screen" 
              className="max-w-full max-h-full object-contain shadow-2xl"
            />
            
            {/* 모달 내부 화살표 */}
            <button onClick={prevImage} className="absolute left-4 md:left-8 text-white/50 hover:text-white transition">
              <ChevronLeft size={48} />
            </button>
            <button onClick={nextImage} className="absolute right-4 md:right-8 text-white/50 hover:text-white transition">
              <ChevronRight size={48} />
            </button>
          </div>

          {/* 하단 썸네일 리스트 */}
          <div className="absolute bottom-10 left-0 w-full flex justify-center gap-2 px-4 overflow-x-auto">
            {images.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-16 h-16 md:w-20 md:h-20 flex-shrink-0 cursor-pointer border-2 transition-all rounded-sm overflow-hidden ${currentIndex === idx ? 'border-white opacity-100' : 'border-transparent opacity-40 hover:opacity-100'}`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}