import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '3fb18b2d-b982-4b56-a300-2a9495358245',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setStatusMessage('Thank you! Your message has been sent successfully.');
        
        // Dispatch analytics event
        const event = new CustomEvent('formSubmitted', {
          detail: { name: formData.name, email: formData.email, status: 'success' }
        });
        window.dispatchEvent(event);
        
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setStatusMessage('Something went wrong. Please try again.');
        
        // Dispatch analytics event
        const event = new CustomEvent('formSubmitted', {
          detail: { name: formData.name, email: formData.email, status: 'error' }
        });
        window.dispatchEvent(event);
        
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setStatusMessage('Failed to send message. Please try again later.');
      
      // Dispatch analytics event
      const event = new CustomEvent('formSubmitted', {
        detail: { name: formData.name, email: formData.email, status: 'error' }
      });
      window.dispatchEvent(event);
      
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-aqua-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have a project in mind? Let's work together to bring your ideas to life!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Let's start a conversation</h3>
              <p className="text-lg text-gray-600 mb-8">
                I'm always interested in new opportunities and exciting projects. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-aqua-100 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-aqua-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">satyamprajapati8707@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-aqua-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-aqua-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Location</h4>
                  <p className="text-gray-600">India</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <a href="https://www.linkedin.com/in/satyam-prajapati-595455202" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-aqua-100 hover:bg-aqua-200 rounded-full flex items-center justify-center transition-colors">
                <span className="text-aqua-600 font-bold">in</span>
              </a>
              <a href="https://github.com/Satya8463" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-aqua-100 hover:bg-aqua-200 rounded-full flex items-center justify-center transition-colors">
                <span className="text-aqua-600 font-bold">gh</span>
              </a>
              <a href="#" className="w-10 h-10 bg-aqua-100 hover:bg-aqua-200 rounded-full flex items-center justify-center transition-colors">
                <span className="text-aqua-600 font-bold">tw</span>
              </a>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center space-x-2">
                  <CheckCircle size={20} />
                  <span>{statusMessage}</span>
                </div>
              )}
              
              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center space-x-2">
                  <AlertCircle size={20} />
                  <span>{statusMessage}</span>
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aqua-500 focus:border-aqua-500 transition-colors"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aqua-500 focus:border-aqua-500 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aqua-500 focus:border-aqua-500 transition-colors"
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aqua-500 focus:border-aqua-500 transition-colors resize-none text-gray-900 bg-white"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-aqua-500 hover:bg-aqua-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                {status === 'loading' ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;