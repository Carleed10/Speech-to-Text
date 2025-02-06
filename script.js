
let recognition;
let isListening = false;

// Check if browser supports SpeechRecognition
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;  // Keep listening continuously
    recognition.interimResults = false; // Only return final results
    recognition.lang = 'en-US'; // Set language
} else {
    alert("Your browser does not support Speech Recognition.");
}

function startListening() {
    if (!isListening) {
        recognition.start();
        isListening = true;
        document.getElementById("transcript").innerText = "Listening...";
    }
}

function stopListening() {
    if (isListening) {
        recognition.stop();
        isListening = false;
        document.getElementById("transcript").innerText = "Stopped listening.";
    }
}

// When speech is recognized
recognition.onresult = function(event) {
    let speechText = event.results[event.results.length - 1][0].transcript;
    document.getElementById("transcript").innerText = "You said: " + speechText;

    // Repeat what was said after 3 seconds
    setTimeout(() => {
        repeatSpeech(speechText);
    }, 3000);
};

// Function to repeat the speech
function repeatSpeech(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
}

// Handle errors
recognition.onerror = function(event) {
    console.error("Speech recognition error:", event.error);
    document.getElementById("transcript").innerText = "Error occurred: " + event.error;
};
