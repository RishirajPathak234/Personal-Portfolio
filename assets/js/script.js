'use strict';

document.addEventListener('DOMContentLoaded', function() {
    // Sidebar toggle functionality
    const sidebar = document.getElementById("sidebar");
    const sidebarBtn = document.getElementById("sidebarToggle");

    if (sidebarBtn && sidebar) {
        sidebarBtn.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            sidebar.classList.toggle("active");
            
            // Animate hamburger icon
            const icon = sidebarBtn.querySelector('svg polyline');
            if (icon) {
                if (sidebar.classList.contains('active')) {
                    icon.setAttribute('points', '18,15 12,9 6,15');
                } else {
                    icon.setAttribute('points', '6,9 12,15 18,9');
                }
            }
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 1024 && sidebar && sidebarBtn) {
            if (!sidebar.contains(e.target) && !sidebarBtn.contains(e.target) && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                const icon = sidebarBtn.querySelector('svg polyline');
                if (icon) {
                    icon.setAttribute('points', '6,9 12,15 18,9');
                }
            }
        }
    });

    // Project filtering functionality
    window.filterProjects = function(category) {
        const projectCards = document.querySelectorAll('.project-card');
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        // Remove active class from all filter buttons
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        const activeBtn = document.querySelector(`[onclick="filterProjects('${category}')"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        // Filter projects with animation
        projectCards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    };

    // Download CV functionality
    window.downloadCV = function() {
        const btn = event.target.closest('.download-btn');
        if (!btn) return;
        
        const originalText = btn.innerHTML;
        
        btn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
            </svg>
            Downloading...
        `;
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            
            // Create download link (replace with actual CV path)
            const link = document.createElement('a');
            link.href = '/assets/Rishiraj_Pathak_CV.pdf';
            link.download = 'Rishiraj_Pathak_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Show success notification
            showNotification('CV downloaded successfully!', 'success');
        }, 1500);
    };

    // Open GitHub functionality
    window.openGithub = function(url) {
        if (url && url.trim() !== '') {
            window.open(url, '_blank');
        } else {
            showNotification('GitHub repository coming soon!', 'info');
        }
    };

    // Handle form submit
    window.handleFormSubmit = function(event) {
        event.preventDefault();
        
        const submitBtn = document.getElementById('submitBtn');
        const form = event.target;
        
        if (!submitBtn || !form) return;
        
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
            </svg>
            Sending...
        `;
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
                Message Sent!
            `;
            
            showNotification('Your message has been sent successfully!', 'success');
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                form.reset();
                validateForm(); // Re-validate after reset
            }, 2000);
        }, 1500);
    };

    // Form validation
    function validateForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;
        
        const inputs = form.querySelectorAll('.form-input');
        const submitBtn = document.getElementById('submitBtn');
        
        if (!submitBtn) return;
        
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
            }
        });
        
        submitBtn.disabled = !isValid;
    }

    // Setup form validation
    const form = document.querySelector('.contact-form');
    if (form) {
        const inputs = form.querySelectorAll('.form-input');
        
        inputs.forEach(input => {
            input.addEventListener('input', validateForm);
            input.addEventListener('blur', validateForm);
        });
        
        validateForm(); // Initial validation
    }

    // Animation with Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe animated elements
    const animatedElements = document.querySelectorAll('.service-card, .skill-category, .project-card, .timeline-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Window resize handler
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024 && sidebar) {
            sidebar.classList.remove('active');
            const icon = sidebarBtn?.querySelector('svg polyline');
            if (icon) {
                icon.setAttribute('points', '6,9 12,15 18,9');
            }
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // ESC key to close sidebar on mobile
        if (e.key === 'Escape' && sidebar && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            const icon = sidebarBtn?.querySelector('svg polyline');
            if (icon) {
                icon.setAttribute('points', '6,9 12,15 18,9');
            }
        }
    });

    // Notification System
    window.showNotification = function(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        `;

        // Add notification styles
        const bgColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1';
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: ${bgColor};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        `;

        // Add to document
        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    };

    // Add notification animations to CSS if not already present
    if (!document.querySelector('#notification-styles')) {
        const notificationStyles = document.createElement('style');
        notificationStyles.id = 'notification-styles';
        notificationStyles.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }

            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
            }

            .notification-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                padding: 0.25rem;
                border-radius: 4px;
                transition: background 0.2s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .notification-close:hover {
                background: rgba(255, 255, 255, 0.2);
            }
        `;
        document.head.appendChild(notificationStyles);
    }
});