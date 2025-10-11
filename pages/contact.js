import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Phone, Linkedin, Twitter, Github, Dribbble, LoaderCircle, CheckCircle } from 'lucide-react';

// --- Start of Custom Global CSS/Tailwind Injection ---
// This ensures the application adheres to the custom classes and theme provided.
const customStyles = `
    /* Custom CSS Variables based on user's theme (using Fuchsia for Brand Accent) */
    :root {
      --radius: 1rem;
      --color-brand: 236 72 153; /* fuchsia-600 */
      --color-brand-dark: 192 38 211; /* fuchsia-700 */
    }
    
    /* Replicating the user's global body gradient for the entire component container */
    #app-root {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      background: linear-gradient(to bottom right, #0a0a0a, #1f2937, #0a0a0a);
      color: #f3f4f6;
      font-family: system-ui, sans-serif;
    }

    /* Custom utilities */
    .card {
      border-radius: 1rem; /* rounded-2xl */
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: #111827; /* dark:bg-gray-900 */
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* stronger shadow for 'outstanding' */
    }
    .muted {
      color: #9ca3af; /* dark:text-gray-400 */
    }
    
    /* Input/Form Focus Styling */
    .input-focus {
        transition: all 0.3s ease;
    }
    .input-focus:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(var(--color-brand), 0.4);
        border-color: rgb(var(--color-brand));
        background-color: #1f2937; /* slightly lighter gray on focus */
    }

    /* Primary Button Styling using brand color */
    .btn-primary {
      background-color: rgb(var(--color-brand));
      color: white;
      transition: all 0.3s ease-in-out;
      box-shadow: 0 4px 15px rgba(var(--color-brand), 0.6);
    }
    .btn-primary:hover:not(:disabled) {
        background-color: rgb(var(--color-brand-dark));
        transform: scale(1.01);
    }
    .btn-primary:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        box-shadow: none;
    }
`;
// --- End of Custom Global CSS/Tailwind Injection ---


