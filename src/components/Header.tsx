import Link from 'next/link';

const Header = () => {
    return (
        <header className="bg-gray-800 text-white py-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center px-4">
                <h1 className="text-2xl font-semibold">Chattrix</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/" className="hover:text-gray-400">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="hover:text-gray-400">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:text-gray-400">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
