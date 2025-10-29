export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="font-medium text-gray-900">Your Fintech Co.</div>
        <div className="text-gray-600">© {new Date().getFullYear()} All rights reserved.</div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-gray-900">Privacy</a>
          <a href="#" className="hover:text-gray-900">Terms</a>
          <a href="#" className="hover:text-gray-900">Support</a>
        </div>
      </div>
    </footer>
  );
}
