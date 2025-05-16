import React, { useState } from 'react';

const App = () => {
  const [commands, setCommands] = useState(true);
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [isListening, setIsListening] = useState(false);

  const speak = (message, callback) => {
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
    utterance.onend = () => {
      if (callback) callback();
    };
  };

  const handleCommands = (command) => {
    if (command.includes("open whatsapp")) {
      const message = "Opening WhatsApp";
      speak(message);
      setResponse(message);
      window.open("https://www.whatsapp.com", "_blank");
    } else if (command.includes("open facebook")) {
      const message = "Opening Facebook";
      speak(message);
      setResponse(message);
      window.open("https://www.facebook.com", "_blank");
    } else if (command.includes("open instagram")) {
      const message = "Opening Instagram";
      speak(message);
      setResponse(message);
      window.open("https://www.instagram.com", "_blank");
    } else if (command.includes("open youtube")) {
      const message = "Opening YouTube";
      speak(message);
      setResponse(message);
      window.open("https://www.youtube.com", "_blank");
    } else {
      const message = `Searching Google for ${command}`;
      speak(message);
      setResponse(message);
      window.open(`https://www.google.com/search?q=${encodeURIComponent(command)}`, "_blank");
    }
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const message = "Speech Recognition isn't supported in this browser.";
      setResponse(message);
      alert(message);
      return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript.toLowerCase();
      setText(speechText);
      handleCommands(speechText);
      setTimeout(() => {
        setIsListening(false);
      }, 2000);
    };

    setIsListening(true);
    recognition.start();
  };

  const handleClick = () => {
    speak("Listening... Please give me a command", () => {
      startListening();
    });
  };

  return (
    <div className='w-screen h-screen bgimg flex flex-col gap-6 items-center justify-center'>
      <h1 className='text-6xl font-extrabold text-black'>Voice Assistant using ReactJS</h1>

      <p className='text-md font-semibold text-black'>
        {commands ? "Please give me a command" : "Processing your commands"}
      </p>

      <button onClick={handleClick} className='px-6 py-2 bg-black rounded-lg text-white'>
        {isListening ? "Listening..." : "Start Listening"}
      </button>

      <div className='bg-white p-5 shadow-lg h-auto rounded-xl space-y-5'>
        <h2 className='text-xl'>
          <span className='text-green-600'>Recognition Speech</span>: <br /> {text}
        </h2>
        <h4 className='text-lg'>
          <span className='text-orange-700'>Response</span>: <br /> {response}
        </h4>
      </div>
    </div>
  );
};

export default App;
