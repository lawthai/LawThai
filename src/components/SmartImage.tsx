import React, { useState, useEffect } from "react";

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackType:
    | "logo"
    | "hero"
    | "about"
    | "team"
    | "client-startup"
    | "client-corporate"
    | "client-individual"
    | "generic";
  aspectRatioClassName?: string;
  overlay?: boolean;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  className = "",
  fallbackType,
  aspectRatioClassName = "",
  overlay = false,
}) => {
  const resolveSrc = (path: string) => {
    if (path.startsWith("/public/")) {
      return path.replace(/^\/public/, "");
    }
    return path;
  };

  const [currentSrc, setCurrentSrc] = useState(() => resolveSrc(src));
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCurrentSrc(resolveSrc(src));
    setHasError(false);
  }, [src]);

  const handleImageError = () => {
    setHasError(true);
  };

  const renderFallback = () => {
    switch (fallbackType) {
      case "logo":
        return (
          <div className={`flex items-center justify-center bg-gradient-to-br from-primary via-[#16504C] to-dark text-white rounded-lg p-2 ${className}`}>
            <svg
              className="w-8 h-8 mr-2 text-accent-light"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
              />
            </svg>
            <span className="font-sans font-bold tracking-wider text-lg">LAW THAI</span>
          </div>
        );

      case "hero":
        return (
          <div className={`relative w-full h-full min-h-[500px] md:min-h-[600px] bg-gradient-to-br from-dark via-[#0d3b38] to-primary overflow-hidden ${className}`}>
            {/* Animated backdrop abstract styling to replace the image */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            {/* High-end vector graphics representing modern growth and skyline */}
            <div className="absolute bottom-0 right-0 left-0 h-48 opacity-20 bg-gradient-to-t from-accent-light to-transparent" />
            <div className="absolute right-0 bottom-0 top-0 w-1/2 hidden md:flex items-center justify-center p-8 opacity-40">
              <svg
                className="w-96 h-96 text-accent-light"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
          </div>
        );

      case "about":
        return (
          <div className={`relative w-full h-full bg-gradient-to-tr from-[#0F6B66] to-[#1F9A90] flex flex-col items-center justify-center p-8 text-white rounded-2xl overflow-hidden min-h-[350px] shadow-lg ${className}`}>
            <div className="absolute inset-0 bg-black/10" />
            <div className="z-10 text-center flex flex-col items-center">
              <div className="p-4 bg-white/10 rounded-full mb-4 backdrop-blur-sm border border-white/20">
                <svg
                  className="w-12 h-12 text-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h4 className="font-bold text-xl mb-2 text-white">สำนักงานกฎหมายและการบัญชีระดับพรีเมียม</h4>
              <p className="text-white/80 text-sm max-w-sm font-light">
                มุ่งมั่นให้บริการปรึกษาทางธุรกิจและกฎหมายแบบครบวงจร ด้วยมาตรฐานสากล
              </p>
            </div>
            {/* Elegant thin lines */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-gold/30 rounded-full" />
            <div className="absolute -top-10 -left-10 w-32 h-32 border border-accent-light/20 rounded-full" />
          </div>
        );

      case "team":
        return (
          <div className={`relative w-full h-full bg-gradient-to-br from-[#125A56] to-[#0A2928] flex flex-col items-center justify-center p-8 text-white rounded-2xl overflow-hidden min-h-[300px] shadow-md ${className}`}>
            <div className="z-10 text-center">
              <svg
                className="w-14 h-14 mx-auto text-gold mb-3 opacity-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h5 className="font-semibold text-lg text-white">ทีมทนายความและที่ปรึกษาผู้เชี่ยวชาญ</h5>
              <p className="text-xs text-accent-light mt-1 uppercase tracking-wider">LAW THAI professionals</p>
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent pointer-events-none" />
          </div>
        );

      case "client-startup":
        return (
          <div className={`relative w-full h-64 bg-gradient-to-br from-[#0F6B66] via-[#1E5754] to-dark flex flex-col justify-end p-6 text-white rounded-2xl overflow-hidden group shadow-lg ${className}`}>
            <div className="absolute inset-0 bg-black/15 group-hover:bg-black/10 transition-colors duration-300" />
            <div className="absolute top-6 left-6 p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <svg
                className="w-8 h-8 text-gold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div className="z-10">
              <span className="text-xs font-medium tracking-wide text-accent-light uppercase">Startups & Entrepreneurs</span>
              <h4 className="font-bold text-xl mt-1 text-white">นักธุรกิจรุ่นใหม่ / สตาร์ทอัพ</h4>
            </div>
            <div className="absolute right-4 bottom-4 w-20 h-20 bg-white/5 rounded-full pointer-events-none filter blur-xl" />
          </div>
        );

      case "client-corporate":
        return (
          <div className={`relative w-full h-64 bg-gradient-to-br from-[#1C7A74] via-[#0E4F4C] to-dark flex flex-col justify-end p-6 text-white rounded-2xl overflow-hidden group shadow-lg ${className}`}>
            <div className="absolute inset-0 bg-black/15 group-hover:bg-black/10 transition-colors duration-300" />
            <div className="absolute top-6 left-6 p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <svg
                className="w-8 h-8 text-gold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div className="z-10">
              <span className="text-xs font-medium tracking-wide text-accent-light uppercase">Corporates & SMEs</span>
              <h4 className="font-bold text-xl mt-1 text-white">องค์กรธุรกิจ / บริษัทขนาดกลาง-ใหญ่</h4>
            </div>
            <div className="absolute right-4 bottom-4 w-20 h-20 bg-white/5 rounded-full pointer-events-none filter blur-xl" />
          </div>
        );

      case "client-individual":
        return (
          <div className={`relative w-full h-64 bg-gradient-to-br from-[#208F87] via-[#0E5450] to-dark flex flex-col justify-end p-6 text-white rounded-2xl overflow-hidden group shadow-lg ${className}`}>
            <div className="absolute inset-0 bg-black/15 group-hover:bg-black/10 transition-colors duration-300" />
            <div className="absolute top-6 left-6 p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <svg
                className="w-8 h-8 text-gold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div className="z-10">
              <span className="text-xs font-medium tracking-wide text-accent-light uppercase">Individual Consultation</span>
              <h4 className="font-bold text-xl mt-1 text-white">บุคคลทั่วไป / ผู้ต้องการที่ปรึกษาคู่คิด</h4>
            </div>
            <div className="absolute right-4 bottom-4 w-20 h-20 bg-white/5 rounded-full pointer-events-none filter blur-xl" />
          </div>
        );

      default:
        return (
          <div className={`w-full h-full bg-gradient-to-br from-primary to-dark text-white rounded-xl flex items-center justify-center p-6 ${className}`}>
            <div className="text-center">
              <svg
                className="w-8 h-8 mx-auto mb-2 text-accent-light opacity-80"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm font-medium">{alt}</span>
            </div>
          </div>
        );
    }
  };

  if (hasError) {
    return renderFallback();
  }

  return (
    <div className={`relative overflow-hidden ${aspectRatioClassName}`}>
      <img
        src={currentSrc}
        alt={alt}
        onError={handleImageError}
        className={`w-full h-full object-cover transition-transform duration-500 ${className}`}
        referrerPolicy="no-referrer"
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent pointer-events-none" />
      )}
    </div>
  );
};
