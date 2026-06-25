import { Metadata } from 'next';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: 'Privacy Policy - Buildora',
  description: 'Privacy Policy for Buildora Agency',
};

export default function PrivacyPolicy() {
  return (
    <main className="bg-[#050505] min-h-screen text-white/80 font-sans selection:bg-[#8b5cf6]/30 selection:text-white">
      <Navbar />
      
      <div className="pt-32 pb-24 max-w-4xl mx-auto px-6 relative z-10">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">Privacy Policy</h1>
        <p className="text-sm text-white/50 mb-12 uppercase tracking-widest font-semibold">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        
        <div className="space-y-8 prose prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-display font-semibold text-white mb-4">1. Information We Collect</h2>
            <p className="leading-relaxed">
              We collect information that you provide directly to us, including when you fill out a contact form, request a quote, or communicate with us. This may include your name, email address, phone number, and any other information you choose to provide about your project or business.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-white mb-4">2. How We Use Your Information</h2>
            <p className="leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/70">
              <li>Provide, maintain, and improve our services.</li>
              <li>Communicate with you regarding your inquiries or projects.</li>
              <li>Send you technical notices, updates, and support messages.</li>
              <li>Analyze trends and usage to better understand how our services are used.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-white mb-4">3. Information Sharing</h2>
            <p className="leading-relaxed">
              We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners and trusted affiliates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-white mb-4">4. Security</h2>
            <p className="leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is ever completely secure or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-white mb-4">5. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:hello@buildora.agency" className="text-[#8b5cf6] hover:underline">hello@buildora.agency</a>.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
