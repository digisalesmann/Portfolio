import React, { useState, useEffect, useCallback, useMemo } from 'react';

// --- Global Tailwind Configuration and Styling for JIT/Sandbox Environment ---
// In a standard React project, these styles would be in a global CSS file.
const GlobalStyles = () => (
    <>
        <script src="https://kit.fontawesome.com/a076d05399.js" crossOrigin="anonymous"></script>
        {/* Load Font Awesome for icons used in the structure */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" xintegrity="sha512-SnH5WK+bZxgPHs44uWIX+LLMDJz9T2AUj0oE" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <style jsx global>{`
            /* Define the custom Tailwind colors based on the user's theme */
            :root {
                --color-brand: #A855F7; /* Purple 500 */
                --color-brand-dark: #9333ea; /* Purple 600 */
                --radius: 1rem;
            }

            /* Applying the global background theme to the body-like container */
            .app-container-bg {
                background: linear-gradient(135deg, var(--tw-color-pink-50), var(--tw-color-fuchsia-50), var(--tw-color-indigo-50));
                color: #1f2937; /* gray-900 */
                transition: all 0.5s ease;
                font-family: 'Inter', sans-serif;
            }
            
            /* Dark mode variant */
            .dark .app-container-bg {
                /* Deep dark, subtle purple gradient for premium aesthetic */
                background: linear-gradient(135deg, #0c021f, #14042a, #1a0730);
                color: #f3f4f6; /* gray-100 */
            }

            /* Custom Components from user's theme */
            .card {
                border-radius: var(--radius);
                border-width: 1px;
                border-color: rgba(0, 0, 0, 0.1); /* border-black/10 */
                background-color: white;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                backdrop-filter: blur(5px);
            }
            .dark .card {
                border-color: rgba(255, 255, 255, 0.1); /* dark:border-white/10 */
                background-color: rgba(17, 24, 39, 0.85); /* dark:bg-gray-900/85 (Slight transparency) */
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.15); 
            }

            /* New: Subtle lift/shadow on main card hover (Desktop only) */
            @media (min-width: 1024px) {
                .card-hover-lift:hover {
                    transform: translateY(-4px);
                    /* Stronger brand shadow for premium effect */
                    box-shadow: 0 30px 50px -10px rgba(168, 85, 247, 0.7); 
                }
            }
            
            .btn-primary {
                display: inline-block;
                padding: 12px 24px;
                border-radius: var(--radius);
                font-weight: 600;
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                background-color: var(--color-brand);
                color: white;
                box-shadow: 0 10px 15px -3px rgba(168, 85, 247, 0.3);
            }
            .btn-primary:hover {
                background-color: var(--color-brand-dark);
                transform: translateY(-2px); /* Lift on hover for premium button */
                box-shadow: 0 15px 25px -5px rgba(168, 85, 247, 0.5); 
            }

            /* Input field focus glow effect (adapted to 'brand' color) */
            .form-input-glow:focus {
                outline: none;
                box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.5); 
                border-color: var(--color-brand);
            }
            
            /* Fade In Animation */
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in {
                animation: fadeIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }

            /* Success Message Animation */
            @keyframes bounce-in {
                0% { transform: scale(0.5); opacity: 0; }
                80% { transform: scale(1.1); }
                100% { transform: scale(1); opacity: 1; }
            }
            .success-message {
                animation: bounce-in 0.5s ease-out;
            }
        `}</style>
    </>
);

// Custom Input Field Component for reusability, styling, and client-side validation
const ContactInput = ({ label, id, type = 'text', value, onChange, required = false, rows, placeholder, onValidationChange }) => {
    const isTextArea = rows > 0;
    const InputTag = isTextArea ? 'textarea' : 'input';

    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState(false);

    // Use useCallback for onValidationChange to prevent infinite loops in useEffect
    const reportValidation = useCallback(onValidationChange, [onValidationChange]);

    // Run validation whenever the value changes
    useEffect(() => {
        let valid = required ? value.trim() !== '' : true;

        if (type === 'email' && required && value.trim() !== '') {
            // Simple email regex for client-side feedback
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            valid = valid && emailRegex.test(value.trim());
        }

        setIsValid(valid);
        reportValidation(id, valid); // Report validation status back to parent form
    }, [value, required, type, id, reportValidation]);

    const handleBlur = () => {
        // Only mark as touched on blur if it hasn't been touched yet
        if (!isTouched) {
            setIsTouched(true);
        }
    };
    
    // Determine input class based on validation and touch status
    const inputClasses = `
        w-full p-3 bg-white dark:bg-gray-800 border focus:border-opacity-100 focus:ring-0 form-input-glow transition duration-300
        ${isTextArea ? 'resize-none' : ''} 
        ${!isValid && isTouched ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-700'} 
        text-gray-800 dark:text-gray-100
        rounded-xl
    `;

    return (
        <div className="space-y-2 relative">
            <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {label} {required && <span className="text-red-500 dark:text-red-400">*</span>}
            </label>
            <div className="relative">
                <InputTag
                    id={id}
                    name={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    required={required}
                    rows={rows}
                    placeholder={placeholder}
                    className={inputClasses}
                    onBlur={handleBlur}
                    onFocus={() => setIsTouched(true)} // Show error state immediately on focus if invalid
                />
                
                {/* Success Checkmark Icon (Visually engaging feedback) */}
                {(isValid && isTouched && value.trim() !== '') && (
                    <i className="fa-solid fa-circle-check text-green-500 absolute right-3 top-1/2 transform -translate-y-1/2 text-xl pointer-events-none transition duration-300"></i>
                )}
            </div>

            {/* Error Message */}
            {(!isValid && isTouched) && required && (
                <p className="text-xs text-red-400 font-medium pt-1">
                    Please provide a valid {label.toLowerCase()}.
                </p>
            )}
        </div>
    );
};

// --- Contact Information Display Component ---
const ContactDetails = ({ icon, label, value, href }) => (
    <a 
        href={href}
        className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white/10 transition duration-300 transform hover:scale-[1.01] cursor-pointer"
        target={href.startsWith('http') ? '_blank' : '_self'}
        rel="noopener noreferrer"
    >
        <i className={`fa-solid ${icon} text-[var(--color-brand)] text-2xl mt-1 flex-shrink-0`} aria-hidden="true"></i>
        <div>
            <p className="text-sm text-gray-400 font-medium">{label}</p>
            <p className="text-lg text-white font-light break-words">{value}</p>
        </div>
    </a>
);

// --- Social Link Display Component ---
const SocialLink = ({ icon, url, label }) => (
    <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-[var(--color-brand)] hover:scale-125 transition duration-300 text-3xl"
        aria-label={label}
    >
        <i className={`fab ${icon}`}></i>
    </a>
);


// Main Contact Page Component
const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formValidation, setFormValidation] = useState({});

    // Memoize the form validity check
    const isFormValid = useMemo(() => {
        // Ensure all required fields exist in validation state and are true
        const requiredKeys = ['name', 'email', 'subject', 'message'];
        return requiredKeys.every(key => formValidation[key] === true);
    }, [formValidation]);

    const handleValidationChange = useCallback((id, valid) => {
        setFormValidation(prev => ({ ...prev, [id]: valid }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!isFormValid) {
            console.error('Form is invalid. Cannot submit.');
            return;
        }

        setIsSubmitting(true);
        setIsSuccess(false);

        // --- Mock API Call Simulation for the 'engaging animation' ---
        console.log('Form Submitted:', formData);

        // Simulate network delay
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            
            // Clear the form and reset validation states
            setFormData({ name: '', email: '', subject: '', message: '' });
            setFormValidation({});

            // Hide success message after a few seconds
            setTimeout(() => setIsSuccess(false), 5000);
        }, 2000);
    };

    // Social Media Data (for easy mapping)
    const socialLinks = [
        { icon: 'fa-linkedin-in', url: 'https://www.linkedin.com/in/victor-chinagoro-1a032423a/', label: 'LinkedIn' },
        { icon: 'fa-x-twitter', url: 'https://x.com/digisalesmann', label: 'Twitter/X' },
        { icon: 'fa-github', url: 'https://github.com/digisalesmann', label: 'GitHub' },
        { icon: 'fa-instagram', url: 'https://www.instagram.com/buildwithvictorr/', label: 'Instagram' },
    ];
    
    // Contact Info Data
    const contactInfo = [
        { 
            icon: 'fa-envelope', 
            label: 'General Inquiries', 
            value: 'contact@comingsoon.com', 
            href: 'mailto:contact@comingsoon.com' 
        },
        { 
            icon: 'fa-user-tie', 
            label: 'Personal Consultation', 
            value: 'chinagorovictor59@gmail.com', 
            href: 'mailto:chinagorovictor59@gmail.com' 
        },
        { 
            icon: 'fa-phone', 
            label: '24/7 Priority Line', 
            value: '+234 903 788 4753', 
            href: 'tel:+2349037884753' 
        },
        { 
            icon: 'fa-map-location-dot', 
            label: 'Global Headquarters', 
            value: 'Remote - Serving Clients Worldwide',
            href: '#' 
        },
    ];

    return (
        // Added card-hover-lift class for premium feel
        <div id="contactContainer" className="animate-fade-in max-w-6xl mx-auto my-12 card card-hover-lift transition-all duration-500 overflow-hidden">
            
            {/* Header Section: Large, engaging typography */}
            <header className="p-8 md:p-12 bg-gray-900/10 dark:bg-gray-800/70 border-b border-[var(--color-brand)]/50">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
                    Start Your <span className="text-[var(--color-brand)]">Ascension</span>
                </h1>
                <p className="text-xl font-light text-gray-700 dark:text-gray-300">
                    Tell me about your next big project. I am ready to deliver world-class innovation.
                </p>
            </header>

            {/* Main Content Grid: Contact Details (1/3) and Form (2/3) */}
            <div className="grid grid-cols-1 lg:grid-cols-3">
                
                {/* Left Column: Contact Information & Socials */}
                <div className="lg:col-span-1 p-8 md:p-10 bg-gray-900 dark:bg-gray-900/90 border-b lg:border-r border-[var(--color-brand)]/40 space-y-10">
                    
                    {/* Contact Details Block */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2">Direct Lines</h2>
                        <div className="space-y-4">
                            {contactInfo.map((item, index) => (
                                <ContactDetails key={index} {...item} />
                            ))}
                        </div>
                    </div>

                    {/* Social Media Block */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2">Digital Presence</h3>
                        <div className="flex space-x-6 justify-center lg:justify-start">
                            {socialLinks.map((link, index) => (
                                <SocialLink key={index} {...link} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Contact Form */}
                <div className="lg:col-span-2 p-8 md:p-12">
                    <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Secure Inquiry Form</h2>

                    {isSuccess ? (
                        <div className="success-message flex flex-col items-center justify-center p-12 bg-green-900/30 rounded-xl text-center border-2 border-green-500 shadow-xl text-green-100">
                            <i className="fa-solid fa-check-circle text-6xl text-green-400 mb-4"></i>
                            <h3 className="text-3xl font-bold text-white mb-2">Success! Message Transmitted.</h3>
                            <p className="text-lg">Your inquiry has been encrypted and routed. We will connect with you within one business day.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <ContactInput 
                                    label="Full Name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your Full Name"
                                    onValidationChange={handleValidationChange}
                                />
                                <ContactInput 
                                    label="Work Email Address"
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="your.email@company.com"
                                    onValidationChange={handleValidationChange}
                                />
                            </div>

                            <ContactInput 
                                label="Subject of Inquiry"
                                id="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                placeholder="e.g., Enterprise Web Development or Partnership"
                                onValidationChange={handleValidationChange}
                            />

                            <ContactInput 
                                label="Project Details / Message"
                                id="message"
                                rows={6}
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder="Describe your needs, budget, and timeline..."
                                onValidationChange={handleValidationChange}
                            />

                            <button
                                type="submit"
                                // Disabled if submitting or the form is not yet fully valid
                                className={`btn-primary w-full flex items-center justify-center space-x-3 text-xl disabled:opacity-50 disabled:cursor-not-allowed`}
                                disabled={isSubmitting || !isFormValid}
                            >
                                {isSubmitting && (
                                    <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                                <span>{isSubmitting ? 'Transmitting Securely...' : 'Send Message Now'}</span>
                            </button>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
                                All communication is treated with strict confidentiality.
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

// Main App component to include global styles
const App = () => {
    // We apply the 'dark' class here for the default premium dark aesthetic
    return (
        <div className="min-h-screen p-4 sm:p-8 dark app-container-bg font-inter">
            <GlobalStyles />
            <ContactPage />
        </div>
    );
};

export default App;
