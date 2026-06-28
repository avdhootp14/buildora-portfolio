import { Metadata } from 'next';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: 'Cookie Policy - Weblinq',
  description: 'Cookie Policy for Weblinq Agency',
};

export default function CookiePolicy() {
  return (
    <main className="bg-[#050505] min-h-screen text-white/80 font-sans selection:bg-[#8b5cf6]/30 selection:text-white">
      <Navbar />
      
      <div className="pt-32 pb-24 max-w-4xl mx-auto px-6 relative z-10">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">Cookie Policy</h1>
        <p className="text-sm text-white/50 mb-12 uppercase tracking-widest font-semibold">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        
        <div className="space-y-8 prose prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-display font-semibold text-white mb-4">1. What are cookies?</h2>
            <p className="leading-relaxed">
              Cookies are small text files that are placed on your computer or mobile device when you browse websites. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-white mb-4">2. How we use cookies</h2>
            <p className="leading-relaxed mb-4">
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/70">
              <li><strong>Essential Cookies:</strong> These are required for the operation of our website.</li>
              <li><strong>Analytical/Performance Cookies:</strong> They allow us to recognize and count the number of visitors and see how visitors move around our website. This helps us improve the way our website works.</li>
              <li><strong>Functionality Cookies:</strong> These are used to recognize you when you return to our website, enabling us to personalize content and remember your preferences.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-white mb-4">3. Third-party cookies</h2>
            <p className="leading-relaxed">
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the service, deliver advertisements on and through the service, and so on. We use services like Google Analytics to understand how visitors engage with our site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-white mb-4">4. Managing cookies</h2>
            <p className="leading-relaxed">
              Most web browsers allow some control of most cookies through the browser settings. You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
