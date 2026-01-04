"use client";

import { useState } from "react";

// 부모에게 받을 데이터 타입
type PriceProps = {
  prices: {
    low: number;
    semi: number;
    peak: number;
  };
};

export default function ReservationBox({ prices }: PriceProps) {
  // 날짜 계산 로직 삭제 -> 가장 저렴한 비수기 가격을 '시작가'로 보여줌
  const startPrice = prices.low.toLocaleString();

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-[#D4C5B5] p-8 md:p-10 rounded-sm sticky top-8 shadow-sm">
      
      {/* 1. 가격 표시 영역 */}
      <div className="mb-8 pb-8 border-b border-[#EAE5DD]">
        <span className="text-[#8C7B6C] text-sm font-bold tracking-widest uppercase mb-2 block">
          Starts From
        </span>
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-serif font-bold text-[#4A4036]">
            ₩ {startPrice} ~
          </span>
          <span className="text-base text-[#8C7B6C] font-light">/ 1박</span>
        </div>
      </div>

      {/* 2. 안내 멘트 */}
      <div className="space-y-6">
        <div className="text-[#595048] font-light leading-relaxed">
          <p className="mb-2">
            <span className="font-medium text-[#4A4036]">기준 2인 / 최대 4인</span>
          </p>
          <p className="text-sm opacity-80">
            * 객실 요금은 실시간 예약 현황 및 시즌에 따라 변동될 수 있습니다.
          </p>
        </div>

        {/* 3. 네이버 예약 버튼 (아웃링크) */}
        <a 
          href="https://naver.me/GgWad60n" /* ★ 여기에 사장님 네이버 예약 주소 입력 */
          target="_blank" 
          rel="noopener noreferrer" 
          className="block w-full py-6 bg-[#4A4036] text-[#F9F7F2] text-center text-lg font-serif tracking-[0.2em] hover:bg-[#8C7B6C] hover:-translate-y-1 transition duration-500 shadow-md"
        >
          실시간 예약하기 &rarr;
        </a>
        
        {/* 4. 신뢰도 문구 */}
        <div className="text-center pt-2">
          <p className="text-xs text-[#8C7B6C] tracking-wide opacity-70">
            네이버 예약을 통해 안전하게 결제됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}