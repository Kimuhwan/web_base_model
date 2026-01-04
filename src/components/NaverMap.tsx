"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    naver: any;
  }
}

export default function NaverMap() {
  const mapElement = useRef<HTMLDivElement | null>(null);

  // 지도 초기화 함수
  const initializeMap = () => {
    if (!mapElement.current || !window.naver) return;

    // 강릉 경포대 근처 임의 좌표 (원하는 좌표로 수정하세요)
    const location = new window.naver.maps.LatLng(37.7913, 128.9084);

    const mapOptions = {
      center: location,
      zoom: 16,
      zoomControl: true,
      zoomControlOptions: {
        position: window.naver.maps.Position.TOP_RIGHT,
      },
    };

    const map = new window.naver.maps.Map(mapElement.current, mapOptions);

    // 마커 찍기
    new window.naver.maps.Marker({
      position: location,
      map: map,
    });
  };

  return (
    <>
      {/* ★ 중요: 'YOUR_CLIENT_ID' 부분에 네이버 클라우드에서 발급받은 키를 넣어야 보입니다.
        발급처: https://console.ncloud.com/naver-service/application
      */}
      <Script
        strategy="afterInteractive"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID`} 
        onReady={initializeMap}
      />
      <div ref={mapElement} className="w-full h-full min-h-[400px]" />
    </>
  );
}