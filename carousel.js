export class ProjectCarousel {
    constructor() {
        this.track = document.querySelector('.projects-track');
        this.cards = Array.from(this.track?.getElementsByClassName('project-card') || []);
        // ... rest of carousel code ...
    }
    // ... existing carousel methods ...

    handleTouchMove(e) {
        const touch = e.touches[0];
        const currentTime = Date.now();
        const deltaY = touch.clientY - this.state.touch.lastY;
        const deltaTime = currentTime - this.state.touch.lastTime;

        // Update velocity
        if (deltaTime > 0) {
            this.state.touch.velocity = deltaY / deltaTime;
        }

        // Update touch tracking
        this.state.touch.lastY = touch.clientY;
        this.state.touch.lastTime = currentTime;

        // Calculate offset with boundary resistance
        this.state.touch.offset = touch.clientY - this.state.touch.startY;

        // Apply resistance at boundaries
        if (this.state.currentIndex <= 0 && this.state.touch.offset > 0) {
            this.state.touch.offset = Math.sqrt(this.state.touch.offset) * 5;
        } else if (this.state.currentIndex >= this.cards.length - 1 && this.state.touch.offset < 0) {
            this.state.touch.offset = -Math.sqrt(-this.state.touch.offset) * 5;
        }

        // Only prevent default if the swipe is significant enough to navigate
        if (Math.abs(this.state.touch.offset) > TOUCH_CONFIG.threshold) {
            e.preventDefault();
        }

        this.updateCards(this.state.touch.offset);
    }
} 