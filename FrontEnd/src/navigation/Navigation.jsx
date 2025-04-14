import { useState } from 'react';
import LoginRegister from '../component/LoginRegister';

const Navigation = ({ isOpen }) => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSocialMenu, setShowSocialMenu] = useState(false);
    const [showContactMenu, setShowContactMenu] = useState(false);

    const socialLinks = [
        { name: 'Instagram', url: 'https://instagram.com/yourpage' },
        { name: 'Facebook', url: 'https://facebook.com/yourpage' },
        { name: 'Twitter', url: 'https://twitter.com/yourpage' }
    ];

    const contactInfo = [
        { name: 'Email', info: 'contact@example.com' },
        { name: 'Phone', info: '+1234567890' },
        { name: 'Address', info: 'Your Address Here' }
    ];

    return (
        <>
            <div 
                className={`fixed inset-0 bg-black bg-opacity-90 z-40 transition-transform duration-300 ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <nav className="flex flex-col items-center justify-center h-full">
                    <ul className="text-white text-2xl space-y-8">
                        <li>
                            <button 
                                onClick={() => setShowLoginModal(true)} 
                                className="hover:text-gray-300"
                            >
                                Login
                            </button>
                        </li>
                        <li className="relative">
                            <button 
                                onClick={() => setShowContactMenu(!showContactMenu)}
                                className="hover:text-gray-300"
                            >
                                Contact
                            </button>
                            {showContactMenu && (
                                <div className="absolute left-full ml-4 bg-black bg-opacity-90 p-4 rounded">
                                    {contactInfo.map((item, index) => (
                                        <div key={index} className="text-sm mb-2">
                                            <span className="font-bold">{item.name}:</span> {item.info}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </li>
                        <li className="relative">
                            <button 
                                onClick={() => setShowSocialMenu(!showSocialMenu)}
                                className="hover:text-gray-300"
                            >
                                Social Media
                            </button>
                            {showSocialMenu && (
                                <div className="absolute left-full ml-4 bg-black bg-opacity-90 p-4 rounded">
                                    {socialLinks.map((link, index) => (
                                        <a 
                                            key={index}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block text-sm mb-2 hover:text-gray-300"
                                        >
                                            {link.name}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>

            {showLoginModal && (
                <LoginRegisterModal
                    onClose={() => setShowLoginModal(false)}
                    onLoginSuccess={(user) => {
                        setShowLoginModal(false);
                        // Handle successful login here
                    }}
                />
            )}
        </>
    );
};

export default Navigation;