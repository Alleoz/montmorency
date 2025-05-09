
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const correctPassword = "backside";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple timeout to simulate checking
    setTimeout(() => {
      if (password.toLowerCase().trim() === correctPassword) {
        // Set session storage to indicate user came from password page
        sessionStorage.setItem("from_password", "true");
        toast.success("Password correct");
        navigate("/memorial");
      } else {
        toast.error("Incorrect password");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto text-center animate-fade-in">
        <div className="space-y-8 py-10">
          <p className="font-serif text-xl md:text-2xl italic leading-relaxed tracking-wide">
            You're close. But not yet done.
          </p>
          <p className="font-serif text-xl md:text-2xl italic leading-relaxed tracking-wide">
            The answer lies on the backside.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-8">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border-b border-white/30 rounded-none px-2 py-4 text-center text-lg focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0"
              autoFocus
            />
            
            <Button 
              type="submit"
              disabled={isLoading || !password}
              className="mt-6 bg-transparent hover:bg-white/10 border border-white/30 text-white rounded-md px-8 py-2 transition-all duration-300 font-sans"
            >
              {isLoading ? "Checking..." : "Enter"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;
