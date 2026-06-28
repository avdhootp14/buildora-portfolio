import { Metadata } from 'next';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: 'Terms of Service - Weblinq',
  description: 'Terms of Service for Weblinq Agency',
};

export default function TermsOfService() {
  return (
    <main className="bg-[#050505] min-h-screen text-white/80 font-sans selection:bg-[#8b5cf6]/30 selection:text-white">
      <Navbar />
      
      <div className="pt-32 pb-24 max-w-4xl mx-auto px-6 relative z-10">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">Terms of Service</h1>
        <p className="text-sm text-white/50 mb-12 uppercase tracking-widest font-semibold">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        
        <div className="space-y-8 prose prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-display font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing and using our website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-white mb-4">2. Description of Services</h2>
            <p className="leading-relaxed">
              Weblinq Agency provides web development, mobile application development, UI/UX design, and digital consulting services. The specific deliverables, timelines, and costs will be outlined in individual project proposals or statements of work.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-white mb-4">3. Intellectual Property</h2>
            <p className="leading-relaxed">
              Unless otherwise agreed upon in writing, all source code, designs, and materials created during a project remain the intellectual property of Weblinq Agency until full payment is received. Upon final payment, intellectual property rights transfer to the client as specified in the project contract.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-white mb-4">4. Limitation of Liability</h2>
            <p className="leading-relaxed">
              In no event shall Weblinq Agency, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-white mb-4">5. Revisions and Errata</h2>
            <p className="leading-relaxed">
              The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete, or current. We may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
