document.addEventListener("DOMContentLoaded", () => {
  const focusContainer = document.getElementById("focus-container");
  const goalsContainer = document.getElementById("goals-container");
  const goalButtons = document.querySelectorAll(".goal-button");
  const nextButton = document.getElementById("next-btn");
  let goalCount = 0; // Number of goals viewed

  // Function to show a specific video
  function showVideo(videoId) {
    // Hide the goals container
    goalsContainer.style.display = "none";

    // Show the selected video
    const selectedVideoContainer = document.getElementById(
      videoId + "-container"
    );
    if (selectedVideoContainer) {
      selectedVideoContainer.style.display = "block";
      const video = selectedVideoContainer.querySelector("video");

      // Play the video and request fullscreen
      video
        .play()
        .then(() => {
          if (video.requestFullscreen) {
            video.requestFullscreen();
          } else if (video.webkitRequestFullscreen) {
            /* Safari */
            video.webkitRequestFullscreen();
          } else if (video.msRequestFullscreen) {
            /* IE11 */
            video.msRequestFullscreen();
          }
        })
        .catch((error) => {
          console.error("Error playing video or requesting fullscreen:", error);
        });

      // Return to the goals list page once the video ends
      video.addEventListener("ended", () => {
        selectedVideoContainer.style.display = "none";
        goalsContainer.style.display = "flex";

        // Increment the goal count
        goalCount++;

        // Show the 'next' button if all goals are viewed
        if (goalCount === 3) {
          nextButton.style.display = "block";
        }
      });
    } else {
      console.error("Video container not found for ID:", videoId);
    }
  }

  // Function to handle showing goals and speaking them
  function showGoalsAndSpeak() {
    // Hide the focus container
    focusContainer.style.display = "none";

    // Show the goals container
    goalsContainer.style.display = "flex";

    // Define the goals
    const goals = [
      "Make Purpose in Life",
      "Self Responsibility",
      "Have Personal Integrity",
    ];

    // Initialize SpeechSynthesis
    const synth = window.speechSynthesis;

    // Create an utterance with the goals
    const utterance = new SpeechSynthesisUtterance(
      `Three Ultimate Goals to Follow: ${goals.join(", ")}`
    );

    // Speak the utterance
    synth.speak(utterance);
  }

  // Delay execution to show the focus container first
  setTimeout(showGoalsAndSpeak, 3000); // Adjust the delay as needed (3000 milliseconds = 3 seconds)

  // Add event listeners to the goal buttons for video playback
  goalButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const goalId = event.target.id;
      const videoId = goalId.replace("goal-", "video-");
      showVideo(videoId);
    });
  });

  // Add click event to the 'next' button
  nextButton.addEventListener("click", () => {
    window.location.href = "index3.html"; // Replace 'nextpage.html' with the path to your next page
  });

  // Initially hide the 'next' button
  nextButton.style.display = "none";
});
