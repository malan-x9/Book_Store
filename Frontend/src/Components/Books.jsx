import React, { useState, useEffect } from "react";

// ── Sample data — replace with your real DB data ──────────────────────────────


const GENRES = ["All", "Romance", "Mystery", "Fantasy", "Thrillers", "Biography", "Self-Help"];

// ── Star Rating ────────────────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-gray-400 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

// ── Book Card ──────────────────────────────────────────────────────────────────
function BookCard({ book }) {
  const [wishlist, setWishlist] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={book.imageUrl}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Genre badge */}
        <span className="absolute top-3 left-3 bg-green-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
          {book.genre}
        </span>
        {/* Wishlist */}
        <button
          onClick={() => setWishlist(!wishlist)}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110"
        >
          <svg
            className={`w-4 h-4 transition-colors ${wishlist ? "text-red-500 fill-red-500" : "text-gray-400"}`}
            fill={wishlist ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
          </svg>
        </button>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-black text-gray-900 text-sm leading-tight line-clamp-1">{book.title}</h3>
        <p className="text-gray-400 text-xs mt-0.5 mb-2">{book.author}</p>
        <Stars rating={book.rating} />

        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="font-black text-gray-900 text-base">${book.price.toFixed(2)}</span>
          <button className="bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-full transition-all hover:shadow-md hover:shadow-green-200 active:scale-95">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Books Section ─────────────────────────────────────────────────────────
export default function Books() {
  const [activeGenre, setActiveGenre] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/getBooks`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.books); // matches your controller's { books } response
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load books");
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-gray-400 text-lg">Loading books...</p>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-red-400 text-lg">{error}</p>
    </div>
  );



  const filtered = books
    .filter((b) => activeGenre === "All" || b.genre === activeGenre)
    .filter((b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <section
      className="min-h-screen w-full py-20 px-6 md:px-12"
      style={{ background: "linear-gradient(160deg, #f0fdf4 0%, #fefce8 40%, #f0fdf4 100%)" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Section Header ── */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs font-medium text-gray-600 shadow-sm mb-5">
            <span>📚</span> Browse Our Collection
          </div>
          <h2
            className="font-black text-gray-900 leading-tight tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            EXPLORE ALL{" "}
            <span className="text-green-500">BOOKS</span>
          </h2>
          <p className="text-gray-500 mt-3 text-sm md:text-base max-w-lg mx-auto">
            Discover a collection of books that inspire, educate, and entertain readers of all ages.
          </p>
        </div>

        {/* ── Controls ── */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          {/* Search */}
          <div className="relative w-full md:w-72">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-gray-200 rounded-full px-4 py-2.5 text-sm text-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>

          {/* Result count */}
          <span className="text-sm text-gray-400 md:ml-auto">
            <span className="font-bold text-gray-700">{filtered.length}</span> books found
          </span>
        </div>

        {/* ── Genre Filter Tabs ── */}
        <div className="flex items-center gap-2 flex-wrap mb-10">
          {GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                activeGenre === genre
                  ? "bg-green-500 text-white border-green-500 shadow-md shadow-green-200"
                  : "bg-white text-gray-600 border-gray-200 hover:border-green-400 hover:text-green-500"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* ── Grid ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {filtered.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <span className="text-5xl mb-4">📭</span>
            <p className="font-semibold text-lg">No books found</p>
            <p className="text-sm mt-1">Try a different search or genre filter</p>
          </div>
        )}

        {/* ── Load More ── */}
        {filtered.length > 0 && (
          <div className="flex justify-center mt-12">
            <button className="bg-white border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-bold px-8 py-3 rounded-full text-sm transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-green-200">
              Load More Books
            </button>
          </div>
        )}
      </div>
    </section>
  );
}