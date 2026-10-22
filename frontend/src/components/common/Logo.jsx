import { useInstitute } from "../../context/InstituteContext";
import { resolveImageUrl } from "../../utils/imageUrl";

/**
 * Institute emblem. Uses the logo uploaded in Admin → Institute Info when available,
 * otherwise falls back to the built-in graduation-cap emblem (same as the favicon).
 */
export default function Logo({ size = 44, useUploaded = true }) {
  const { info } = useInstitute();
  const uploaded = useUploaded && info.logoUrl ? resolveImageUrl(info.logoUrl) : null;

  if (uploaded) {
    return (
      <img
        src={uploaded}
        alt={`${info.instituteName} logo`}
        width={size}
        height={size}
        style={{ width: size, height: size, objectFit: "contain", borderRadius: 10, flexShrink: 0 }}
      />
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label={`${info.instituteName} logo`} style={{ flexShrink: 0 }}>
      <rect width="64" height="64" rx="14" fill="#1e3a5f" />
      <path d="M32 13 5 25.5 32 38 59 25.5Z" fill="#f59e0b" />
      <path d="M15.5 30.8v10.4c0 5.3 7.4 9.3 16.5 9.3s16.5-4 16.5-9.3V30.8L32 38.5Z" fill="#ffffff" />
      <path d="M54.5 27.6v13.6" stroke="#f59e0b" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="54.5" cy="43.4" r="2.9" fill="#f59e0b" />
    </svg>
  );
}
