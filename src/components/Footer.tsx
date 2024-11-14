const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-400 py-4 mt-8">
            <div className="container mx-auto text-center px-4">
                <p>&copy; {new Date().getFullYear()} Chattrix. All rights reserved.</p>
                <div className="mt-2 space-x-4">
                    <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        Twitter
                    </a>
                    <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
