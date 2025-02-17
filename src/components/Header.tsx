import { FaGithub } from 'react-icons/fa';
/**
 * Header Component.
 * 
 * A reusable header element for the application. Displays the title, description,
 * and a link to the GitHub repository for the project.
 * 
 * @returns {JSX.Element} The rendered Header component.
 */
const Header = (): JSX.Element => {
    return (
        <header className="bg-gray-800 text-white pb-1 shadow-lg">
            <div className="bg-gray-900 py-24 sm:py-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center">
                        {/* Application Title */}
                        <p className="mt-2 text-7xl font-semibold tracking-tight text-white sm:text-6xl">
                            Chattrix
                        </p>

                        {/* Application Description */}
                        <p className="mt-4 text-xl sm:text-2xl text-gray-400">
                            A YouTube Comment Search application
                        </p>

                        {/* GitHub Repository Link */}
                        <a
                            href="https://github.com/TheKingsident/chattrix"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-8 text-gray-400 hover:text-gray-300"
                        >
                            <FaGithub size={40} />
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
