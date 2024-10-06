import React, { useState, useEffect } from 'react';
import './AIAssistent.css';

/**
 * @typedef {Object} AIAssistantProps
 * @property {string} [name]
 */

/**
 * AI Assistant Component
 * @param {AIAssistantProps} props
 */
export default function AIAssistant({ name = "Shifra" }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = "hi-GB";
    window.speechSynthesis.speak(utterance);
  };

  const wishMe = () => {
    const hours = new Date().getHours();
    if (hours >= 0 && hours < 12) {
      speak(`Good Morning Sir, I'm ${name}, your virtual assistant.`);
    } else if (hours >= 12 && hours < 16) {
      speak(`Good afternoon Sir, I'm ${name}, your virtual assistant.`);
    } else {
      speak(`Good Evening Sir, I'm ${name}, your virtual assistant.`);
    }
  };

  useEffect(() => {
    wishMe();
  }, [name]);

  const startListening = () => {
    setIsListening(true);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.onresult = (event) => {
      const currentTranscript = event.results[event.resultIndex][0].transcript;
      setTranscript(currentTranscript);
      takeCommand(currentTranscript.toLowerCase());
    };
    recognition.start();
  };

  const takeCommand = (message) => {
    setIsListening(false);
    if (message.includes("hello") || message.includes("hey")) {
      speak(`Hello sir, I'm ${name}. What can I help you with?`);
    } else if (message.includes("who are you")) {
      speak(`I am ${name}, a virtual assistant created by Ayush Sir`);
    } else if (message.includes("open youtube")) {
      speak("opening youtube...");
      window.open("https://youtube.com/", "_blank");
    } else if (message.includes("open google")) {
      speak("opening google...");
      window.open("https://google.com/", "_blank");
    } else if (message.includes("open facebook")) {
      speak("opening facebook...");
      window.open("https://facebook.com/", "_blank");
    } else if (message.includes("open instagram")) {
      speak("opening instagram...");
      window.open("https://instagram.com/", "_blank");
    } else if (message.includes("time")) {
      const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
      speak(time);
    } else if (message.includes("date")) {
      const date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
      speak(date);
    } else {
      const finalText = `This is what I found on the internet regarding ${message.replace(name.toLowerCase(), "")}`;
      speak(finalText);
      window.open(`https://www.google.com/search?q=${message.replace(name.toLowerCase(), "")}`, "_blank");
    }
  };

  return (
    <div className="ai-assistant-container">
      <img src="./logo.jpg" alt="logo" className="assistant-logo" />
      <h1 className="assistant-title">
        I'm <span className="assistant-name">{name}</span>, Your <span className="assistant-role">Virtual Assistant</span>
      </h1>
      {isListening && (
        <img src="/voice.gif" alt="voice" className="voice-animation active" />
      )}
      <button
        onClick={startListening}
        className={`talk-button ${isListening ? 'hidden' : ''}`}
      >
        <span>🎤</span>
        <span>Click here to talk to me</span>
      </button>
      {transcript && (
        <p className="transcript">You said: {transcript}</p>
      )}
    </div>
  );
}