import React from 'react'
const t = new Date();
const H = t.getHours();
const M = t.getMinutes();
const currentYear = new Date().getFullYear();


const Footer = () => {
  return (
    <>
      <>
        <footer className="fixed-bottom flex justify-center items-center h-[10vh] bg-[#5b21b6] font-mono">
          Copyright © {currentYear} {H}:{M}
        </footer>
      </>
    </>
  );
}

export default Footer