import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-slate-950 text-white min-h-screen overflow-x-hidden font-sans">
      {/* Hero - Full viewport sexy opener */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Background image + overlay */}
        <div className="absolute inset-0">
          <img
            src="https://thumbs.dreamstime.com/b/car-driving-city-night-rain-vibrant-futuristic-cityscape-night-sleek-red-sports-car-driving-356651577.jpg"
            alt="Neon futuristic car in cyberpunk city night"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.45] contrast-[1.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/50 via-purple-950/40 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              RidePulse
            </span>
          </h1>

          <p className="text-xl sm:text-3xl md:text-4xl font-light text-slate-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            Own the night in Addis. <br className="hidden sm:block" />
            Fast rides. Electric vibes.{" "}
            <span className="italic font-medium text-purple-300">
              Always on pulse.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/login"
              className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-2xl shadow-purple-900/40 hover:shadow-purple-700/60 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
            >
              <span>Log In & Ride Now</span>
              <svg
                className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>

            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-10 py-5 text-xl font-semibold rounded-full border-2 border-purple-500/60 hover:bg-purple-900/30 transition-all duration-300 hover:border-purple-400"
            >
              Get Started Free
            </Link>
          </div>

          <p className="mt-10 text-lg text-slate-400">
            New here?{" "}
            <Link
              href="/signup"
              className="text-purple-400 hover:text-purple-300 underline underline-offset-4"
            >
              Create account
            </Link>
          </p>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-10 h-10 text-purple-400/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Quick stats bar */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-purple-900/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          <div>
            <div className="text-5xl font-black text-purple-400">~2 min</div>
            <p className="mt-3 text-slate-400">Average wait in Addis</p>
          </div>
          <div>
            <div className="text-5xl font-black text-indigo-400">24/7</div>
            <p className="mt-3 text-slate-400">Non-stop rides</p>
          </div>
          <div>
            <div className="text-5xl font-black text-pink-400">4.9★</div>
            <p className="mt-3 text-slate-400">Driver rating</p>
          </div>
          <div>
            <div className="text-5xl font-black text-purple-400">Secure</div>
            <p className="mt-3 text-slate-400">Live tracking & SOS</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(139,92,246,0.12),transparent_40%)]" />

        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-300">
            Ride like you mean it
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="group relative bg-slate-900/60 backdrop-blur-xl border border-purple-900/30 rounded-3xl p-10 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-900/20">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center mb-8 shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-4">Pinpoint Pickup</h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                Real-time map shows your ride coming — no guesswork.
              </p>
            </div>

            <div className="group relative bg-slate-900/60 backdrop-blur-xl border border-purple-900/30 rounded-3xl p-10 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-900/20">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-600 to-purple-600 flex items-center justify-center mb-8 shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-4">Fast & Flexible</h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                Economy, comfort, or premium — pick your vibe, get it quick.
              </p>
            </div>

            <div className="group relative bg-slate-900/60 backdrop-blur-xl border border-purple-900/30 rounded-3xl p-10 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-900/20">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-pink-600 flex items-center justify-center mb-8 shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-4">Safety First</h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                Verified drivers, trip sharing, emergency button — ride
                worry-free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* App preview section */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-16 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
            One tap. Your city awaits.
          </h2>

          <div className="relative mx-auto max-w-md">
            {/* Phone frame */}
            <div className="relative aspect-[9/19] bg-black rounded-[3.5rem] shadow-2xl shadow-purple-900/50 border-[14px] border-slate-800 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/30177512/pexels-photo-30177512/free-photo-of-addis-ababa-skyline-at-sunset.jpeg"
                alt="Addis Ababa skyline at sunset"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-indigo-900/20 pointer-events-none" />
            </div>

            <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
        </div>
      </section>

      {/* Final CTA with Addis skyline */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/30177512/pexels-photo-30177512/free-photo-of-addis-ababa-skyline-at-sunset.jpeg"
            alt="Addis Ababa stunning skyline at sunset with modern buildings"
            className="absolute inset-0 w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-6">
          <h2 className="text-5xl md:text-7xl font-black mb-10">
            Addis. <span className="text-purple-400">Your ride.</span>
          </h2>
          <p className="text-2xl md:text-3xl text-slate-200 mb-12 max-w-3xl mx-auto">
            Join the pulse. Thousands moving smarter every day.
          </p>

          <Link
            href="/login"
            className="inline-flex items-center px-12 py-6 text-2xl font-bold rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all shadow-2xl shadow-purple-900/50 hover:shadow-purple-700/70 hover:scale-105"
          >
            Start Riding →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-500">
          <p className="text-lg">
            © 2026 RidePulse • Built for the streets of Addis Ababa
          </p>
          <div className="mt-6 flex justify-center gap-8">
            <Link
              href="/privacy"
              className="hover:text-purple-400 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-purple-400 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/support"
              className="hover:text-purple-400 transition-colors"
            >
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
