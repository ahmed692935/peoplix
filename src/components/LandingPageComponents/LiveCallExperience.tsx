import { useState, useEffect, useMemo } from "react";
import { GoDotFill } from "react-icons/go";
import ActiveCallModal from "./ActiveCallModal";
import toast from "react-hot-toast";
import { RetellWebClient } from "retell-client-js-sdk";

const LiveCallExperience = () => {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCallConnected, setIsCallConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Initialize Retell SDK
  const sdk = useMemo(() => new RetellWebClient(), []);

  useEffect(() => {
    // Handle call events
    sdk.on("call_started", () => {
      console.log("Call started");
      setIsCallConnected(true);
      setIsLoading(false);
    });

    sdk.on("call_ended", () => {
      console.log("Call ended");
      setIsCallModalOpen(false);
      setIsCallConnected(false);
      setIsMuted(false); // Reset mute state
    });

    sdk.on("error", (error) => {
      console.error("Retell SDK Error:", error);
      toast.error("An error occurred during the call.");
      setIsCallModalOpen(false);
      setIsLoading(false);
    });

    return () => {
      // Cleanup
      sdk.off("call_started");
      sdk.off("call_ended");
      sdk.off("error");
    };
  }, [sdk]);

  const handleStartCall = async () => {
    if (isLoading) return;

    setIsLoading(true);
    
    try {
      const wsUrl = import.meta.env.VITE_WS_URL;
      
      if (!wsUrl) {
          throw new Error("VITE_WS_URL is not defined in the environment.");
      }

      console.log("Connecting to WebSocket:", wsUrl);
      const socket = new WebSocket(wsUrl);

      // Timeout for WS connection
      const connectionTimeout = setTimeout(() => {
        if (socket.readyState !== WebSocket.OPEN) {
            socket.close();
            toast.error("Connecting timed out. Please try again.");
            setIsLoading(false);
        }
      }, 10000);

      socket.onopen = () => {
        console.log("WebSocket connection established");
        clearTimeout(connectionTimeout);
        // If the backend needs a trigger message, uncomment the following line:
        // socket.send(JSON.stringify({ type: "start_call" }));
      };

      socket.onmessage = async (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Received data from WebSocket:", data);

          if (data && (data.access_token || data.accessToken)) {
            const token = data.access_token || data.accessToken;
            
            setIsCallModalOpen(true);
            await sdk.startCall({
              accessToken: token,
            });
            
            // Close the WS after successfully getting the token
            socket.close();
          } else {
            console.error("No access token in WebSocket message:", data);
            toast.error("Failed to receive call credentials.");
            setIsLoading(false);
            socket.close();
          }
        } catch (err) {
          console.error("Error parsing WebSocket message:", err);
          toast.error("Invalid response from server.");
          setIsLoading(false);
          socket.close();
        }
      };

      socket.onerror = (error) => {
        console.error("WebSocket Error:", error);
        toast.error("Failed to connect to the server.");
        setIsLoading(false);
        clearTimeout(connectionTimeout);
      };

      socket.onclose = (event) => {
        console.log("WebSocket connection closed:", event.code, event.reason);
        // Don't setIsLoading(false) here if the call is starting, 
        // as call_started handler will handle it.
      };

    } catch (error) {
      console.error("Error initiating WebSocket call:", error);
      toast.error(error instanceof Error ? error.message : "Failed to start call. Please try again.");
      setIsLoading(false);
    }
  };

  const handleEndCall = () => {
    sdk.stopCall();
  };

  const handleToggleMute = () => {
    // Retell SDK uses LiveKit under the hood
    const currentMute = !isMuted;
    try {
      const internalSdk = sdk as any;
      if (internalSdk.room && internalSdk.room.localParticipant) {
        internalSdk.room.localParticipant.setMicrophoneEnabled(!currentMute);
        setIsMuted(currentMute);
      } else {
        console.warn("SDK room not initialized yet.");
      }
    } catch (err) {
      console.error("Error toggling mute:", err);
    }
  };

  return (
    <section id="demo-call" className="relative w-full py-24 overflow-hidden bg-background">
      {/* Background Glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(55,114,255,0.05) 0%, transparent 70%)"
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-divider bg-dark-gray/50 backdrop-blur-md mb-8">
            <GoDotFill className="text-primary animate-pulse" />
            <span className="text-sm font-semibold text-white tracking-wide">Live Experience</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            Experience the Power of <span className="text-primary">Autonomous AI</span> in Action
          </h2>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-text-gray mb-12 max-w-2xl mx-auto leading-relaxed">
            Dont just take our word for it. Experience a live interaction with our AI agent
            right now and witness how it handles complex operations in real-time.
          </p>

          {/* Call Logic UI */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              {/* Outer Glow for Button */}
              <div className="absolute -inset-1 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all duration-500 opacity-0 group-hover:opacity-100" />

              <button
                onClick={handleStartCall}
                disabled={isLoading}
                className={`relative px-10 py-5 bg-primary text-white font-black text-lg rounded-full 
                  shadow-[0_0_30px_rgba(55,114,255,0.4)] hover:shadow-[0_0_45px_rgba(55,114,255,0.6)]
                  transform hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer
                  disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-3`}
              >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-1.23-1.12-1.43-2.31-1.43-3.54 0-.54-.45-.99-.99-.99H4.19c-.54 0-1 .45-1 .99 0 9.39 7.61 17 17 17 .54 0 .99-.45.99-.99v-3.59c0-.54-.45-.99-.99-.99z" />
                  </svg>
                  {isLoading ? "Starting Demo..." : "Start Live Demo Call"}
              </button>
            </div>

            <p className="mt-6 text-sm text-text-gray/60 font-medium">
              * This will start a real-time voice call with our AI agent.
            </p>
          </div>
        </div>
      </div>

      {/* Active Call Modal */}
      <ActiveCallModal
        isOpen={isCallModalOpen}
        isConnected={isCallConnected}
        onClose={handleEndCall}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />
    </section>
  );
};

export default LiveCallExperience;
