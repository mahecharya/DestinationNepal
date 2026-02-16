import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white ">
      <div className="max-w-6xl mx-auto px-4  grid grid-cols-1 p-4 md:grid-cols-3 gap-8">
        
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-3">About Us</h3>
          <p className="text-gray-400 text-sm">
            Welcome to our blog! We share the latest updates, travel guides, and insights about Nepal. Join us on this journey to explore nature, culture, and adventure.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/" className="hover:text-green-500">Home</a></li>
            <li><a href="/viewblogs" className="hover:text-green-500">Blogs</a></li>
            <li><a href="/about" className="hover:text-green-500">About</a></li>
            <li><a href="/contact" className="hover:text-green-500">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold mb-3">Contact</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Email: info@nepalblog.com</li>
            <li>Phone: +977 9801234567</li>
            <li>Address: Kathmandu, Nepal</li>
          </ul>
          {/* <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-green-500">Facebook</a>
            <a href="#" className="hover:text-green-500">Instagram</a>
            <a href="#" className="hover:text-green-500">Twitter</a>
          </div> */}
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 mt-6  text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Nepal Blog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
