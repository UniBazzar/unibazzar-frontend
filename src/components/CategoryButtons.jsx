function CategoryButtons({ categories, selectedCategory, onCategoryChange }) {
    return (
      <div className="w-full flex justify-center mt-10">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-2 rounded-full transition 
                ${
                  selectedCategory === cat
                    ? "bg-gray-200 text-gray-900 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    );
  }
  export default CategoryButtons;
  