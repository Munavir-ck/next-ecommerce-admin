import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ProductForm({}) {
  return (
    <form>
      <label>Product name</label>
      <input type="text" placeholder="product name" />
      <label>Category</label>
      <select>
        <option value="">Uncategorized</option>
      </select>

      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-1">
        <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Add image</div>
          <input type="file" className="hidden" />
        </label>
      </div>
      <label>Description</label>
      <textarea placeholder="description" />
      <label>Price (in USD)</label>
      <input type="number" placeholder="price" />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
