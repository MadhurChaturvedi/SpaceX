import './Contact.css'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="spacex-footer" role="contentinfo">
      <div className="footer-container">
        {/* Top Footer Row */}
        <div className="footer-top-row">
          <div className="footer-brand">
            <span className="footer-logo">SPACEX</span>
            <p className="footer-motto">MAKING HUMANITY A MULTIPLANETARY SPECIES</p>
          </div>

          <button
            type="button"
            className="back-to-top-btn"
            onClick={scrollToTop}
            aria-label="Back to top of page"
          >
            TOP &uarr;
          </button>
        </div>

        {/* Social Links Row */}
        <div className="footer-social-row">
          <a
            href="https://twitter.com/spacex"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            TWITTER / X
          </a>
          <a
            href="https://youtube.com/spacex"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            YOUTUBE
          </a>
          <a
            href="https://instagram.com/spacex"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            INSTAGRAM
          </a>
          <a
            href="https://flickr.com/photos/spacex"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            FLICKR
          </a>
          <a
            href="https://linkedin.com/company/spacex"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            LINKEDIN
          </a>
        </div>

        {/* Legal & Policy Links */}
        <div className="footer-bottom-row">
          <p className="copyright-text">SPACEX &copy; 2026. ALL RIGHTS RESERVED.</p>
          <div className="legal-links">
            <a href="#privacy" className="legal-link">PRIVACY POLICY</a>
            <span className="link-divider">&bull;</span>
            <a href="#terms" className="legal-link">TERMS OF USE</a>
            <span className="link-divider">&bull;</span>
            <a href="#careers" className="legal-link">CAREERS</a>
            <span className="link-divider">&bull;</span>
            <a href="#suppliers" className="legal-link">SUPPLIERS</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
