// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-600 text-white p-4 text-center mt-10">
      <p>
        &copy; {currentYear} SubManage. All rights reserved.
      </p>
      <p className="text-sm mt-1">
        Designed for hackathon MVP by Frontend Team
      </p>
    </footer>
  );
};

export default Footer;
