import { useState } from "react";
import { getCategoryStyle } from "../utils/categoryStyles";

// Renders the product's real photo from the sheet's `image` field. Falls
// back to a category-tinted icon card if no image is set or it fails to
// load, so a broken/missing URL never shows a blank box.
export default function ProductThumbnail({ item, className = "", iconClassName = "", nameClassName = "" }) {
  const { icon: Icon, bg, text, ring } = getCategoryStyle(item?.category);
  const [failed, setFailed] = useState(false);

  if (item?.image && !failed) {
    return (
      <img
        src={item.image}
        alt={item?.name || "Product"}
        className={`object-cover ${className}`}
        onError={() => setFailed(true)}
      />
    );
  }

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
