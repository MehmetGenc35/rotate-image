"use client";
import { useEffect, useRef } from "react";

export default function Home() {
  const viewerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js";
    script.onload = () => {
      window.pannellum.viewer(viewerRef.current, {
        type: "equirectangular",
        panorama: "/ambulance.jpg", // Panoramik görüntünüzün yolunu buraya ekleyin
        autoLoad: true,
        hotSpots: [
          {
            pitch: 10, // Yatay eksende butonun konumu
            yaw: 100, // Dikey eksende butonun konumu
            cssClass: "custom-hotspot", // Butona özel CSS sınıfı
            createTooltipFunc: hotspotButton, // Buton oluşturma fonksiyonu
          },
        ],
      });
    };
    document.head.appendChild(script);

    const link = document.createElement("link");
    link.href =
      "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  // Hotspot oluşturma fonksiyonu
  function hotspotButton(hotSpotDiv, args) {
    hotSpotDiv.classList.add("custom-hotspot");
    const button = document.createElement("button");
    button.innerText = "Click Me";
    button.style.padding = "10px";
    button.style.background = "rgba(255, 255, 255, 0.8)";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.onclick = () => {
      alert("Hotspot button clicked!");
    };
    hotSpotDiv.appendChild(button);
  }

  return <div style={{ width: "100%", height: "500px" }} ref={viewerRef}></div>;
}
