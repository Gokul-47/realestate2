/**
 * STACKLY - Real Estate Website JavaScript
 * Main functionality and interactions
 */

(function($) {
    'use strict';

    // Initialize when DOM is ready
    $(document).ready(function() {
        initializeApp();
    });

    // Main initialization function
    function initializeApp() {
        initNavbar();
        initAOS();
        initGSAP();
        initCarousels();
        initCounters();
        initJarallax();
        initFormValidation();
        initPriceRange();
        initScrollToTop();
        initMagnificPopup();
        initTooltips();
        initDateTimePicker();
        initSelectPicker();
        initAppear();
        initCircleType();
        initLettering();
        initDashboard();
        init404BackButton();
    }

    // Navbar scroll effect
    function initNavbar() {
        var navbar = $('.navbar');
        
        $(window).scroll(function() {
            if ($(this).scrollTop() > 50) {
                navbar.addClass('scrolled');
            } else {
                navbar.removeClass('scrolled');
            }
        });

        // Mobile menu close on link click
        $('.navbar-nav .nav-link').on('click', function() {
            if ($(window).width() < 992) {
                $('.navbar-collapse').collapse('hide');
            }
        });

        // Smooth scroll for anchor links
        $('a[href^="#"]').on('click', function(e) {
            var target = $(this.hash);
            if (target.length) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 70
                }, 800);
            }
        });
    }

    // Initialize AOS (Animate On Scroll)
    function initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100,
                easing: 'ease-in-out'
            });
        }
    }

    // Initialize GSAP Animations
    function initGSAP() {
        if (typeof gsap !== 'undefined') {
            // Register ScrollTrigger plugin
            if (typeof ScrollTrigger !== 'undefined') {
                gsap.registerPlugin(ScrollTrigger);

                // Animate sections on scroll
                gsap.utils.toArray('section').forEach(function(section) {
                    gsap.from(section, {
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 80%',
                            toggleActions: 'play none none none'
                        },
                        opacity: 0,
                        y: 50,
                        duration: 1
                    });
                });

                // Parallax effect for hero
                gsap.to('.hero-overlay', {
                    scrollTrigger: {
                        trigger: '.hero-section',
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true
                    },
                    y: 200
                });
            }

            // Floating animation
            if ($('.floating-card').length) {
                gsap.to('.floating-card', {
                    y: -20,
                    duration: 2,
                    ease: 'power1.inOut',
                    repeat: -1,
                    yoyo: true
                });
            }
        }
    }

    // Initialize Carousels
    function initCarousels() {
        // Owl Carousel for properties
        if ($('.properties-carousel').length) {
            $('.properties-carousel').owlCarousel({
                loop: true,
                margin: 30,
                nav: false,
                dots: true,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: true,
                draggable: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    576: {
                        items: 2
                    },
                    992: {
                        items: 3
                    },
                    1200: {
                        items: 3
                    }
                }
            });
        }

        // Slick Carousel for agents
        if ($('.agents-carousel').length) {
            $('.agents-carousel').slick({
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 4,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 3000,
                arrows: false,
                draggable: true,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });
        }

        // Tiny Slider for testimonials
        if ($('.testimonials-slider').length && typeof tns !== 'undefined') {
            var slider = tns({
                container: '.testimonials-slider',
                items: 1,
                slideBy: 'page',
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayButtonOutput: false,
                controls: true,
                nav: true,
                speed: 400,
                responsive: {
                    640: {
                        items: 2
                    },
                    992: {
                        items: 3
                    }
                }
            });
        }
    }

    // Initialize Counters
    function initCounters() {
        if ($('.counter').length) {
            $('.counter').each(function() {
                var $this = $(this);
                var countTo = $this.data('target');

                $({ countNum: 0 }).animate({
                    countNum: countTo
                }, {
                    duration: 3000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum);
                    }
                });
            });
        }
    }

    // Initialize Jarallax (Parallax)
    function initJarallax() {
        if (typeof jarallax !== 'undefined' && $('.jarallax').length) {
            jarallax(document.querySelectorAll('.jarallax'), {
                speed: 0.2
            });
        }
    }

    // Initialize Form Validation
    function initFormValidation() {
        // Contact form validation (always active regardless of jquery.validate presence)
        if ($('#contactForm').length) {
            $('#contactForm').on('submit', function(e) {
                e.preventDefault();
                var isValid = true;

                var firstName = $('#firstName').val().trim();
                var lastName = $('#lastName').val().trim();
                var email = $('#email').val().trim();
                var subject = $('#subject').val();
                var message = $('#message').val().trim();
                var agree = $('#agree').is(':checked');

                $('#contactForm').find('input, select, textarea').removeClass('is-invalid');

                if (firstName.length < 2) {
                    isValid = false;
                    $('#firstName').addClass('is-invalid');
                }
                if (lastName.length < 2) {
                    isValid = false;
                    $('#lastName').addClass('is-invalid');
                }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    isValid = false;
                    $('#email').addClass('is-invalid');
                }
                if (!subject) {
                    isValid = false;
                    $('#subject').addClass('is-invalid');
                }
                if (message.length < 10) {
                    isValid = false;
                    $('#message').addClass('is-invalid');
                }
                if (!agree) {
                    isValid = false;
                    $('#agree').addClass('is-invalid');
                }

                if (isValid) {
                    window.location.href = '404.html';
                } else {
                    alert('Please fill out all required fields correctly.');
                }

                return false;
            });
        }

        if (typeof $.fn.validate !== 'undefined') {
            // Login form validation
            if ($('#loginForm').length) {
                $('#loginForm').validate({
                    rules: {
                        email: {
                            required: true,
                            email: true
                        },
                        password: {
                            required: true,
                            minlength: 6
                        }
                    },
                    messages: {
                        email: {
                            required: 'Please enter your email',
                            email: 'Please enter a valid email'
                        },
                        password: {
                            required: 'Please enter your password',
                            minlength: 'Password must be at least 6 characters'
                        }
                    },
                    submitHandler: function(form) {
                        // Redirect to dashboard based on user type
                        var userType = $('input[name="userType"]:checked').val();
                        if (userType === 'buyer') {
                            window.location.href = 'dashboard-buyer.html';
                        } else {
                            window.location.href = 'dashboard-agent.html';
                        }
                        return false;
                    }
                });
            }

            // Register form validation
            if ($('#registerForm').length) {
                $('#registerForm').validate({
                    rules: {
                        fullname: {
                            required: true,
                            minlength: 2
                        },
                        email: {
                            required: true,
                            email: true
                        },
                        password: {
                            required: true,
                            minlength: 6
                        },
                        confirmPassword: {
                            required: true,
                            equalTo: '#password'
                        },
                        terms: {
                            required: true
                        }
                    },
                    messages: {
                        fullname: {
                            required: 'Please enter your full name',
                            minlength: 'Name must be at least 2 characters'
                        },
                        email: {
                            required: 'Please enter your email',
                            email: 'Please enter a valid email'
                        },
                        password: {
                            required: 'Please enter a password',
                            minlength: 'Password must be at least 6 characters'
                        },
                        confirmPassword: {
                            required: 'Please confirm your password',
                            equalTo: 'Passwords do not match'
                        },
                        terms: {
                            required: 'You must accept the terms and conditions'
                        }
                    },
                    submitHandler: function(form) {
                        alert('Registration successful! Please login.');
                        window.location.href = 'login.html';
                        return false;
                    }
                });
            }

            // Valuation form submission
            if ($('.valuation-form').length) {
                $('.valuation-form').on('submit', function(e) {
                    e.preventDefault();
                    
                    // Get form inputs
                    var $form = $(this);
                    var inputs = $form.find('input[required], select[required]');
                    var isValid = true;
                    
                    // Check if all required fields are filled
                    inputs.each(function() {
                        if ($(this).val() === '' || $(this).val() === null) {
                            isValid = false;
                            $(this).addClass('is-invalid');
                        } else {
                            $(this).removeClass('is-invalid');
                        }
                    });
                    
                    // If all fields are valid, redirect to 404 page
                    if (isValid) {
                        window.location.href = '404.html';
                    } else {
                        alert('Please fill in all the required fields.');
                    }
                    
                    return false;
                });
            }
        }
    }

    // Initialize Price Range Slider
    function initPriceRange() {
        if (typeof noUiSlider !== 'undefined' && $('#priceRange').length) {
            var priceSlider = document.getElementById('priceRange');
            
            if (priceSlider && !priceSlider.noUiSlider) {
                noUiSlider.create(priceSlider, {
                    start: [100000, 1000000],
                    connect: true,
                    tooltips: [wNumb({ decimals: 0, prefix: '$' }), wNumb({ decimals: 0, prefix: '$' })],
                    range: {
                        'min': 0,
                        'max': 5000000
                    },
                    format: wNumb({
                        decimals: 0,
                        thousand: ',',
                        prefix: '$'
                    })
                });

                priceSlider.noUiSlider.on('update', function(values, handle) {
                    $('#priceRange').val(values[0] + ' - ' + values[1]);
                });
            }
        }
    }

    // Initialize Scroll to Top
    function initScrollToTop() {
        var scrollBtn = $('#scrollTop');

        $(window).scroll(function() {
            if ($(this).scrollTop() > 300) {
                scrollBtn.addClass('show');
            } else {
                scrollBtn.removeClass('show');
            }
        });

        scrollBtn.on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 800);
        });
    }

    // Initialize Magnific Popup
    function initMagnificPopup() {
        if (typeof $.fn.magnificPopup !== 'undefined') {
            // Image popup
            $('.popup-image').magnificPopup({
                type: 'image',
                gallery: {
                    enabled: true
                }
            });

            // Video popup
            $('.popup-video').magnificPopup({
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false
            });
        }
    }

    // Initialize Tooltips
    function initTooltips() {
        if (typeof bootstrap !== 'undefined') {
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        }
    }

    // Initialize DateTime Picker
    function initDateTimePicker() {
        if (typeof $.fn.datetimepicker !== 'undefined') {
            $('.datetimepicker').datetimepicker({
                format: 'Y-m-d H:i',
                step: 30
            });

            $('.datepicker').datetimepicker({
                timepicker: false,
                format: 'Y-m-d'
            });

            $('.timepicker').datetimepicker({
                datepicker: false,
                format: 'H:i',
                step: 30
            });
        }
    }

    // Initialize Select Picker
    function initSelectPicker() {
        if (typeof $.fn.selectpicker !== 'undefined') {
            $('.selectpicker').selectpicker({
                style: 'form-select',
                liveSearch: true
            });
        }
    }

    // Initialize jQuery Appear
    function initAppear() {
        if (typeof $.fn.appear !== 'undefined') {
            $('.counter').appear(function() {
                var $this = $(this);
                if (!$this.hasClass('counted')) {
                    $this.addClass('counted');
                    var countTo = $this.data('target');
                    
                    $({ countNum: 0 }).animate({
                        countNum: countTo
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(this.countNum);
                        }
                    });
                }
            });
        }
    }

    // Initialize CircleType
    function initCircleType() {
        if (typeof CircleType !== 'undefined' && $('.circletype').length) {
            $('.circletype').each(function() {
                new CircleType(this);
            });
        }
    }

    // Initialize Lettering
    function initLettering() {
        if (typeof $.fn.lettering !== 'undefined' && $('.lettering').length) {
            $('.lettering').lettering();
        }
    }

    // Initialize Dashboard
    function initDashboard() {
        // Sidebar toggle
        $('.sidebar-toggle').on('click', function() {
            $('.dashboard-sidebar').toggleClass('collapsed');
            $('.dashboard-content').toggleClass('expanded');
        });

        // Active menu item
        var currentPage = window.location.pathname.split('/').pop();
        $('.sidebar-menu a').each(function() {
            var href = $(this).attr('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                $(this).addClass('active');
            }
        });

        // Mobile sidebar
        if ($(window).width() < 768) {
            $('.dashboard-sidebar').removeClass('collapsed');
            $('.dashboard-content').removeClass('expanded');
        }

        $(window).resize(function() {
            if ($(window).width() < 768) {
                $('.dashboard-sidebar').removeClass('collapsed');
                $('.dashboard-content').removeClass('expanded');
            }
        });
    }

    // Initialize 404 Back Button
    function init404BackButton() {
        $('#backButton').on('click', function(e) {
            e.preventDefault();
            if (document.referrer && document.referrer !== window.location.href) {
                window.history.back();
            } else {
                window.location.href = 'index.html';
            }
        });
    }

    // Login Options Toggle
    if ($('.option-btn').length) {
        $('.option-btn').on('click', function() {
            $('.option-btn').removeClass('active');
            $(this).addClass('active');
            var userType = $(this).data('type');
            $('input[name="userType"]').val(userType);
        });
    }

    // Property Favorite Toggle
    $(document).on('click', '.btn-favorite', function(e) {
        e.preventDefault();
        var icon = $(this).find('i');
        if (icon.hasClass('far')) {
            icon.removeClass('far').addClass('fas');
            $(this).css('color', '#ef4444');
        } else {
            icon.removeClass('fas').addClass('far');
            $(this).css('color', '');
        }
    });

    // Isotope (if needed for filtering)
    if (typeof imagesLoaded !== 'undefined' && typeof Isotope !== 'undefined') {
        var $grid = $('.grid').imagesLoaded(function() {
            $grid.isotope({
                itemSelector: '.grid-item',
                layoutMode: 'fitRows'
            });
        });

        $('.filter-buttons').on('click', 'button', function() {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({ filter: filterValue });
            $('.filter-buttons button').removeClass('active');
            $(this).addClass('active');
        });
    }

    // Countdown Timer (if needed)
    if (typeof $.fn.countdown !== 'undefined' && $('.countdown').length) {
        $('.countdown').each(function() {
            var $this = $(this);
            var finalDate = $this.data('date');
            $this.countdown(finalDate, function(event) {
                $this.html(event.strftime(
                    '<div class="countdown-item"><span>%D</span>Days</div>' +
                    '<div class="countdown-item"><span>%H</span>Hours</div>' +
                    '<div class="countdown-item"><span>%M</span>Minutes</div>' +
                    '<div class="countdown-item"><span>%S</span>Seconds</div>'
                ));
            });
        });
    }

    // Preloader (optional)
    $(window).on('load', function() {
        $('.preloader').fadeOut('slow');
    });

    // Handle external links (redirect to 404)
    $('a[href^="http://"], a[href^="https://"]').not('[href*="' + window.location.hostname + '"]').attr('target', '_blank');

    // Page Loading Animation
    $(window).on('load', function() {
        $('body').addClass('loaded');
    });

    // Prevent empty form submissions
    $('form').on('submit', function(e) {
        var isEmpty = true;
        $(this).find('input[type="text"], input[type="email"], textarea').each(function() {
            if ($(this).val().trim() !== '') {
                isEmpty = false;
            }
        });
        if (isEmpty) {
            e.preventDefault();
            alert('Please fill in the required fields.');
        }
    });

    // Add ripple effect to buttons
    $('.btn').on('click', function(e) {
        var ripple = $('<span class="ripple"></span>');
        var x = e.pageX - $(this).offset().left;
        var y = e.pageY - $(this).offset().top;
        
        ripple.css({
            left: x,
            top: y
        });
        
        $(this).append(ripple);
        
        setTimeout(function() {
            ripple.remove();
        }, 600);
    });

    // Force redirect for Agents hero buttons to 404
    $('.hero-buttons a').on('click', function(e) {
        e.preventDefault();
        window.location.href = '404.html';
    });

    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

})(jQuery);

// Vanilla JavaScript utilities
document.addEventListener('DOMContentLoaded', function() {
    
    // Add active class to current nav item
    const navLinks = document.querySelectorAll('.nav-link');
    const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation) {
            link.classList.add('active');
        }
    });

    // Form input animations
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Escape key closes modals
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal.show');
            modals.forEach(modal => {
                const modalInstance = bootstrap.Modal.getInstance(modal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            });
        }
    });

    // Accessibility: Skip to content
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Console easter egg
    console.log('%cWelcome to Stackly!', 'color: #2563eb; font-size: 20px; font-weight: bold;');
    console.log('%cLooking for a career in real estate? Visit stackly.com/careers', 'color: #6b7280; font-size: 14px;');
});

// Select all sidebar links
const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
const sidebar = document.querySelector('.dashboard-sidebar');
const content = document.querySelector('.dashboard-content');

// Loop through each link
sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {

        // Only apply for mobile screen
        if (window.innerWidth < 768) {
            sidebar.classList.remove('active');
            content.classList.remove('expanded');
        }

    });
});

const toggleBtn = document.querySelector('.sidebar-toggle');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    content.classList.toggle('expanded');
});