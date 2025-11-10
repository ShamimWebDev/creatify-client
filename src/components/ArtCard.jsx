import React from "react";
import Button from "../ui/Button";

const ArtCard = () => {
  const artworks = [
    {
      title: "Abstract Dreams",
      artist: "Sarah Martinez",
      tag: "Digital Art",
      likes: 124,
      img: "https://i.ibb.co/YXL9DdZ/abstract.jpg",
    },
    {
      title: "Portrait in Blue",
      artist: "Michael Chen",
      tag: "Oil Painting",
      likes: 89,
      img: "https://i.ibb.co/fvMTcLK/portrait.jpg",
    },
    {
      title: "Metal Harmony",
      artist: "Emma Wilson",
      tag: "Sculpture",
      likes: 156,
      img: "https://i.ibb.co/bPmVNJ3/sculpture.jpg",
    },
    {
      title: "Mountain Serenity",
      artist: "David Park",
      tag: "Watercolor",
      likes: 203,
      img: "https://i.ibb.co/BH8rvDq/mountain.jpg",
    },
    {
      title: "Urban Expression",
      artist: "Alex Rivera",
      tag: "Street Art",
      likes: 178,
      img: "https://i.ibb.co/0Bhk1Bn/graffiti.jpg",
    },
    {
      title: "Shadows & Light",
      artist: "Lisa Thompson",
      tag: "Photography",
      likes: 145,
      img: "https://i.ibb.co/d4Mz8rB/blackwhite.jpg",
    },
  ];
  return (
    <section className="py-16 bg-gray-50">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Featured Artworks</h2>
        <p className="text-gray-500">
          Discover the latest masterpieces from our talented artists
        </p>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 px-10 md:px-24">
        {artworks.map((art, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={art.img}
              alt={art.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-5">
              <h3 className="font-semibold text-lg">{art.title}</h3>
              <p className="text-gray-500 text-sm mb-2">by {art.artist}</p>
              <span className="text-xs px-3 py-1 bg-purple-100 text-purple-600 rounded-full">
                {art.tag}
              </span>
              <div className="flex justify-between items-center mt-4">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-lg">
                  View Details
                </Button>
                <span className="text-gray-400 text-sm">❤️ {art.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArtCard;
