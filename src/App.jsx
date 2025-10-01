import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const canvasRef = useRef(null);

  // Fixed profile picture asset (put profile.jpg inside "public" folder)
  const profilePic = "/profile.jpg";

  const formRef = useRef();

  // Connect-the-dots canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const dots = Array.from({ length: 50 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Move dots
      dots.forEach((d) => {
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
            ctx.strokeStyle = `rgba(0,255,255,${1 - dist / 100})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw dots
      dots.forEach((d) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_28ux4dv",
        "template_qka9vgi",
        formRef.current,
        "8-HWPzBhXz90OwIci"
      )
      .then(
        () => {
          alert("Message sent!");
          setShowModal(false);
        },
        (error) => {
          alert("Failed to send message, please try again.");
          console.error(error.text);
        }
      );
  };

  return (
    <div className="relative min-h-screen bg-cyan-900 flex justify-center items-start py-5">
      {/* Glowing Black Glass Container */}
      <div className="relative w-full max-w-6xl p-8 space-y-10 bg-black/50 backdrop-blur-lg rounded-3xl border border-cyan-400/30 shadow-inner-glow overflow-hidden">
        {/* Connect-the-dots canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Navbar */}
        <nav className="relative flex justify-between items-center p-4 z-10">
          <h1 className="text-2xl font-bold text-cyan-300 drop-shadow-lg">
            My Portfolio
          </h1>
          <ul className="flex gap-6 text-gray-200 font-semibold">
            <li>
              <a href="#about" className="hover:text-cyan-400 transition">
                About
              </a>
            </li>
            <li>
              <a href="#projects" className="hover:text-cyan-400 transition">
                Projects
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-cyan-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Hero Section */}
        <section className="relative flex flex-col items-center text-center space-y-4 z-10">
          <img
            src={profilePic}
            alt="Profile"
            className="w-40 h-40 object-cover rounded-full border-4 border-cyan-400 shadow-xl transform transition duration-500 hover:scale-110"
          />
          <h2 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg text-cyan-300">
            Hello, I'm Aaron Ace 👋
          </h2>
          <p className="max-w-2xl text-gray-200 drop-shadow-md">
            A passionate developer building modern web apps with Node.js, React,
            Tailwind CSS, PHP, and MySQL.
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
        <section
          id="about"
          className="relative text-center p-8 bg-black/30 border border-cyan-400 rounded-2xl shadow-inner-glow z-10"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-cyan-300">
            About Me
          </h3>
          <p className="text-gray-200">
            I’m a web developer with 5 years of experience in data entry,
            procurement support, and web development (Node.js, React, Tailwind
            CSS, PHP, MySQL, HTML, CSS), while providing efficient virtual
            assistance and administrative support. Currently focused on creating
            responsive web apps using modern stacks.
          </p>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="relative p-8 bg-black/30 border border-cyan-400 rounded-2xl shadow-inner-glow z-10"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-cyan-300 text-center">
            Projects
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-black/20 border border-cyan-400 backdrop-blur-md rounded-xl shadow-inner-glow transition transform hover:scale-105">
              <h4 className="font-semibold text-xl mb-2 text-cyan-300">
                QuickShop
              </h4>
              <p className="text-gray-200">
                An e-commerce app with sorting, pagination, and admin dashboard
                features. Using PHP / HTML and MySQL.
              </p>
              <a
                href="http://quickshop.infinityfree.me"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block px-4 py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-500 font-semibold text-sm transition"
              >
                🔗 Preview
              </a>
            </div>

            <div className="p-6 bg-black/20 border border-cyan-400 backdrop-blur-md rounded-xl shadow-inner-glow transition transform hover:scale-105">
              <h4 className="font-semibold text-xl mb-2 text-cyan-300">
                Friendster Clone
              </h4>
              <p className="text-gray-200">
                A social app prototype with profiles, posts, and photo uploads
                using PHP / HTML and MySQL.
              </p>
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
              <h4 className="font-semibold text-xl mb-2 text-cyan-300">
                Portfolio Website
              </h4>
              <p className="text-gray-200">
                The site you’re viewing right now, built with React + Tailwind +
                Vite!
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="relative text-center p-8 bg-black/30 border border-cyan-400 rounded-2xl shadow-inner-glow z-10"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-cyan-300">
            Get in Touch
          </h3>
          <p className="text-gray-200 mb-4">
            Let’s collaborate on exciting projects 🚀
          </p>
          <button
            className="px-6 py-3 bg-cyan-400 text-black rounded-lg shadow hover:bg-cyan-500 transition"
            onClick={() => setShowModal(true)}
          >
            Contact Me
          </button>
        </section>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
            <div className="bg-black/80 backdrop-blur-md rounded-2xl p-6 w-80 text-white shadow-lg relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                onClick={() => setShowModal(false)}
              >
                ✖
              </button>
              <h3 className="text-xl font-bold mb-4">Send a Message</h3>
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col gap-3"
              >
                <input
                  type="text"
                  name="user_name"
                  placeholder="Your Name"
                  className="p-2 rounded bg-gray-900 text-white border border-cyan-400"
                  required
                />
                <input
                  type="email"
                  name="user_email"
                  placeholder="Your Email"
                  className="p-2 rounded bg-gray-900 text-white border border-cyan-400"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  className="p-2 rounded bg-gray-900 text-white border border-cyan-400"
                  required
                />
                <button
                  type="submit"
                  className="mt-2 px-4 py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-500 transition"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="relative py-4 text-center bg-black/40 border-t border-cyan-400 text-gray-300 rounded-b-2xl shadow-inner-glow z-10">
          © {new Date().getFullYear()} Aaron Ace. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
