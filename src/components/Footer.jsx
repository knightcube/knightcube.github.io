export default function Footer() {
  return (
    <footer className="w-full py-8 mt-auto border-t border-outline-variant/10 bg-surface">
      <div className="flex flex-col items-center justify-center gap-6 px-margin-desktop text-center">
        <span className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight">Rajat Kumar Gupta</span>

        <div className="flex items-center justify-center flex-wrap gap-6 font-label-md">
          <a href="https://github.com/@knightcube" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary-container transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com/in/knightcube" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary-container transition-colors">
            LinkedIn
          </a>
          <a href="https://youtube.com/@knightcube" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary-container transition-colors">
            YouTube
          </a>
          <a href="https://medium.com/@knightcube" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary-container transition-colors">
            Medium
          </a>
        </div>

        <p className="font-label-sm text-label-sm text-on-surface-variant opacity-60">© 2026 Rajat Kumar Gupta. All rights reserved.</p>
      </div>
    </footer>
  );
}