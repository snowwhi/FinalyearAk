
const InfoSidebar = () => {
  const infoItems = [
    { icon: 'ri-phone-line', label: 'Phone', value: '+92 453 000 0000' },
    { icon: 'ri-mail-line', label: 'Email', value: 'info@tub.edu.pk' },
    { icon: 'ri-map-pin-line', label: 'Address', value: 'Thal University Bhakkar,\nPunjab, Pakistan' },
  ];

  const socials = [
    { icon: 'ri-facebook-circle-fill', url: 'https://www.facebook.com/tu.bhakkar/' },
    { icon: 'ri-twitter-x-fill', url: 'https://x.com/tu_bhakkar' },
    { icon: 'ri-linkedin-box-fill', url: 'https://www.linkedin.com/school/tubhakkar/' }
  ];

  return (
    <>
      <div className="bg-slate-50 border-t md:border-t-0 md:border-l border-slate-100 px-8 py-12 flex flex-col">
        <h3 className="cinzel text-slate-800 font-semibold text-base mb-1">
          Contact Info
        </h3>
        <div className="w-6 h-[2px] rounded-full bg-amber-500 mb-6" />

        <div className="flex flex-col flex-1 divide-y divide-slate-100">
          {infoItems.map(({ icon, label, value }) => (
            <div key={label} className="flex items-start gap-3 py-4">
              <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                <i className={`${icon} text-amber-500 text-sm`} />
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wide mb-0.5">{label}</p>
                <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-5 border-t border-slate-100 mt-2">
          <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wide mb-3">Follow Us</p>
          <div className="flex gap-2">
            {socials.map((s) => (
              <a
                key={s.icon}
                href={s.url}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 text-sm hover:border-amber-500 hover:text-amber-500 hover:bg-amber-50 transition-all duration-200"
              >
                <i className={s.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default InfoSidebar