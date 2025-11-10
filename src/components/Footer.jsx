import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-black/95 backdrop-blur-lg text-gray-300 py-14 px-10 md:px-24 border-t border-gray-800">
      <div className="grid md:grid-cols-4 gap-10 mb-12">
        {/* Brand Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
            🎨 Creatify
          </h3>
          <p className="text-sm opacity-80 leading-relaxed">
            A creative platform where artists showcase their work, connect with
            fellow creators, and inspire the world through art.
          </p>
          <div className="flex gap-5 mt-4 text-xl text-gray-400">
            <i className="ri-facebook-circle-line hover:text-purple-400 transition-all cursor-pointer"></i>
            <i className="ri-twitter-line hover:text-purple-400 transition-all cursor-pointer"></i>
            <i className="ri-instagram-line hover:text-purple-400 transition-all cursor-pointer"></i>
            <i className="ri-linkedin-box-line hover:text-purple-400 transition-all cursor-pointer"></i>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-purple-400 cursor-pointer transition-all">
              Explore Artworks
            </li>
            <li className="hover:text-purple-400 cursor-pointer transition-all">
              Featured Artists
            </li>
            <li className="hover:text-purple-400 cursor-pointer transition-all">
              Categories
            </li>
            <li className="hover:text-purple-400 cursor-pointer transition-all">
              Community
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-purple-400 cursor-pointer transition-all">
              Help Center
            </li>
            <li className="hover:text-purple-400 cursor-pointer transition-all">
              Contact Us
            </li>
            <li className="hover:text-purple-400 cursor-pointer transition-all">
              Privacy Policy
            </li>
            <li className="hover:text-purple-400 cursor-pointer transition-all">
              Terms of Service
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <p className="text-sm opacity-80">Email: hello@creatify.com</p>
          <p className="text-sm opacity-80 mt-2">
            © 2024 Creatify. All rights reserved.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
        Built with <span className="text-purple-400">❤️</span> by the Creatify Team
      </div>
    </footer>
  );
};

export default Footer;
