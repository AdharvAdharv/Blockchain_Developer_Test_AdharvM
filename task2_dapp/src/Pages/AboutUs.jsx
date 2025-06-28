import React from "react";

function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-950 text-white py-16 px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-teal-400">About FundFlow</h1>

        <p className="text-gray-300 mb-4 text-lg">
          <strong>FundFlow</strong> is a decentralized crowdfunding platform built on blockchain technology. 
          Our mission is to empower individuals, organizations, and communities to raise funds transparently, 
          securely, and efficiently — without intermediaries.
        </p>

        <p className="text-gray-400 mb-4">
          With FundFlow, every transaction is publicly recorded on the blockchain, ensuring full transparency 
          for both fundraisers and donors. Whether it's for a personal cause, a social project, a community initiative, 
          or a startup idea, FundFlow provides a trusted, open platform for everyone.
        </p>

        <h2 className="text-2xl font-semibold text-teal-300 mt-8 mb-4">Why FundFlow?</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>💸 No hidden fees or intermediaries — funds go directly to the campaigns you support.</li>
          <li>🔒 Built on blockchain for enhanced security and tamper-proof records.</li>
          <li>🌍 Open for anyone, anywhere in the world to raise and contribute funds.</li>
          <li>📝 Transparent donation history and campaign progress tracking.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-teal-300 mt-8 mb-4">Our Vision</h2>
        <p className="text-gray-400">
          To create a borderless, decentralized financial platform where people can come together, support meaningful causes, 
          and turn big ideas into reality — powered by community trust and blockchain technology.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
