import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
const CARDS = [
  {
    label: "Romance",
    desc: "Everyone enjoys a good love story",
    img: "https://images.unsplash.com/photo-1711185901036-f7fd98e50bb1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rotate: "-rotate-3",
    offset: "-translate-y-2",
  },
  {
    label: "Mystery",
    desc: "Mystery is often seen as a subset of the crime genre",
    img: "https://images.unsplash.com/photo-1655420968703-2b0a8f20d538?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rotate: "rotate-2",
    offset: "translate-y-2",
  },
  {
    label: "Fantasy",
    desc: "Fantasy may be the most popular modern book genre",
    img: "https://images.unsplash.com/photo-1614544048536-0d28caf77f41?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rotate: "-rotate-1",
    offset: "-translate-y-4",
  },
  {
    label: "Thrillers",
    desc: "Thrillers are your typical page-turners. ",
    img: "https://images.unsplash.com/photo-1750859613776-c8209c98c86b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rotate: "rotate-3",
    offset: "translate-y-1",
  },
  {
    label: "Biography",
    desc: "There are millions of real-life stories out there ",
    img: "https://images.unsplash.com/photo-1655310722170-97dd42bdc734?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rotate: "-rotate-2",
    offset: "-translate-y-3"
  },
];

const LOGOS = [
  { name: "Logoipsum", style: "font-bold tracking-widest text-xs" },
  { name: "LUM", style: "font-black text-sm tracking-wider" },
  { name: "◎", style: "text-2xl" },
  { name: "∞∞", style: "font-bold text-lg tracking-widest" },
  { name: "Logoipsum", style: "font-semibold text-xs tracking-widest" },
  { name: "LOC", style: "font-black text-sm tracking-widest" },
];

export default function Hero() {
  const navigate = useNavigate();
  const stripRef = useRef(null);

  useEffect(() => {
    // Subtle parallax on scroll
    const onScroll = () => {
      if (stripRef.current) {
        const y = window.scrollY;
        stripRef.current.style.transform = `translateX(${-y * 0.15}px)`;
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative flex flex-col items-center overflow-hidden">
      {/* Background gradient blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-radial from-green-100 via-yellow-50 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none" />

      {/* Badge */}
      <div className="relative mt-6 flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs font-medium text-gray-600 shadow-sm">
        <span className="text-base">🏆</span>
        Best Web for Book Readers
      </div>

      {/* Headline */}
      <h1 className="relative mt-6 text-center font-black text-gray-900 leading-[1.05] tracking-tight px-4"
        style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}>
        WHERE EVERY{" "}
        <span className="text-green-500">PAGE</span>
        <br />
        BEGINS A NEW ADVENTURE
      </h1>

      {/* Subtitle */}
      <p className="relative mt-4 text-gray-500 text-sm md:text-base font-medium text-center">
        Discover a collection of books that inspire, educate, and entertain readers of all ages.
      </p>

      {/* CTA */}
      <div
        onClick={() => navigate("/books")}
        className="relative mt-7 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-full text-sm shadow-lg shadow-green-200 transition-all hover:scale-105 active:scale-95 cursor-pointer"
      >
        Browse Books
      </div>

      {/* ── Polaroid Card Strip ── */}
      <div className="relative w-full mt-14 mb-4">
        {/* String / wire line */}
        <div className="absolute top-[18px] left-0 right-0 h-[2px] bg-gray-300 z-0" />

        {/* Cards row */}
        <div
          ref={stripRef}
          className="relative flex items-end justify-center gap-10 px-6 transition-transform duration-75"
          style={{ minHeight: "220px" }}
        >
          {CARDS.map((card, i) => (
            <PolaroidCard key={i} card={card} index={i} />
          ))}
        </div>
      </div>

      {/* ── Logo Bar ── */}
      <div className="w-full border-t border-gray-200 mt-4 py-5 px-10">
        <div className="flex items-center justify-center gap-10 md:gap-16 flex-wrap">
          {LOGOS.map((logo, i) => (
            <span
              key={i}
              className={`text-gray-400 hover:text-gray-600 transition-colors cursor-default select-none ${logo.style}`}
            >
              {logo.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function PolaroidCard({ card, index }) {
  return (
    <div
      className={`relative flex-shrink-0 group cursor-pointer transition-all duration-300 hover:-translate-y-3 hover:scale-105 hover:z-10 ${card.rotate} ${card.offset}`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Pin */}
      <div className="absolute -top-[22px] left-1/2 -translate-x-1/2 z-10">
        <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-md" />
        <div className="w-[2px] h-3 bg-green-400 mx-auto" />
      </div>

      {/* Polaroid frame */}
      <div className="bg-white rounded-xl shadow-xl p-2.5 pb-8 w-32 md:w-40 border border-gray-100"
        style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.13)" }}>
        {/* Photo */}
        <div className="w-full h-24 md:h-28 rounded-lg overflow-hidden bg-gray-100">
          <img
            src={card.img}
            alt={card.label}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Caption */}
        <div className="mt-2 px-1">
          <p className="font-bold text-gray-800 text-xs">{card.label}</p>
          <p className="text-gray-400 text-[10px] mt-0.5 leading-tight">{card.desc}</p>
        </div>
      </div>
    </div>
  );
}