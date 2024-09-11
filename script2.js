document.addEventListener("DOMContentLoaded", function () {
  const finalNextBtn = document.getElementById("final-next-btn");
  const countdownDuration = 10; // Countdown time in seconds

  // Function to speak text using Web Speech API
  function speak(text) {
    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.onend = resolve; // Resolve the promise when speaking ends
      window.speechSynthesis.speak(utterance);
    });
  }

  async function startCountdown() {
    // Announce the countdown start
    await speak(
      `Countdown starts now. ${countdownDuration} seconds remaining.`
    );

    for (let i = countdownDuration; i > 0; i--) {
      await speak(i.toString()); // Announce each second remaining
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
    }

    // Announce the end of the countdown
    await speak("The countdown has finished. The answer is eight.");

    // Show finish button
    finalNextBtn.style.display = "block";
  }

  // Automatically start the countdown when the page loads
  startCountdown();

  // Add click event to the finish button
  finalNextBtn.addEventListener("click", function () {
    window.location.href = "index.html"; // Replace 'nextpage.html' with the path to your next page
  });
});
