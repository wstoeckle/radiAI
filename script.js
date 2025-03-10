// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const modal = document.getElementById('modal');
    const resultModal = document.getElementById('result-modal');
    const startButton = document.getElementById('start-session');
    const confirmButton = document.getElementById('confirm-human');
    const closeButton = document.querySelector('.close-button');
    const closeResult = document.querySelector('.close-result');
    const contactButton = document.getElementById('contact-btn');
    
    // Create grid lines for the retro tech look
    createGridLines();
    
    // Setup system time
    updateSystemTime();
    setInterval(updateSystemTime, 1000);

    // Function to open the human verification modal
    startButton.addEventListener('click', function() {
        modal.style.display = 'block';
        // Add subtle animation
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.opacity = '0';
        modalContent.style.transform = 'translateY(-20px)';
        
        // Play retro computer beep sound effect
        playBeepSound(440, 0.1);
        
        setTimeout(() => {
            modalContent.style.transition = 'all 0.3s ease';
            modalContent.style.opacity = '1';
            modalContent.style.transform = 'translateY(0)';
        }, 10);
    });

    // Function to handle human confirmation
    confirmButton.addEventListener('click', function() {
        // Hide the first modal
        modal.style.display = 'none';
        
        // Play alert sound
        playBeepSound(880, 0.3);
        
        // Show the result modal with a slight delay for dramatic effect
        setTimeout(() => {
            resultModal.style.display = 'block';
            
            // Add subtle animation
            const resultContent = resultModal.querySelector('.modal-content');
            resultContent.style.opacity = '0';
            resultContent.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                resultContent.style.transition = 'all 0.3s ease';
                resultContent.style.opacity = '1';
                resultContent.style.transform = 'translateY(0)';
            }, 10);
            
            // Add typing effect to the response
            const response = document.getElementById('ai-response');
            const text = response.textContent;
            response.textContent = '';
            let i = 0;
            const typeWriter = setInterval(() => {
                if (i < text.length) {
                    response.textContent += text.charAt(i);
                    if (i % 3 === 0) {
                        playBeepSound(220 + Math.random() * 440, 0.01);
                    }
                    i++;
                } else {
                    clearInterval(typeWriter);
                }
            }, 50);
        }, 500);
    });

    // Close buttons functionality
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        playBeepSound(330, 0.1);
    });

    closeResult.addEventListener('click', function() {
        resultModal.style.display = 'none';
        playBeepSound(330, 0.1);
    });

    // Contact button functionality (just opens the verification modal for demo purposes)
    contactButton.addEventListener('click', function() {
        modal.style.display = 'block';
        playBeepSound(440, 0.1);
    });

    // Close modal if clicked outside of modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            playBeepSound(330, 0.1);
        }
        if (event.target === resultModal) {
            resultModal.style.display = 'none';
            playBeepSound(330, 0.1);
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            playBeepSound(550, 0.05);
            
            window.scrollTo({
                top: targetSection.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });

    // Add scroll effect for header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 0 10px var(--primary-color)';
            header.style.background = 'rgba(0, 0, 0, 0.9)';
        } else {
            header.style.boxShadow = '0 0 5px var(--primary-color)';
            header.style.background = 'rgba(0, 0, 0, 0.8)';
        }
    });
    
    // Add hover effect to feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            playBeepSound(660, 0.05);
        });
    });
});

// Function to create grid lines for the retro tech look
function createGridLines() {
    const gridOverlay = document.querySelector('.grid-overlay');
    
    // Create horizontal lines
    for (let i = 1; i < 20; i++) {
        const hLine = document.createElement('div');
        hLine.classList.add('h-line');
        hLine.style.top = `${i * 5}%`;
        gridOverlay.appendChild(hLine);
    }
    
    // Create vertical lines
    for (let i = 1; i < 20; i++) {
        const vLine = document.createElement('div');
        vLine.classList.add('v-line');
        vLine.style.left = `${i * 5}%`;
        gridOverlay.appendChild(vLine);
    }
}

// Function to update system time
function updateSystemTime() {
    const timeDisplay = document.querySelector('.system-time');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    timeDisplay.textContent = `T-SYSTEM: ${hours}:${minutes}:${seconds}`;
}

// Function to play beep sound
function playBeepSound(frequency, duration) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        oscillator.connect(gainNode);
        
        gainNode.connect(audioContext.destination);
        gainNode.gain.value = 0.1;
        
        oscillator.start();
        
        setTimeout(() => {
            oscillator.stop();
            audioContext.close();
        }, duration * 1000);
    } catch (error) {
        console.log('Audio context not supported or user interaction required');
    }
}