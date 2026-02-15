import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* Header */}
      <div className="bg-green-600 text-white py-12 text-center">
        <h1 className="text-4xl font-bold mb-2">About Us</h1>
        <p className="text-lg">Discover the story behind our blog</p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700">
            Our mission is to share the beauty, culture, and adventure of Nepal with the world. Through engaging stories, travel guides, and informative articles, we aim to inspire travelers and adventurers to explore Nepal’s stunning landscapes and rich heritage.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-700">
            Founded in 2024, our blog started as a small passion project by a group of Nepali travel enthusiasts. Over time, it has grown into a platform where we showcase breathtaking destinations, hidden gems, and tips to make every journey memorable. From the peaks of the Himalayas to serene valleys and bustling cities, we strive to bring every corner of Nepal to your screen.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
          <p className="text-gray-700">
            We combine authentic local experiences with detailed travel information to help our readers plan trips efficiently. Every article is written with care, featuring photography, cultural insights, and practical tips. Our team is passionate about promoting responsible tourism and supporting local communities across Nepal.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
