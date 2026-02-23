import React from 'react';

const AboutPage = ({ onBackToHome }) => {

    return (
        <div className="relative w-screen min-h-screen overflow-y-auto text-white bg-gray-900">
            {/* Animated Background */}
            <div
                className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-top opacity-100 z-10"
                style={{
                    backgroundImage: `url('https://placehold.co/1920x1080/2d2d2d/ffffff?text=About')`,
                    backgroundSize: '150%',
                    backgroundPosition: 'center 65%'
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-20 w-full min-h-screen p-8 md:p-16 flex flex-col">
                <header className="flex justify-between items-center animate-fade-in-up mb-12">
                    <a href="#root" className="text-2xl font-bold transition-colors hover:text-yellow-400">AI Learning Roadmap</a>
                    <button onClick={onBackToHome} className="bg-yellow-400 text-black font-bold py-2 px-6 rounded-full hover:bg-yellow-300 transition-colors">
                        Back to Home
                    </button>
                </header>

                <main className="flex-grow flex flex-col items-center">
                    <div className="w-full max-w-4xl">
                        <div className="bg-white/5 p-8 rounded-lg border border-white/10 space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-yellow-400 mb-4">Our Mission</h2>
                                <p className="text-lg text-gray-300 leading-relaxed">
                                    Our mission is to democratize education and make career-focused learning accessible to everyone, everywhere. We believe that anyone with the motivation to learn should have a clear, structured, and personalized path to achieve their professional goals. The AI-Powered Personalized Learning Roadmap Generator was born from this vision, designed to be an intelligent, adaptive, and engaging guide on your journey to mastering new skills.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-yellow-400 mb-4">What We Do</h2>
                                <p className="text-lg text-gray-300 leading-relaxed">
                                    The internet is a vast ocean of learning resources, but navigating it can be overwhelming. Our platform acts as your personal navigator, bridging the gap between scattered online tutorials and expensive, one-on-one mentorship. We achieve this through a combination of automation, personalization, and AI-driven insights to create a seamless learning experience.
                                </p>
                            </div>

                             <div>
                                <h2 className="text-3xl font-bold text-yellow-400 mb-4">Why Choose Us?</h2>
                                <ul className="list-disc list-inside text-lg text-gray-300 space-y-3">
                                    <li><span className="font-semibold">Clarity in Chaos:</span> We turn the chaos of self-learning into a step-by-step, manageable process.</li>
                                    <li><span className="font-semibold">Stay Motivated:</span> With progress tracking, milestone notifications, and a clear view of the finish line, staying motivated has never been easier.</li>
                                    <li><span className="font-semibold">Future-Proof Your Career:</span> Our roadmaps are designed to equip you with the in-demand skills needed to thrive in today's competitive job market.</li>
                                    <li><span className="font-semibold">Learn Your Way:</span> With 24/7 access to an AI tutor and a curated list of resources, you have the support you need, whenever you need it.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AboutPage;
