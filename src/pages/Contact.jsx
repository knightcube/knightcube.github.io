import { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // To enable this form, sign up at Formspree.io and paste your endpoint URL below
    // Example: const endpoint = "https://formspree.io/f/YOUR_ENDPOINT_ID";
    const endpoint = "https://formspree.io/f/xnjywklw";

    if (!endpoint) {
      setStatus("Please configure your Formspree endpoint in Contact.jsx");
      return;
    }

    try {
      setStatus("Sending...");
      const response = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus("Message sent successfully! I'll get back to you soon.");
        form.reset();
      } else {
        setStatus("Oops! There was a problem sending your message.");
      }
    } catch (error) {
      setStatus("Oops! There was a problem sending your message.");
    }
  };

  return (
    <main className="flex-grow pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-2xl mx-auto w-full z-10 relative">
      <header className="mb-12">
        <h1 className="font-display text-[48px] text-on-surface mb-6 leading-tight tracking-tight">Get in Touch</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Have a question or want to work together? Leave a message below and I'll get back to you as soon as possible.
        </p>
      </header>

      <div className="bg-surface-container border border-outline-variant/20 rounded-xl p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-label-md text-on-surface-variant">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="bg-surface border border-outline-variant/30 text-on-surface p-3 rounded-lg focus:outline-none focus:border-primary-container transition-colors"
              placeholder="Your name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-label-md text-on-surface-variant">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="bg-surface border border-outline-variant/30 text-on-surface p-3 rounded-lg focus:outline-none focus:border-primary-container transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="font-label-md text-on-surface-variant">Message</label>
            <textarea
              name="message"
              id="message"
              rows="5"
              required
              className="bg-surface border border-outline-variant/30 text-on-surface p-3 rounded-lg focus:outline-none focus:border-primary-container transition-colors resize-none"
              placeholder="What's on your mind?"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-4 bg-primary-container text-black font-label-md uppercase tracking-wider hover:bg-surface-tint transition-all duration-300 rounded-lg"
          >
            Send Message
          </button>

          {status && (
            <p className="mt-4 font-body-md text-center text-primary-container">
              {status}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
