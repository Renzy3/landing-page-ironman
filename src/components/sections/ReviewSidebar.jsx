import { Play } from 'lucide-react';
import { cn } from '../../lib/utils';

const reviews = [
  {
    score: '9.9',
    source: 'IGN',
    quote: '"Potential Game of the Year"',
    accent: 'text-arc-cyan border-arc-cyan/40 hover:border-arc-cyan hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]',
  },
  {
    score: '9.7',
    source: 'GamesRadar',
    quote: '"PlayStation\'s Masterpiece"',
    accent: 'text-stark-gold border-stark-gold/40 hover:border-stark-gold hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]',
  },
];

export function ReviewSidebar() {
  return (
    <div className="space-y-10 pl-0 lg:pl-8 xl:pl-12 w-full max-w-sm">
      {/* Game Reviews */}
      <div className="space-y-6">
        <h3 className="text-xs font-black tracking-[0.25em] text-white uppercase border-b border-white/10 pb-2.5 font-orbitron">
          GAME RATINGS
        </h3>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.source}
              className="flex items-center space-x-4 group cursor-pointer text-white p-2.5 rounded-lg border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300"
            >
              <div
                className={cn(
                  'relative w-12 h-12 flex items-center justify-center rounded-full border-2 bg-black/40 transition-all duration-500 font-orbitron group-hover:scale-105',
                  review.accent
                )}
              >
                <span className="font-black text-sm tracking-tighter">{review.score}</span>
              </div>
              <div className="group-hover:translate-x-1.5 transition-transform duration-300">
                <p className="font-black text-sm tracking-wider font-orbitron">{review.source}</p>
                <p className="text-xs text-white/50 italic font-rajdhani font-semibold mt-0.5">{review.quote}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Watch Trailer */}
      <div className="space-y-4">
        <h3 className="text-xs font-black tracking-[0.25em] text-white uppercase font-orbitron">
          WATCH TRAILER
        </h3>
        <div className="relative w-full aspect-video rounded-xl overflow-hidden group cursor-pointer border border-white/10 shadow-2xl hover:border-arc-cyan/40 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-all duration-500">
          <img
            src="/trailer-thumbnail.png"
            alt="Iron Man: Stark Tech Trailer Thumbnail"
            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-[1.06] transition-all duration-700"
            onError={(e) => {
              // Fallback if image not found or loaded incorrectly
              e.target.src = 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=640&auto=format&fit=crop';
            }}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

          {/* Holographic scanner laser */}
          <div className="absolute inset-x-0 h-[2px] bg-arc-cyan/40 shadow-[0_0_8px_#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none scan-line" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-xs border border-white/20 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-arc-cyan/20 group-hover:border-arc-cyan transition-all duration-500 play-btn-pulse">
              <Play
                className="w-5 h-5 text-arc-cyan ml-0.5 transition-transform duration-300 group-hover:scale-110"
                fill="currentColor"
              />
            </div>
          </div>

          <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center z-10 pointer-events-none">
            <span className="font-rajdhani text-[11px] font-bold text-white/70 tracking-widest uppercase">STARK OVERVIEW</span>
            <span className="font-orbitron text-[10px] text-arc-cyan font-bold tracking-widest">2:47</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewSidebar;
