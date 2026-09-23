import Image from "next/image";

export default function Loading() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#060913]"
    >
      {/* Subtle ambient teal background halo */}
      <div className="absolute w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] bg-[#00E5BE]/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />

      <div className="relative flex flex-col items-center space-y-7 z-10">
        {/* Centered Minimal Brand Circle */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
          {/* Luminous Pulsing Perimeter Halo */}
          <div className="absolute -inset-2.5 rounded-full border border-[#00E5BE]/25 blur-[1.5px] animate-[pulse_2s_easeInOut_infinite]" />

          {/* Counter-rotating Tech Arc */}
          <div
            className="absolute -inset-1 rounded-full border-t border-r border-[#00E5BE]/60 animate-[spin_2.5s_linear_infinite]"
            style={{ animationDirection: "reverse" }}
          />

          {/* 3D Brand Circle Mark */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 animate-[pulse_2.2s_easeInOut_infinite]">
            <Image
              src="/brand-mark.png"
              alt="Tahseen AI"
              fill
              sizes="80px"
              className="object-contain drop-shadow-[0_0_20px_rgba(0,229,190,0.55)]"
              priority
            />
          </div>
        </div>

        {/* Minimal Loading Bar with Word 'LOADING' */}
        <div className="w-36 sm:w-44 flex flex-col items-center space-y-2">
          <div className="relative h-[2.5px] sm:h-[3px] w-full bg-white/[0.08] rounded-full overflow-hidden border border-white/[0.05]">
            <div className="h-full w-2/3 bg-gradient-to-r from-[#008688] via-[#00E5BE] to-[#26FFDF] rounded-full animate-pulse shadow-[0_0_10px_rgba(0,229,190,0.7)]" />
          </div>
          <div className="flex items-center justify-between w-full text-[10px] sm:text-[11px] font-mono tracking-widest text-[#00E5BE]/90 px-0.5">
            <span className="uppercase text-gray-400 font-medium tracking-[0.15em]">LOADING</span>
            <span className="font-semibold text-[#00E5BE]">...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
