// Resume Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Headshot upload functionality
    const headshotPlaceholder = document.getElementById('headshotPlaceholder');
    const headshotImg = document.getElementById('headshotImg');
    
    // Create hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);
    
    // If a non-placeholder image is already set, show it and hide placeholder
    try {
        const src = headshotImg && headshotImg.getAttribute('src');
        if (src && !src.includes('headshot-placeholder.jpg')) {
            headshotImg.style.display = 'block';
            headshotPlaceholder.style.display = 'none';
        }
    } catch (e) {}

    // Handle placeholder click
    headshotPlaceholder.addEventListener('click', function() {
        fileInput.click();
    });
    
    // Handle file selection
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                headshotImg.src = e.target.result;
                headshotImg.style.display = 'block';
                headshotPlaceholder.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Smooth scrolling for any navigation links (if added later)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add animation classes on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Add initial styles and observe sections
    document.querySelectorAll('.resume-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Print functionality
    function addPrintStyles() {
        const printStyles = `
            @media print {
                .banner {
                    height: 150px;
                    background: #6c757d !important;
                }
                .banner h1 {
                    font-size: 2rem !important;
                }
                .tagline {
                    font-size: 1rem !important;
                }
                .container {
                    margin-top: 0 !important;
                    box-shadow: none !important;
                    padding: 1rem !important;
                }
                .headshot, .headshot-placeholder {
                    width: 120px !important;
                    height: 120px !important;
                }
                .resume-section {
                    page-break-inside: avoid;
                    opacity: 1 !important;
                    transform: none !important;
                }
                footer {
                    margin-top: 1rem !important;
                    padding: 1rem !important;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = printStyles;
        document.head.appendChild(styleSheet);
    }
    
    addPrintStyles();
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'p':
                    e.preventDefault();
                    window.print();
                    break;
            }
        }
    });
});

// Utility function to update content (for easy customization)
function updateResumeContent(section, content) {
    const element = document.querySelector(`.${section}`);
    if (element && content) {
        element.innerHTML = content;
    }
}

// Export function for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { updateResumeContent };
}
