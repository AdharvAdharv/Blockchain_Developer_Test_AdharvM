import React from "react";

function WhitePaper() {
  return (
    <div className="min-h-screen bg-gray-950 text-white py-16 px-8">
         <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-teal-400">FundFlow White Paper</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
        <p>
          FundFlow is a decentralized crowdfunding platform built on Ethereum blockchain.
          It aims to connect donors with verified campaigns transparently and securely, ensuring that every contribution reaches the intended cause.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Problem Statement</h2>
        <p>
          Traditional crowdfunding platforms often suffer from high transaction fees, lack of transparency,
          and delays in fund allocation. FundFlow leverages smart contracts to eliminate intermediaries, ensuring
          instant, direct, and traceable donations.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Platform Features</h2>
        <ul className="list-disc ml-6">
          <li>Decentralized, immutable smart contracts on Ethereum</li>
          <li>Transparent donation tracking</li>
          <li>Instant fund allocation</li>
          <li>Campaign verification mechanisms</li>
          <li>Secure MetaMask wallet integration</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Roadmap</h2>
        <ul className="list-disc ml-6">
          <li>Q2 2025: Platform beta launch</li>
          <li>Q3 2025: Community campaign onboarding</li>
          <li>Q4 2025: Mobile app development</li>
          <li>2026: Cross-chain donations support</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Conclusion</h2>
        <p>
          FundFlow is committed to revolutionizing digital charity through decentralized, secure, and fair crowdfunding.
          Together, we can empower communities and causes across the globe with transparent and borderless funding.
        </p>
      </section>
    </div>
    </div>
  );
}

export default WhitePaper;
