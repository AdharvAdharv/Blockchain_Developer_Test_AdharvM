import React from "react";

function Hero({ title }) {
  return (
    <div className="text-center text-white py-16">
      <h1 className="text-5xl font-bold mb-4">{title}</h1>
      <p className="text-lg">Decentralized Crowdfunding Made Easy</p>
    </div>
  );
}

export default Hero;
