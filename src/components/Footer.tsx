'use client';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-500 py-6 text-center mt-20">
      <p className="text-sm">
        © {new Date().getFullYear()} Stock Predictor. - {' '}
        <a
          href="https://www.linkedin.com/in/gabriel-caixeta-romero"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300 hover:text-blue-500 transition duration-300"
        >
          Gabriel Caixeta Romero
        </a>
      </p>
    </footer>
  );
}