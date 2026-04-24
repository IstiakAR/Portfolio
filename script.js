// Theme Switcher Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const body = document.body;
    
    // Check for saved theme preference or default to professional
    const savedTheme = localStorage.getItem('selectedTheme') || 'professional';
    setTheme(savedTheme);
    
    // Add click event listeners to theme buttons
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            setTheme(theme);
            saveTheme(theme);
        });
    });
    
    // Function to set the theme
    function setTheme(theme) {
        // Remove all theme classes
        body.classList.remove('theme-professional', 'theme-cyber', 'theme-anime', 'theme-miscellaneous');
        
        // Add the selected theme class
        body.classList.add(`theme-${theme}`);
        
        // Update active state on buttons
        themeButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-theme') === theme) {
                btn.classList.add('active');
            }
        });
        
        // Update theme-specific elements
        updateThemeElements(theme);
    }
    
    // Function to save theme preference
    function saveTheme(theme) {
        localStorage.setItem('selectedTheme', theme);
    }
    
    // Function to update theme-specific elements
    function updateThemeElements(theme) {
        const glitchText = document.querySelector('.glitch-text');
        const profilePlaceholder = document.querySelector('.profile-placeholder');
        
        if (theme === 'cyber') {
            // Add cyber effects
            if (glitchText) {
                glitchText.style.textShadow = '0 0 10px #00ff88';
            }
        } else if (theme === 'anime') {
            // Add anime character references
            addAnimeCharacters();
        } else if (theme === 'miscellaneous') {
            // Add miscellaneous effects
            addMiscEffects();
        } else {
            // Professional theme - clean and simple
            if (glitchText) {
                glitchText.style.textShadow = 'none';
            }
        }
    }
    
    // Function to add anime character decorations
    function addAnimeCharacters() {
        const heroSection = document.querySelector('.hero-elements');
        if (!heroSection) return;
        
        // Clear existing anime characters
        const existingChars = heroSection.querySelectorAll('.anime-char');
        existingChars.forEach(char => char.remove());
        
        // Add anime character emojis/decorations
        const animeChars = ['🌸', '⚡', '🎭', '🗡️', '👻'];
        
        animeChars.forEach((char, index) => {
            const charElement = document.createElement('div');
            charElement.className = 'anime-char floating-element';
            charElement.textContent = char;
            charElement.style.fontSize = '40px';
            charElement.style.background = 'transparent';
            charElement.style.opacity = '0.6';
            charElement.style.top = `${20 + index * 15}%`;
            charElement.style.left = `${5 + index * 20}%`;
            charElement.style.animationDelay = `${index * 0.5}s`;
            
            heroSection.appendChild(charElement);
        });
    }
    
    // Function to add miscellaneous effects
    function addMiscEffects() {
        const heroSection = document.querySelector('.hero-elements');
        if (!heroSection) return;
        
        // Clear existing misc effects
        const existingMisc = heroSection.querySelectorAll('.misc-effect');
        existingMisc.forEach(effect => effect.remove());
        
        // Add colorful shapes
        const colors = ['#fd79a8', '#ffeaa7', '#55efc4', '#74b9ff', '#a29bfe'];
        
        colors.forEach((color, index) => {
            const effectElement = document.createElement('div');
            effectElement.className = 'misc-effect floating-element';
            effectElement.style.background = color;
            effectElement.style.width = `${60 + index * 10}px`;
            effectElement.style.height = effectElement.style.width;
            effectElement.style.top = `${15 + index * 18}%`;
            effectElement.style.left = `${index % 2 === 0 ? 10 : 70}%`;
            effectElement.style.animationDelay = `${index * 0.8}s`;
            effectElement.style.borderRadius = index % 2 === 0 ? '50%' : '10px';
            
            heroSection.appendChild(effectElement);
        });
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 30px var(--shadow-color)';
        } else {
            navbar.style.boxShadow = '0 2px 10px var(--shadow-color)';
        }
    });
    
    // Add hover effect to skill cards and project cards
    const cards = document.querySelectorAll('.skill-card, .project-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Initialize with default theme effects
    updateThemeElements(savedTheme);
    
    // Add typing effect for tagline in cyber theme
    const tagline = document.querySelector('.tagline');
    if (tagline && localStorage.getItem('selectedTheme') === 'cyber') {
        const originalText = tagline.textContent;
        tagline.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                tagline.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
});

// Add parallax effect for floating elements
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        const speed = 0.05 * (index + 1);
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Add cursor trail effect for cyber theme
document.addEventListener('mousemove', function(e) {
    if (document.body.classList.contains('theme-cyber')) {
        const cursorTrail = document.createElement('div');
        cursorTrail.style.position = 'fixed';
        cursorTrail.style.width = '10px';
        cursorTrail.style.height = '10px';
        cursorTrail.style.background = '#00ff88';
        cursorTrail.style.borderRadius = '50%';
        cursorTrail.style.pointerEvents = 'none';
        cursorTrail.style.left = e.clientX + 'px';
        cursorTrail.style.top = e.clientY + 'px';
        cursorTrail.style.zIndex = '9999';
        cursorTrail.style.boxShadow = '0 0 10px #00ff88';
        cursorTrail.style.transition = 'all 0.5s ease';
        
        document.body.appendChild(cursorTrail);
        
        setTimeout(() => {
            cursorTrail.style.opacity = '0';
            cursorTrail.style.transform = 'scale(0.5)';
        }, 50);
        
        setTimeout(() => {
            cursorTrail.remove();
        }, 500);
    }
});

// Console message for developers
console.log('%c Welcome to Istiak Ahamed Rhyme\'s Portfolio! ', 
    'background: linear-gradient(135deg, #6c5ce7, #a29bfe); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px;');
console.log('%c Feel free to explore the different themes! ', 
    'color: #0984e3; font-size: 14px;');
