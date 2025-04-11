import React from "react";
import { categories, colors } from "../lib/constants";
import { cn } from "../lib/utils";

const Sidebar = ({ category: selectedCategory, setCategory }) => {
  return (
    <div className="w-64 p-4 space-y-2 sticky top-0 h-screen bg-white/90 backdrop-blur-lg border-r border-gray-100">
      {/* All Categories */}
      <div
        className={cn(
          "group flex items-center space-x-3 p-3 rounded-xl cursor-pointer",
          "transition-all duration-300 hover:bg-gray-50 hover:pl-4",
          !selectedCategory
            ? "border-l-4 border-indigo-500 bg-indigo-50"
            : "hover:border-l-2 hover:border-gray-200",
        )}
        onClick={() => setCategory("")}
      >
        <span className="text-gray-700 group-hover:text-indigo-600 font-medium">
          🌟 All Events
        </span>
      </div>

      {/* Category List */}
      {categories.map((category, index) => {
        const color = colors[index];
        const isSelected = selectedCategory === category;

        return (
          <div
            key={category}
            className={cn(
              "group flex items-center space-x-3 p-3 rounded-xl cursor-pointer",
              "transition-all duration-300 hover:pl-4 relative",
              isSelected
                ? `border-l-4 border-[${color}] bg-[${color}20]`
                : "hover:border-l-2 hover:border-gray-200",
            )}
            onClick={() => setCategory(category)}
          >
            {/* Category Dot */}
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: color }}
            />

            {/* Category Name */}
            <span
              className={cn(
                "text-gray-700 font-medium transition-colors",
                isSelected ? "text-[${color}]" : "group-hover:text-gray-900",
              )}
              style={{ color: isSelected ? color : undefined }}
            >
              {category}
            </span>

            {/* Hover Effect */}
            {!isSelected && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
