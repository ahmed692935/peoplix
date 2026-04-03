import { useState } from "react";
import { useForm } from "react-hook-form";
import { GoDotFill } from "react-icons/go";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

interface ContactFormData {
  fullName: string;
  companyName: string;
  positionTitle: string;
  email: string;
  phoneNumber?: string;
}

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // EmailJS credentials from .env
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS credentials are missing in .env");
      toast.error("Email service is not configured yet.");
      setIsSubmitting(false);
      return;
    }

    try {
      const templateParams = {
        name: data.fullName,
        email: data.email,
        title: data.fullName,
        company: data.companyName,
        position: data.positionTitle,
        phone: data.phoneNumber || "N/A",
        message: `New message from ${data.fullName}`,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      toast.success("Thank you! Your message has been sent.");
      reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative max-w-5xl mb-20 rounded-[40px] mx-auto overflow-hidden border border-divider">
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{
          background: "#080808",
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-[150%] pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 0%, rgba(55,114,255,0.12) 0%, rgba(55,114,255,0.03) 40%, transparent 70%)"
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none opacity-50"
          style={{
            background: "radial-gradient(circle at 50% 100%, rgba(55,114,255,0.08) 0%, transparent 70%)"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-15 sm:px-12">
        {/* Tag */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 text-sm text-white py-1.5 px-4 rounded-full border border-divider bg-dark-gray/50 backdrop-blur-md">
            <GoDotFill className="text-primary" />
            Get in Touch
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-semibold text-white leading-tight tracking-tight">
            Ready to Transform Your Workplace?
          </h2>
          <p className="mt-4 text-text-gray text-lg max-w-2xl mx-auto">
            Fill out the form below and our team will get back to you shortly.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80 ml-1">Full Name</label>
              <input
                {...register("fullName", { required: "Full name is required" })}
                type="text"
                placeholder="John Doe"
                className={`w-full bg-dark-gray/40 border ${errors.fullName ? "border-red-500/50" : "border-divider"} rounded-2xl px-5 py-4 text-white placeholder:text-text-gray/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all`}
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.fullName.message}</p>}
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80 ml-1">Email Address</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="john@example.com"
                className={`w-full bg-dark-gray/40 border ${errors.email ? "border-red-500/50" : "border-divider"} rounded-2xl px-5 py-4 text-white placeholder:text-text-gray/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>}
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80 ml-1">Company Name</label>
              <input
                {...register("companyName", { required: "Company name is required" })}
                type="text"
                placeholder="Acme Corp"
                className={`w-full bg-dark-gray/40 border ${errors.companyName ? "border-red-500/50" : "border-divider"} rounded-2xl px-5 py-4 text-white placeholder:text-text-gray/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all`}
              />
              {errors.companyName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.companyName.message}</p>}
            </div>

            {/* Position Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80 ml-1">Position Title</label>
              <input
                {...register("positionTitle", { required: "Position title is required" })}
                type="text"
                placeholder="Agent"
                className={`w-full bg-dark-gray/40 border ${errors.positionTitle ? "border-red-500/50" : "border-divider"} rounded-2xl px-5 py-4 text-white placeholder:text-text-gray/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all`}
              />
              {errors.positionTitle && <p className="text-red-500 text-xs mt-1 ml-1">{errors.positionTitle.message}</p>}
            </div>
          </div>

          {/* Phone Number (Optional) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80 ml-1">Phone Number <span className="text-text-gray/60 font-normal">(Optional)</span></label>
            <input
              {...register("phoneNumber")}
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="w-full bg-dark-gray/40 border border-divider rounded-2xl px-5 py-4 text-white placeholder:text-text-gray/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center justify-center gap-2 bg-primary text-white font-bold px-12 py-4 rounded-full shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all cursor-pointer ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
