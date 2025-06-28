import React from 'react'
import { Link } from 'react-router-dom';

function Footer() {
  const productList = [ "Create Campaign", "Donate","View Campaigns"];
  const contactList = [
    "support@fundflow.com",
    "info@fundflow.com",
    "Contact Us",
  ];
  const usefullLink = [
    { name: "Home", link: "/" },
    { name: "White Paper", link: "/whitepaper" },
    { name: "About Us", link: "/aboutus" },
  ];

  return (
    <footer className="text-center text-white lg:text-left" style={{ backgroundColor: "#1a1a1a" }}>
      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          
          <div>
            <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
              FundFlow
            </h6>
            <p>
              FundFlow is a decentralized crowdfunding platform connecting dreamers with supporters. Start a campaign, raise funds, and make a difference — securely on the blockchain.
            </p>
          </div>

          <div>
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
            What You Can Do
            </h6>
            {productList.map((el, i) => (
              <p className="mb-4" key={i}>
                <a href="#!" className="hover:text-teal-400">{el}</a>
              </p>
            ))}
          </div>

          <div>
  <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
    Useful Links
  </h6>
  
  <ul className="flex flex-col space-y-4 space-x-6">
    {usefullLink.map((item, i) => (
      <li key={i}>
        <Link
          to={item.link}
          aria-label={item.name}
          title={item.name}
          className="hover:text-teal-400"
        >
          {item.name}
        </Link>
      </li>
    ))}
  </ul>
</div>


          <div>
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Contact
            </h6>
            {contactList.map((el, i) => (
              <p className="mb-4" key={i}>
                <a href="#!" className="hover:text-teal-400">{el}</a>
              </p>
            ))}
          </div>

        </div>
      </div>

      <div className="backgroundMain p-6 text-center">
        <span>© 2025 Copyright — </span>
        <a className="font-semibold hover:text-teal-400" href="https://yourprojectlink.com/">
          FundFlow
        </a>
      </div>
    </footer>
  )
}

export default Footer
