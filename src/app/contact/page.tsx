"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Temporary submission state for MVP
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 sm:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Contact Us</h1>
          <p className="text-lg text-slate-600">
            Have a question about a workshop? Want to partner with us? We'd love to hear from you.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h2>
              <p className="text-slate-600 mb-8">Thank you for reaching out. Our team will get back to you shortly.</p>
              <Button onClick={() => setSubmitted(false)}>Send Another Message</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-900">Full Name</label>
                  <input id="name" required className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-900">Email Address</label>
                  <input id="email" type="email" required className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="john@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-slate-900">Phone Number (Optional)</label>
                  <input id="phone" type="tel" className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium text-slate-900">Category</label>
                  <select id="category" required className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select a topic...</option>
                    <option value="student">Student Inquiry</option>
                    <option value="college">College Partnership</option>
                    <option value="trainer">Trainer Application</option>
                    <option value="business">Business Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-900">Your Message</label>
                <textarea id="message" required rows={5} className="flex w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="How can we help you?"></textarea>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg">
                Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
