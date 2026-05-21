{/* LIVE BADGE */}
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-green-400/20 bg-green-500/10 backdrop-blur-md"
>

  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

  <p className="uppercase tracking-[4px] text-green-300 text-sm font-bold">

    LIVE NOW

  </p>

</motion.div>