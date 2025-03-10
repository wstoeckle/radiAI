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

    // Function to open the human verification modal
    startButton.addEventListener('click', function() {
        modal.style.display = 'block';
        // Add subtle animation
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.opacity = '0';
        modalContent.style.transform = 'translateY(-20px)';
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
    });

    closeResult.addEventListener('click', function() {
        resultModal.style.display = 'none';
    });

    // Contact button functionality (just opens the verification modal for demo purposes)
    contactButton.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    // Close modal if clicked outside of modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
        if (event.target === resultModal) {
            resultModal.style.display = 'none';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
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
            header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            header.style.background = 'white';
        }
    });
});
