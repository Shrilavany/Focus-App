document.addEventListener("DOMContentLoaded", function () {
  const enterButton = document.getElementById("enter-btn");

  // Add click event to the 'Get started' button
  enterButton.addEventListener("click", function () {
    // Navigate to the next page
    window.location.href = "index2.html"; // Replace 'nextpage.html' with the path to your next page
  });
});
