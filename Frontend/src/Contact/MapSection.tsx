
const Map = () => {
  return (
    <section className="pt-4 pb-16 px-6 md:px-16 bg-white">
      <div className="max-w-5xl mx-auto">
        <h4 className="cinzel text-slate-900 font-bold text-2xl mb-1">Find Us</h4>
        <p className="text-slate-400 text-sm mb-8">
          Thal University Bhakkar — open Monday to Friday, 9 AM to 5 PM.
        </p>
        <div className="rounded-xl overflow-hidden border border-slate-100 shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54946.45855309894!2d71.99123!3d31.62689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393b85c8f9c3c36f%3A0x3f6d7a22db8d9e4b!2sBhakkar%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1680000000000"
            width="100%"
            height="420"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Thal University Bhakkar Location"
          />
        </div>
      </div>
    </section>
  )
}

export default Map