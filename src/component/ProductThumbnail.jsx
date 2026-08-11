import { getCategoryStyle } from "../utils/categoryStyles";

// Guaranteed-accurate stand-in for product photography: a category-tinted
// card with an icon and the product's own name, so it can never mismatch
// what's actually being sold (unlike keyword-matched stock photos).
export default function ProductThumbnail({ item, className = "", iconClassName = "", nameClassName = "" }) {
  const { icon: Icon, bg, text, ring } = getCategoryStyle(item?.category);

  return (
    <div className={`flex flex-col items-center justify-center gap-2 ${bg} ring-1 ring-inset ${ring} ${className}`}>
      <Icon className={`${text} ${iconClassName || "h-1/3 w-1/3"}`} strokeWidth={1.5} aria-hidden="true" />
      <span
        className={`line-clamp-2 px-2 text-center font-semibold text-gray-700 ${nameClassName || "text-xs sm:text-sm"}`}
      >
        {item?.name}
      </span>
    </div>
  );
}
