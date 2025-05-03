import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
          {/* Column 1: Company Info */}
          <div className="col-span-1 md:col-span-3 lg:col-span-1">
            <h3 className="text-white font-bold text-lg mb-4">Hotstar</h3>
            <p className="text-sm mb-4">
              Watch your favorite movies, TV shows, and live sports on Hotstar
            </p>
            <nav
              className="flex items-center space-x-4 mt-6"
              aria-label="Social media links"
            >
              <a
                href="https://www.facebook.com"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Visit our Facebook page"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="https://www.twitter.com"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Visit our Twitter page"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a
                href="https://www.instagram.com"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Visit our Instagram page"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="https://www.youtube.com"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Visit our YouTube channel"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </nav>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Company
            </h3>
            <nav aria-label="Company links">
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-blue-400 hover:underline transition-colors inline-block"
                    aria-label="About Us page"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="hover:text-blue-400 hover:underline transition-colors inline-block"
                    aria-label="Careers page"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/press"
                    className="hover:text-blue-400 hover:underline transition-colors inline-block"
                    aria-label="Press page"
                  >
                    Press
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-blue-400 hover:underline transition-colors inline-block"
                    aria-label="Contact page"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/investors"
                    className="hover:text-blue-400 hover:underline transition-colors inline-block"
                    aria-label="Investor Relations page"
                  >
                    Investor Relations
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Column 3: Help & Support */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Help & Support
            </h3>
            <nav aria-label="Help and support links">
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/account"
                    className="hover:text-blue-400 hover:underline transition-colors inline-block"
                    aria-label="Account page"
                  >
                    Account
                  </Link>
                </li>
                <li>
                  <Link
                    to="/devices"
                    className="hover:text-blue-400 hover:underline transition-colors inline-block"
                    aria-label="Supported Devices page"
                  >
                    Supported Devices
                  </Link>
                </li>
                <li>
                  <Link
                    to="/accessibility"
                    className="hover:text-blue-400 hover:underline transition-colors inline-block"
                    aria-label="Accessibility page"
                  >
                    Accessibility
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faqs"
                    className="hover:text-blue-400 hover:underline transition-colors inline-block"
                    aria-label="FAQs page"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/support"
                    className="hover:text-blue-400 hover:underline transition-colors inline-block"
                    aria-label="Contact Support page"
                  >
                    Contact Support
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Legal
            </h3>
            <nav aria-label="Legal links">
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/terms"
                    className="hover:text-blue-400 hover:underline transition-colors inline-block"
                    aria-label="Terms of Service page"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-blue-400 hover:underline transition-colors inline-block"
                    aria-label="Privacy Policy page"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/content-policy"
                    className="hover:text-blue-400 hover:underline transition-colors inline-block"
                    aria-label="Content Policy page"
                  >
                    Content Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/subscription-terms"
                    className="hover:text-blue-400 hover:underline transition-colors inline-block"
                    aria-label="Subscription Terms page"
                  >
                    Subscription Terms
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cookies"
                    className="hover:text-blue-400 hover:underline transition-colors inline-block"
                    aria-label="Cookie Preferences page"
                  >
                    Cookie Preferences
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Column 5: App Download (visible only on larger screens) */}
          <div className="hidden lg:block">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Get The App
            </h3>
            <div className="space-y-3">
              <a
                href="https://play.google.com"
                className="flex items-center bg-gray-800 hover:bg-gray-700 text-white rounded-md px-4 py-2 transition-colors w-full"
                aria-label="Download from Google Play"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                >
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.6 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                </svg>
                <span>Google Play</span>
              </a>
              <a
                href="https://apps.apple.com"
                className="flex items-center bg-gray-800 hover:bg-gray-700 text-white rounded-md px-4 py-2 transition-colors w-full"
                aria-label="Download from App Store"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22 17.607c-.786 2.28-3.139 6.317-5.563 6.361-1.608.031-2.125-.953-3.963-.953-1.837 0-2.412.923-3.932.983-2.572.099-6.542-5.827-6.542-10.995 0-4.747 3.308-7.1 6.198-7.143 1.55-.028 3.014 1.045 3.959 1.045.949 0 2.727-1.29 4.596-1.101.782.033 2.979.315 4.389 2.377-3.741 2.442-3.158 7.549.858 9.426zm-5.222-17.607c-2.826.114-5.132 3.079-4.81 5.531 2.612.203 5.118-2.725 4.81-5.531z" />
                </svg>
                <span>App Store</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright section */}
        <div className="border-t border-gray-800 pt-6">
          <p className="text-sm text-center">
            &copy; {new Date().getFullYear()} Hotstar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
