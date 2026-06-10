"use client";

export default function MentalHealthPage() {
  return (
    <main className="min-h-screen bg-black pt-[20px] pb-10">

      {/* HERO */}

      <section className="max-w-[900px] mx-auto px-3 mb-0">

        <div className="overflow-hidden rounded-t-[18px] border border-white/10">

          <img
            src="/mental-health-main.png"
            alt="Mental Health Awareness"
            className="w-full h-auto object-cover"
          />

        </div>

      </section>

      {/* SUPPORT FORM */}

      <section className="max-w-[900px] mx-auto px-3 mb-0">

        <div
          className="
            border-x
            border-b
            border-white/10
            bg-[#050505]
            px-6
            py-8
          "
        >

          <div className="max-w-[700px] mx-auto">

            <h2
              className="
                text-center
                text-3xl
                md:text-4xl
                font-black
                uppercase
                text-white
                mb-3
              "
            >
              Reach Out To Us
            </h2>

            <p
              className="
                text-center
                text-white/70
                mb-8
              "
            >
              Need someone to talk to?
              You're not alone.
              Send us a message and we'll get back to you.
            </p>

            <form
              action="mailto:info@breezefamily.co.za"
              method="post"
              encType="text/plain"
              className="space-y-4"
            >

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="
                  w-full
                  bg-black
                  border
                  border-white/10
                  rounded-xl
                  px-4
                  py-4
                  text-white
                  focus:outline-none
                  focus:border-[#8DFF00]
                "
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="
                  w-full
                  bg-black
                  border
                  border-white/10
                  rounded-xl
                  px-4
                  py-4
                  text-white
                  focus:outline-none
                  focus:border-[#8DFF00]
                "
              />

              <textarea
                name="message"
                rows={6}
                placeholder="Tell us how you're feeling..."
                required
                className="
                  w-full
                  bg-black
                  border
                  border-white/10
                  rounded-xl
                  px-4
                  py-4
                  text-white
                  focus:outline-none
                  focus:border-[#8DFF00]
                "
              />

              <button
                type="submit"
                className="
                  w-full
                  h-[52px]
                  rounded-full
                  bg-[#8DFF00]
                  text-black
                  font-black
                  uppercase
                  tracking-[1px]
                  hover:scale-[1.02]
                  transition
                "
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </section>

      {/* IMMEDIATE HELP */}

      <section className="max-w-[900px] mx-auto px-3 mb-0">

        <div className="overflow-hidden border-x border-b border-white/10">

          <img
            src="/immediate-help.png"
            alt="Immediate Help"
            className="w-full h-auto object-cover"
          />

        </div>

      </section>

      {/* IT'S OKAY */}

      <section className="max-w-[900px] mx-auto px-3 mb-0">

        <div className="overflow-hidden border-x border-b border-white/10">

          <img
            src="/okay-not-okay.png"
            alt="It's Okay Not To Be Okay"
            className="w-full h-auto object-cover"
          />

        </div>

      </section>

      {/* FOOTER */}

      <section className="max-w-[900px] mx-auto px-3">

        <div className="overflow-hidden rounded-b-[18px] border-x border-b border-white/10">

          <img
            src="/mental-footer.png"
            alt="Breeze Family Mental Health"
            className="w-full h-auto object-cover"
          />

        </div>

      </section>

    </main>
  );
}