let highestZ = 1;

class Paper {
  holdingPaper = false;

  prevMouseX = 0;
  prevMouseY = 0;

  mouseX = 0;
  mouseY = 0;

  velocityX = 0;
  velocityY = 0;

  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {
    paper.addEventListener("touchstart", (e) => {
      e.preventDefault(); // Prevent default touch behavior (e.g., highlight, long-press)

      this.holdingPaper = true;

      // Set the zIndex to bring the paper to the front
      paper.style.zIndex = highestZ;
      highestZ += 1;

      // Store the initial touch position
      this.prevMouseX = e.touches[0].clientX;
      this.prevMouseY = e.touches[0].clientY;
    });

    document.addEventListener("touchmove", (e) => {
      e.preventDefault(); // Prevent scrolling or other default touch behavior

      if (this.holdingPaper) {
        // Get the current touch position
        this.mouseX = e.touches[0].clientX;
        this.mouseY = e.touches[0].clientY;

        // Calculate the velocity (difference between current and previous positions)
        this.velocityX = this.mouseX - this.prevMouseX;
        this.velocityY = this.mouseY - this.prevMouseY;

        // Update the current position of the paper
        this.currentPaperX += this.velocityX;
        this.currentPaperY += this.velocityY;

        // Store the previous position for the next movement
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;

        // Move the paper element
        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;
      }
    });

    document.addEventListener("touchend", (e) => {
      e.preventDefault(); // Prevent default behavior on touch end if necessary
      this.holdingPaper = false; // Stop dragging when touch ends
    });
  }
}

// Get all the paper elements and apply drag functionality
const papers = Array.from(document.querySelectorAll(".paper"));
papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