const App = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isError, setIsError] = useState(false);

    const isFormValid = Object.values(formData).every(val => val.trim() !== '');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (isSubmitted || isError) {
            setIsSubmitted(false);
            setIsError(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        setIsLoading(true);
        setIsError(false);

        // --- Simulated API Call with 2-second delay ---
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            // Success
            setIsSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
        } catch (error) {
            // Simulated error handling
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const getMessageClass = () => {
        if (isSubmitted) return 'bg-green-900 border-green-600 text-green-300';
        if (isError) return 'bg-red-900 border-red-600 text-red-300';
        return 'hidden';
    };

    // Define the distinct color for the contact info panel
    const contactPanelColor = 'bg-fuchsia-600'; // Using Fuchsia to draw from the theme

    return (
        <div id="app-root">
            <style dangerouslySetInnerHTML={{ __html: customStyles }} />
            
            {/* Main Container using the custom .card class */}
            <div className="w-full max-w-6xl card shadow-2xl overflow-hidden">
                
                {/* Header Section */}
                <header className="p-6 md:p-10 text-center bg-gray-950/50 border-b border-fuchsia-500/20">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                        Let's Build Something <span className="text-fuchsia-400">Legendary</span>.
                    </h1>
                    <p className="muted text-lg">
                        We're ready to listen. Send us a message and we'll be in touch within 24 hours.
                    </p>
                </header>

                {/* Two-Column Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3">

                    {/* Contact Information Column (Left) */}
                    <div className={`lg:col-span-1 p-8 md:p-10 ${contactPanelColor} rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl text-white`}>
                        <h2 className="text-3xl font-bold mb-6">Connect Directly</h2>
                        <p className="text-fuchsia-100 mb-8">
                            Reach out using the contact points below or find us on social platforms.
                        </p>

                        <div className="space-y-8">
                            {/* Location */}
                            <div className="flex items-start space-x-4">
                                <MapPin className="w-6 h-6 flex-shrink-0 mt-1 text-fuchsia-200" />
                                <div>
                                    <p className="font-semibold text-lg">Global Studio</p>
                                    <p className="text-sm text-fuchsia-100">101 Digital Heights, Innovate City, CA 90210</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start space-x-4">
                                <Mail className="w-6 h-6 flex-shrink-0 mt-1 text-fuchsia-200" />
                                <div>
                                    <p className="font-semibold text-lg">Drop Us a Line</p>
                                    <a href="mailto:hello@bestdevs.com" className="text-sm hover:text-white transition duration-200 underline">hello@bestdevs.com</a>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start space-x-4">
                                <Phone className="w-6 h-6 flex-shrink-0 mt-1 text-fuchsia-200" />
                                <div>
                                    <p className="font-semibold text-lg">Give Us a Call</p>
                                    <a href="tel:+15551234567" className="text-sm hover:text-white transition duration-200 underline">+1 (555) 123-4567</a>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="mt-16">
                            <h3 className="font-bold text-xl mb-4">Follow the Journey</h3>
                            <div className="flex space-x-6">
                                <a href="#" aria-label="LinkedIn" className="hover:text-fuchsia-200 transition duration-200">
                                    <Linkedin className="w-7 h-7" />
                                </a>
                                <a href="#" aria-label="Twitter" className="hover:text-fuchsia-200 transition duration-200">
                                    <Twitter className="w-7 h-7" />
                                </a>
                                <a href="#" aria-label="GitHub" className="hover:text-fuchsia-200 transition duration-200">
                                    <Github className="w-7 h-7" />
                                </a>
                                <a href="#" aria-label="Dribbble" className="hover:text-fuchsia-200 transition duration-200">
                                    <Dribbble className="w-7 h-7" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Column (Right) */}
                    <div className="lg:col-span-2 p-8 md:p-12 text-gray-100">
                        <h2 className="text-3xl font-bold mb-8">Start the Conversation</h2>

                        {/* Form Feedback Message Box */}
                        {(isSubmitted || isError) && (
                            <div className={`p-4 mb-6 rounded-xl text-sm font-medium border ${getMessageClass()}`} role="alert">
                                <div className="flex items-center">
                                    {isSubmitted ? (
                                        <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                                    ) : (
                                        <Mail className="w-5 h-5 mr-3 flex-shrink-0" />
                                    )}
                                    <span>
                                        <strong>{isSubmitted ? 'Success!' : 'Oops!'}</strong> {
                                            isSubmitted 
                                            ? 'Your message has been sent successfully. We will be in touch shortly.'
                                            : 'Something went wrong during submission. Please check your network and try again.'
                                        }
                                    </span>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Name and Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">Full Name</label>
                                    <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange}
                                        className="input-focus w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-xl focus:outline-none"
                                        placeholder="Jane Doe" disabled={isLoading} />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">Email Address</label>
                                    <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange}
                                        className="input-focus w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-xl focus:outline-none"
                                        placeholder="jane@company.com" disabled={isLoading} />
                                </div>
                            </div>

                            {/* Subject Field */}
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-300">Subject</label>
                                <input type="text" id="subject" name="subject" required value={formData.subject} onChange={handleChange}
                                    className="input-focus w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-xl focus:outline-none"
                                    placeholder="Project Inquiry, Support Request, etc." disabled={isLoading} />
                            </div>

                            {/* Message Textarea */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">Your Message</label>
                                <textarea id="message" name="message" rows="5" required value={formData.message} onChange={handleChange}
                                    className="input-focus w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-xl focus:outline-none"
                                    placeholder="Tell us about your project or question in detail..." disabled={isLoading}></textarea>
                            </div>

                            {/* Submit Button */}
                            <button type="submit" 
                                className="btn btn-primary w-full flex items-center justify-center py-3 px-6 font-bold"
                                disabled={!isFormValid || isLoading || isSubmitted}>
                                {isLoading ? (
                                    <>
                                        <LoaderCircle className="w-5 h-5 mr-3 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    isSubmitted ? 'Message Received!' : 'Send Message'
                                )}
                            </button>
                            <p className="text-xs muted text-center pt-2">
                                Note: This form submission is simulated for demonstration purposes in the browser.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
