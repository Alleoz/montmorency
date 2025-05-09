
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Memorial = () => {
  const [loaded, setLoaded] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const navigate = useNavigate();

  // Simulating a message from Victor - replace with the actual message
  const messageFromVictor = "The journey isn't about the destination, but the memories we create along the way. Remember the laughter, the tears, and the moments in between.";
  
  // Reference to audio element
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Check if user came from password page
    const fromPassword = sessionStorage.getItem("from_password");
    if (!fromPassword) {
      navigate("/");
      return;
    }

    // Set loaded after a short delay to trigger animations
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [navigate]);

  // Function to handle audio loading
  const handleAudioLoaded = () => {
    setAudioLoaded(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.4; // Set volume to 40%
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      <audio 
        ref={audioRef}
        src="/soft-piano.mp3" 
        loop
        onCanPlayThrough={handleAudioLoaded}
        className="hidden"
      />
      
      <div className="w-full max-w-3xl mx-auto px-4 py-16 text-center relative">
        {loaded && (
          <div className="staggered-fade-in space-y-12">
            {/* Image */}
            <div className="mb-16 mx-auto max-w-md">
              <img 
                src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb" 
                alt="Starry night sky" 
                className="w-full h-auto rounded opacity-90"
              />
            </div>
            
            {/* Quote */}
            <div className="mb-16">
              <blockquote className="font-serif text-xl md:text-2xl italic leading-relaxed tracking-wide">
                {messageFromVictor}
              </blockquote>
              <cite className="block mt-4 text-gray-400 font-sans">— Victor</cite>
            </div>
            
            {/* Final message */}
            <p className="font-serif text-lg md:text-xl">
              "Some things are meant to be found."
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Memorial;
