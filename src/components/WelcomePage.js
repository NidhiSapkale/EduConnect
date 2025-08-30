import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen } from 'lucide-react';


const WelcomePage = () => {
  // --- SIMULATED LOGIN STATE ---
  // Change this to 'false' to see the guest view
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simplified scroll tracking based on the window scroll
  const { scrollYProgress } = useScroll();

  // Create different parallax effects based on scroll progress
  const yBg1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const yBg3 = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);


  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <div className="text-gray-100 font-josefin">
      {/* --- FIXED BACKGROUND & PARALLAX LAYER --- */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#4c3a7a] via-[#5c4a8d] to-[#3a2a60]"></div>
          {/* Background Parallax Shapes with increased opacity */}
          <motion.div
            className="absolute top-0 left-[5%] w-72 h-72 bg-purple-400 rounded-full filter blur-3xl opacity-50"
            style={{ y: yBg1 }}
          />
          <motion.div
            className="absolute top-[30%] right-[10%] w-96 h-96 bg-indigo-400 rounded-full filter blur-3xl opacity-50"
            style={{ y: yBg2 }}
          />
          <motion.div
            className="absolute bottom-0 left-[20%] w-80 h-80 bg-fuchsia-400 rounded-full filter blur-3xl opacity-50"
            style={{ y: yBg3 }}
          />
      </div>
      
      {/* --- SCROLLABLE CONTENT --- */}
      <div className="relative z-10 overflow-x-clip">
        {/* Header */}
        <motion.header 
          className="absolute top-0 left-0 w-full p-6 flex justify-between items-center"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-3">
            <BookOpen className="w-10 h-10 text-white" />
            <span className="text-2xl font-bold text-white">Edu Connect</span>
          </div>
          <div>
            {isLoggedIn && (
              <button className="text-gray-200 hover:text-white font-semibold py-2 px-4 rounded-md transition-colors">
                Logout
              </button>
            )}
          </div>
        </motion.header>

        {/* Hero Section */}
        <main className="min-h-screen flex flex-col justify-center items-center text-center px-6">
          <motion.div
            className="max-w-4xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              variants={itemVariants} 
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-white"
            >
              A New Way to Learn, Together.
            </motion.h1>
            <motion.p 
              variants={itemVariants} 
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10"
            >
              For Students, By Students.
            </motion.p>
            <motion.p 
              variants={itemVariants} 
              className="max-w-2xl mx-auto text-lg text-gray-300 mb-12"
            >
              Edu Connect is your all-in-one platform for collaborative learning. Create study groups, join communities, and connect with peers in real-time.
            </motion.p>
            <motion.div 
              variants={itemVariants} 
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {isLoggedIn ? (
                 <button className="bg-white text-[#3a2a60] font-semibold py-3 px-8 rounded-lg shadow-2xl hover:bg-gray-200 transition-all transform hover:scale-105">
                  Open App
                </button>
              ) : (
                <>
                  <button className="bg-white text-[#3a2a60] font-semibold py-3 px-8 rounded-lg shadow-2xl hover:bg-gray-200 transition-all transform hover:scale-105">
                    Sign Up
                  </button>
                  <button className="bg-white/20 border-2 border-white/30 text-white font-semibold py-3 px-8 rounded-lg shadow-lg backdrop-blur-sm hover:bg-white/30 transition-all transform hover:scale-105">
                    Login
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        </main>

        {/* --- REVISED CHAT BUBBLE FEATURE SECTION --- */}
        <section className="py-24">
          <div className="container mx-auto px-6 flex flex-col gap-16">
            
            {/* Feature 1: Communities (Received) */}
            <motion.div 
              className="w-full flex justify-start"
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={cardVariants}
            >
              <div className="w-full md:w-5/6 lg:w-3/4 p-8 bg-white/10 rounded-3xl rounded-bl-lg backdrop-blur-md border border-white/20 shadow-xl">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-full md:w-1/2 h-64 bg-white/5 rounded-2xl flex items-center justify-center">
                    <span className="text-gray-400 text-lg">Image Placeholder</span>
                  </div>
                  <div className="w-full md:w-1/2 text-center md:text-left">
                    <h2 className="text-3xl font-bold mb-3 text-white">Create & Join Communities</h2>
                    <p className="text-gray-300 leading-relaxed">
                      Build a dedicated space for your class, club, or study group. With robust topic organization and flexible permissions, you can create the perfect environment for learning.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature 2: Study Rooms (Sent) */}
            <motion.div 
              className="w-full flex justify-end"
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={cardVariants}
            >
              <div className="w-full md:w-5/6 lg:w-3/4 p-8 bg-purple-500/10 rounded-3xl rounded-br-lg backdrop-blur-md border border-white/20 shadow-xl">
                 <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                  <div className="w-full md:w-1/2 h-64 bg-white/5 rounded-2xl flex items-center justify-center">
                    <span className="text-gray-400 text-lg">Image Placeholder</span>
                  </div>
                  <div className="w-full md:w-1/2 text-center md:text-right">
                    <h2 className="text-3xl font-bold mb-3 text-white">Voice & Text Study Rooms</h2>
                    <p className="text-gray-300 leading-relaxed">
                      Hop into a voice channel for a live study session or use the persistent text chat to share notes and ask questions. It’s like having a virtual library available 24/7.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature 3: Personalized Feed (Received) */}
            <motion.div 
              className="w-full flex justify-start"
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={cardVariants}
            >
               <div className="w-full md:w-5/6 lg:w-3/4 p-8 bg-white/10 rounded-3xl rounded-bl-lg backdrop-blur-md border border-white/20 shadow-xl">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-full md:w-1/2 h-64 bg-white/5 rounded-2xl flex items-center justify-center">
                    <span className="text-gray-400 text-lg">Image Placeholder</span>
                  </div>
                  <div className="w-full md:w-1/2 text-center md:text-left">
                    <h2 className="text-3xl font-bold mb-3 text-white">A Feed That Understands You</h2>
                    <p className="text-gray-300 leading-relaxed">
                      Follow topics and communities that matter to you. Our smart feed brings you the most relevant posts and discussions, so you spend less time searching and more time learning.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- Testimonials Section --- */}
        <section className="py-24">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-white text-center mb-16">From Students, For Students</h2>
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.div variants={cardVariants} className="p-8 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 shadow-lg">
                        <p className="text-gray-300 mb-4 italic">"The study rooms were a lifesaver for my calculus finals. Being able to hop on a voice call to solve problems together was a game-changer."</p>
                        <p className="font-bold text-white">- Jessica P.</p>
                        <p className="text-sm text-gray-400">Computer Science</p>
                    </motion.div>
                    <motion.div variants={cardVariants} className="p-8 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 shadow-lg">
                        <p className="text-gray-300 mb-4 italic">"I finally found a community for my niche history class. Sharing resources and notes has never been easier. Highly recommend!"</p>
                        <p className="font-bold text-white">- David L.</p>
                        <p className="text-sm text-gray-400">History Major</p>
                    </motion.div>
                    <motion.div variants={cardVariants} className="p-8 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 shadow-lg">
                        <p className="text-gray-300 mb-4 italic">"Edu Connect's feed is amazing. It cuts through the noise and shows me exactly the posts I need to see for my courses."</p>
                        <p className="font-bold text-white">- Maria K.</p>
                        <p className="text-sm text-gray-400">Mechanical Engineering</p>
                    </motion.div>
                </motion.div>
            </div>
        </section>


        {/* Footer */}
        <footer className="text-gray-400 py-12">
          <div className="container mx-auto px-6 text-center">
              <p>&copy; 2025 Edu Connect. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default WelcomePage;

