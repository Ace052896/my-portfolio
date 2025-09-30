import { useState, useEffect, useRef } from "react";

export default function App() {
  const [profilePic, setProfilePic] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const savedPic = localStorage.getItem("profilePic");
    if (savedPic) setProfilePic(savedPic);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem("profilePic", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Connect-the-dots canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const dots = Array.from({ length: 50 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Move dots
      dots.forEach(d => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > width) d.vx *= -1;
        if (d.y < 0 || d.y > height) d.vy *= -1;
      });

      // Draw lines
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.strokeStyle = `rgba(0,255,255,${1 - dist/100})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw dots
      dots.forEach(d => {
        ctx.fillStyle = "cyan";
        ctx.beginPath();
        ctx.arc(d.x, d.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative min-h-screen bg-cyan-900 flex justify-center items-start py-100">
      {/* Glowing Black Glass Container */}
      <div className="relative w-full max-w-6xl p-8 space-y-10 bg-black/50 backdrop-blur-lg rounded-3xl border border-cyan-400/30 shadow-inner-glow overflow-hidden">

        {/* Connect-the-dots canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Navbar */}
        <nav className="relative flex justify-between items-center p-4 z-10">
          <h1 className="text-2xl font-bold text-cyan-300 drop-shadow-lg">My Portfolio</h1>
          <ul className="flex gap-6 text-gray-200 font-semibold">
            <li><a href="#about" className="hover:text-cyan-400 transition">About</a></li>
            <li><a href="#projects" className="hover:text-cyan-400 transition">Projects</a></li>
            <li><a href="#contact" className="hover:text-cyan-400 transition">Contact</a></li>
          </ul>
        </nav>

        {/* Hero Section */}
        <section className="relative flex flex-col items-center text-center space-y-4 z-10">
          <div className="relative group">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="w-40 h-40 object-cover rounded-full border-4 border-cyan-400 shadow-xl transform transition duration-500 group-hover:scale-110 cursor-pointer"
                onClick={() => document.querySelector("#fileInput").click()}
              />
            ) : (
              <div
                className="w-40 h-40 flex items-center justify-center rounded-full bg-gray-800 text-cyan-400 font-semibold shadow-xl cursor-pointer"
                onClick={() => document.querySelector("#fileInput").click()}
              >
                Upload
              </div>
            )}
           
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg text-cyan-300">
            Hello, I'm Aaron Ace 👋
          </h2>
          <p className="max-w-2xl text-gray-200 drop-shadow-md">
            A passionate developer building modern web apps with Node.js, React, Tailwind CSS, PHP, and MySQL.
          </p>

          <a
            href="/resume.pdf"
            download
            className="mt-2 px-6 py-3 bg-cyan-400/20 border border-cyan-400 text-cyan-300 font-semibold rounded-lg shadow hover:bg-cyan-400/30 transition"
          >
            📄 Download Resume
          </a>
        </section>

        {/* About Section */}
        <section id="about" className="relative text-center p-8 bg-black/30 border border-cyan-400 rounded-2xl shadow-inner-glow z-10">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-cyan-300">About Me</h3>
          <p className="text-gray-200">
            I’m a web developer with 5 years of experience in data entry, procurement support, and web development (PHP, MySQL, HTML, CSS), while providing efficient virtual assistance and administrative support. Currently focused on creating responsive web apps using modern stacks.
          </p>
        </section>

        {/* Projects Section */}
        <section id="projects" className="relative p-8 bg-black/30 border border-cyan-400 rounded-2xl shadow-inner-glow z-10">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-cyan-300 text-center">Projects</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-black/20 border border-cyan-400 backdrop-blur-md rounded-xl shadow-inner-glow transition transform hover:scale-105">
              <h4 className="font-semibold text-xl mb-2 text-cyan-300">QuickShop</h4>
              <p className="text-gray-200">An e-commerce app with sorting, pagination, and admin dashboard features. Using PHP / HTML and MySQL.</p>
              <a
                href="http://localhost/quickshop/index1.php"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block px-4 py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-500 font-semibold text-sm transition"
              >
                🔗 Preview
              </a>
            </div>

            <div className="p-6 bg-black/20 border border-cyan-400 backdrop-blur-md rounded-xl shadow-inner-glow transition transform hover:scale-105">
              <h4 className="font-semibold text-xl mb-2 text-cyan-300">Friendster Clone</h4>
              <p className="text-gray-200">A social app prototype with profiles, posts, and photo uploads using PHP / HTML and MySQL.</p>
              <a
                href="http://localhost/animated-login-register/index.php"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block px-4 py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-500 font-semibold text-sm transition"
              >
                🔗 Preview
              </a>
            </div>

            <div className="p-6 bg-black/20 border border-cyan-400 backdrop-blur-md rounded-xl shadow-inner-glow transition transform hover:scale-105">
              <h4 className="font-semibold text-xl mb-2 text-cyan-300">Portfolio Website</h4>
              <p className="text-gray-200">The site you’re viewing right now, built with React + Tailwind + Vite!</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative text-center p-8 bg-black/30 border border-cyan-400 rounded-2xl shadow-inner-glow z-10">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-cyan-300">Get in Touch</h3>
          <p className="text-gray-200 mb-4">Let’s collaborate on exciting projects 🚀</p>
          <a
            href="mailto:youremail@example.com"
            className="px-6 py-3 bg-cyan-400 text-black rounded-lg shadow hover:bg-cyan-500 transition"
          >
            Contact Me
          </a>
        </section>

        {/* Footer */}
        <footer className="relative py-4 text-center bg-black/40 border-t border-cyan-400 text-gray-300 rounded-b-2xl shadow-inner-glow z-10">
          © {new Date().getFullYear()} Aaron Ace. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
