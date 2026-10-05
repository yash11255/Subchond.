"use client";

import React, { useState } from "react";
import { Calendar, Phone, Mail, MapPin, Send, CheckCircle2, ShieldAlert } from "lucide-react";
import SectionEyebrow from "./SectionEyebrow";

export default function AppointmentSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "Gurugram",
    kneeCondition: "",
    hasMri: "yes",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact-appointment"
      className="relative w-full bg-[#E8F1EF] text-[#1B2B2A] py-20 md:py-32 border-b border-[#0F766E]/20"
    >
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
        
        {/* Left Column: Info & Trust */}
        <div className="lg:col-span-6 space-y-8">
          <SectionEyebrow text="11 / CONSULTATION & SECOND OPINION" darkBg={false} />

          <div className="space-y-4">
            <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight leading-[0.95] text-[#1B2B2A] font-bold">
              Schedule Your Knee Evaluation.
            </h2>
            <p className="text-base sm:text-lg font-sans-clean font-medium text-[#4B5F5D] leading-relaxed">
              Book a personal consultation or request a second opinion on your MRI scan with Dr. Manu Bora at our centres in Gurugram, New Delhi, or Mumbai.
            </p>
          </div>

          {/* Clinical Centres */}
          <div className="space-y-4 pt-4 border-t border-[#0F766E]/15">
            <h3 className="text-xs sm:text-sm font-sans-clean font-bold uppercase tracking-wider text-[#0F766E]">
              CLINICAL CENTRES & LOCATIONS
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-[#FFFFFF] rounded-xl border border-[#0F766E]/15 shadow-sm space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#0F766E]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>GURUGRAM</span>
                </div>
                <p className="text-xs text-[#4B5F5D] font-medium">Prior appointment only</p>
              </div>

              <div className="p-4 bg-[#FFFFFF] rounded-xl border border-[#0F766E]/15 shadow-sm space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#0F766E]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>NEW DELHI</span>
                </div>
                <p className="text-xs text-[#4B5F5D] font-medium">Prior appointment only</p>
              </div>

              <div className="p-4 bg-[#FFFFFF] rounded-xl border border-[#0F766E]/15 shadow-sm space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#0F766E]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>MUMBAI</span>
                </div>
                <p className="text-xs text-[#4B5F5D] font-medium">Prior appointment only</p>
              </div>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-4 bg-[#FFF8EE] rounded-xl border border-[#C2410C]/20 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-[#C2410C] shrink-0 mt-0.5" />
            <p className="text-xs font-sans-clean text-[#4B5F5D] font-medium leading-relaxed">
              Your privacy is respected. Clinical reports and medical data provided are strictly confidential and reviewed only by Dr. Manu Bora&apos;s surgical team.
            </p>
          </div>
        </div>

        {/* Right Column: Appointment Form */}
        <div className="lg:col-span-6 bg-[#FFFFFF] border border-[#0F766E]/20 p-8 sm:p-10 rounded-2xl shadow-xl">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-[#0F766E]/15 text-[#0F766E] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif-display text-3xl uppercase font-bold text-[#1B2B2A]">
                Appointment Request Received
              </h3>
              <p className="text-sm font-sans-clean text-[#4B5F5D] max-w-md mx-auto font-medium">
                Thank you for contacting Dr. Manu Bora&apos;s clinic. Our appointment coordinator will contact you within 24 hours to confirm your consultation details.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 font-sans-clean">
              <div className="space-y-1">
                <h3 className="font-serif-display text-2xl sm:text-3xl text-[#1B2B2A] font-bold uppercase">
                  Request a Consultation
                </h3>
                <p className="text-xs sm:text-sm text-[#4B5F5D] font-medium">
                  Fill in your details for a clinical evaluation or second opinion.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1B2B2A] mb-1">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#F7FAF9] border border-[#0F766E]/25 rounded-lg px-4 py-3 text-sm text-[#1B2B2A] focus:outline-none focus:border-[#0F766E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1B2B2A] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 Mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#F7FAF9] border border-[#0F766E]/25 rounded-lg px-4 py-3 text-sm text-[#1B2B2A] focus:outline-none focus:border-[#0F766E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1B2B2A] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F7FAF9] border border-[#0F766E]/25 rounded-lg px-4 py-3 text-sm text-[#1B2B2A] focus:outline-none focus:border-[#0F766E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1B2B2A] mb-1">
                    Preferred City *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#F7FAF9] border border-[#0F766E]/25 rounded-lg px-4 py-3 text-sm text-[#1B2B2A] focus:outline-none focus:border-[#0F766E]"
                  >
                    <option value="Gurugram">Gurugram Clinic</option>
                    <option value="New Delhi">New Delhi Centre</option>
                    <option value="Mumbai">Mumbai Centre</option>
                    <option value="Online">Online / Video Consultation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1B2B2A] mb-1">
                  Knee Symptoms / Medical History
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your knee pain, duration, or prior surgical advice..."
                  value={formData.kneeCondition}
                  onChange={(e) => setFormData({ ...formData, kneeCondition: e.target.value })}
                  className="w-full bg-[#F7FAF9] border border-[#0F766E]/25 rounded-lg px-4 py-3 text-sm text-[#1B2B2A] focus:outline-none focus:border-[#0F766E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1B2B2A] mb-2">
                  Do you have recent MRI / X-ray scans available?
                </label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1B2B2A] cursor-pointer">
                    <input
                      type="radio"
                      name="mri"
                      value="yes"
                      checked={formData.hasMri === "yes"}
                      onChange={() => setFormData({ ...formData, hasMri: "yes" })}
                      className="text-[#0F766E] focus:ring-[#0F766E]"
                    />
                    <span>Yes, I have MRI / X-rays</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1B2B2A] cursor-pointer">
                    <input
                      type="radio"
                      name="mri"
                      value="no"
                      checked={formData.hasMri === "no"}
                      onChange={() => setFormData({ ...formData, hasMri: "no" })}
                      className="text-[#0F766E] focus:ring-[#0F766E]"
                    />
                    <span>No, I need imaging advice</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#C2410C] hover:bg-[#EA580C] text-white text-sm font-bold uppercase tracking-[0.14em] py-4 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span>CONFIRM APPOINTMENT REQUEST</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
