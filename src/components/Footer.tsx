/**
 * Footer Component.
 * 
 * A reusable footer element for the application. Displays copyright information
 * and links to social media profiles (Twitter, GitHub, LinkedIn).
 * 
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer = (): JSX.Element => {
    return (
        <footer className="bg-gray-800 text-gray-400 py-4 mt-8">
            <div className="container mx-auto text-center px-4">
                {/* Copyright Information */}
                <p>&copy; {new Date().getFullYear()} Blue Wave Horizon. All rights reserved.</p>

                {/* Social Media Links */}
                <div className="mt-2 space-x-4">
                    <a
                        href="https://x.com/CtrlAlt_Byte"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white"
                    >
                        Twitter
                    </a>
                    <a
                        href="https://github.com/TheKingsident/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://www.linkedin.com/in/thekingsident/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white"
                    >
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
