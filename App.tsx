import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AngleVisualizer } from './components/AngleVisualizer';
import { ShieldIcon, MindIcon } from './components/icons';

const useIntersectionObserver = (options: IntersectionObserverInit) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return [ref, isIntersecting] as const;
};

const Section: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const observerOptions = useMemo(() => ({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }), []);
  const [ref, isVisible] = useIntersectionObserver(observerOptions);

  return (
    <section
      ref={ref}
      className={`animated-section ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </section>
  );
};


const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] p-4 sm:p-8 md:p-16 selection:bg-blue-600 selection:text-white">
      <main className="max-w-5xl mx-auto">
        
        <header className="relative text-center py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-blue-500/5 rounded-full blur-3xl"></div>
          </div>
          <p className="font-lato text-base text-neutral-500 mb-4 tracking-wider">数学Ⅰ入門　課題用</p>
          <h1 className="font-lato text-5xl md:text-7xl text-[#1d1d1f] font-bold leading-tight tracking-tight">
            エスカレーターの角度
          </h1>
          <p className="mt-8 max-w-3xl mx-auto text-xl text-neutral-600 leading-relaxed">
            普段何気なく利用しているエスカレーター。でも、その角度がなぜほぼ全て一緒なのか、考えたことはありますか？その秘密を調べてみました。
          </p>
        </header>

        <Section className="mb-24 md:mb-32 text-center">
          <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto mb-6"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] mb-8">調べるきっかけ</h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed text-neutral-700">
            駅や商業施設、私たちの生活のいたるところにあるエスカレーター。そのエスカレーターに乗っていた時、ふと疑問が浮かびました。「なぜこの角度なんだろう？」そんな疑問をもとに、色々と調べてみました。
          </p>
        </Section>

        <Section className="mb-24 md:mb-32 text-center">
          <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto mb-6"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] mb-8">角度の結論</h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed text-neutral-700">
            結論から言うと、建築基準法やJISなどで「30度」と定められていました。これは世界などでもよく使われる角度だそうです。ですが、なぜこの角度なのでしょうか。他の角度を交えて検証してみましょう。
          </p>
        </Section>

        <Section className="mb-24 md:mb-32">
          <div className="text-center">
            <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] mb-8">角度を変えて、見よう</h2>
            <p className="mb-12 text-lg max-w-3xl mx-auto leading-relaxed text-neutral-700">
              もしエスカレーターの角度が異なると、私たちの感覚はどう変わるのでしょうか？日本の法律で定められている角度を基準に、その違いを見てみましょう。
            </p>
          </div>
          <AngleVisualizer />
        </Section>
        
        <Section className="mb-24 md:mb-32">
           <div className="text-center">
              <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto mb-6"></div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] mb-10">30度が最適解である理由</h2>
              <div className="grid md:grid-cols-2 gap-12 md:gap-16 max-w-4xl mx-auto">
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6" aria-hidden="true">
                    <ShieldIcon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">安全の大事さ</h3>
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    もし、利用者が転倒してしまった場合、角度が緩やかな方が落下の衝撃は少なくなります。45度のような急勾配では、落下に加え、ドミノ倒しのような大きな事故になってしまうかも。なので、30度は安全性を確保するための重要な基準なのです。
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                   <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6" aria-hidden="true">
                    <MindIcon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">恐怖を取り除く</h3>
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    安全であることはもちろん、利用者が恐怖を感じないことも大切です。特に高い場所では、急な角度は視界からのプレッシャーや、緊張感を与えてしまいます。30度は、多くの人が「これなら安心」と感じられる、心の安全を確保した角度と言えるんです。
                  </p>
                </div>
              </div>
           </div>
        </Section>

        <Section className="text-center">
          <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto mb-6"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] mb-8">最後に</h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed text-neutral-700">
            調べた結果、エスカレーターの「30度」という角度は、安全性と利用者の心という二つの側面から深く考えられた、優れた設計であることがわかりました。普段当たり前に受け入れている物事にも、きちんとした理由がある。そう考えると、日常が少し面白く見えてきました。
          </p>
        </Section>

      </main>
    </div>
  );
};

export default App;
