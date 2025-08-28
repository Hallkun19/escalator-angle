import React, { useState, useMemo } from 'react';

type AngleOption = {
  angle: number;
  label: string;
  description: string;
};

const angleOptions: AngleOption[] = [
  {
    angle: 30,
    label: '30° (標準)',
    description: '30°の場合、辺の比が「1:√3:2」になるため、エスカレーターの長さは高さのちょうど2倍になります。設置には広いスペースが必要ですが、最も緩やかで安心感があります。',
  },
  {
    angle: 35,
    label: '35° (レア)',
    description: '30°と45°の中間の角度です。特別な辺の比はないため三角比で計算します。標準より省スペースで設置できるため、場所が限られた駅などで採用されることがあります。',
  },
  {
    angle: 45,
    label: '45° (仮想)',
    description: '45°の場合、辺の比が「1:1:√2」になるため、高さと水平距離が同じになり省スペースです。しかし、長さは高さの約1.4倍で済みますが、急で恐怖感があり安全上の理由から実際には使われません。',
  },
];

const FIXED_HEIGHT = 5; // 5メートルの階を想定

export const MathVisualizer: React.FC = () => {
  const [activeAngle, setActiveAngle] = useState<number>(30);

  const currentOption = angleOptions.find(opt => opt.angle === activeAngle) || angleOptions[0];

  const calculations = useMemo(() => {
    let horizontalDistance = 0;
    let escalatorLength = 0;
    
    if (activeAngle === 30) {
      // 1 : sqrt(3) : 2
      horizontalDistance = FIXED_HEIGHT * Math.sqrt(3);
      escalatorLength = FIXED_HEIGHT * 2;
    } else if (activeAngle === 45) {
      // 1 : 1 : sqrt(2)
      horizontalDistance = FIXED_HEIGHT;
      escalatorLength = FIXED_HEIGHT * Math.sqrt(2);
    } else if (activeAngle === 35) {
      // tan(θ) = 高さ / 水平距離  => 水平距離 = 高さ / tan(θ)
      horizontalDistance = FIXED_HEIGHT / Math.tan(activeAngle * Math.PI / 180);
      // sin(θ) = 高さ / 長さ => 長さ = 高さ / sin(θ)
      escalatorLength = FIXED_HEIGHT / Math.sin(activeAngle * Math.PI / 180);
    }

    return {
      horizontalDistance: horizontalDistance.toFixed(1),
      escalatorLength: escalatorLength.toFixed(1),
    };
  }, [activeAngle]);

  const CalculationExplanation: React.FC = () => {
    if (activeAngle === 30) {
      return (
        <p className="text-neutral-600">
          30°の直角三角形は、辺の比が <code className="font-mono text-sm bg-neutral-200/80 px-1 py-0.5 rounded">高さ : 水平距離 : 長さ = 1 : √3 : 2</code> となる特別な形だそうです。ですので、この比率を使って計算します。
        </p>
      );
    }
    if (activeAngle === 45) {
      return (
         <p className="text-neutral-600">
           45°の直角三角形は、辺の比が <code className="font-mono text-sm bg-neutral-200/80 px-1 py-0.5 rounded">高さ : 水平距離 : 長さ = 1 : 1 : √2</code> となる特別な形だそうです。ですので、この比率を使って計算します。
        </p>
      );
    }
    if (activeAngle === 35) {
      return (
         <div className="text-neutral-600 leading-relaxed">
          <p>35°は特別な比率を持たないため、三角比（tan, sin）を使って計算するそうです。</p>
          <div className="mt-2 space-y-1">
            <code className="font-mono text-sm bg-neutral-200/80 px-1 py-0.5 rounded block">水平距離 = 高さ ÷ tan(35°)</code>
            <code className="font-mono text-sm bg-neutral-200/80 px-1 py-0.5 rounded block">長さ = 高さ ÷ sin(35°)</code>
          </div>
        </div>
      );
    }
    return null;
  };


  return (
    <div className="bg-neutral-100/70 rounded-2xl p-8 md:p-12 transition-all duration-500">
      <div className="flex flex-col items-center">
        
        <p className="text-center text-lg mb-8 max-w-2xl mx-auto leading-relaxed text-neutral-700">
          もし高さ<strong>{FIXED_HEIGHT}m</strong>の階へエスカレーターを設置する場合、角度によって必要なスペースや、エスカレーター自体の長さはどう変わるのでしょうか？数学で調べてみたので、見てみましょう。
        </p>
        
        <div className="mb-10">
            <div className="bg-neutral-200/60 p-1 rounded-full flex items-center gap-1">
                {angleOptions.map(({ angle, label }) => {
                    return (
                      <button
                        key={angle}
                        onClick={() => setActiveAngle(angle)}
                        className={`px-5 py-2 text-base font-medium rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-100
                          ${
                            activeAngle === angle
                              ? `bg-white text-neutral-900 shadow-md`
                              : 'bg-transparent text-neutral-700 hover:bg-white/60'
                          }
                        `}
                      >
                        {label.split(' ')[0]}
                      </button>
                    );
                })}
            </div>
        </div>
        
        <div className="w-full bg-white/60 p-4 rounded-lg mb-8 text-center animate-fade-in" key={`desc-${activeAngle}`}>
            <h4 className="text-lg font-semibold text-neutral-800 mb-2">計算の考え方</h4>
            <CalculationExplanation />
        </div>


        <div className="w-full grid md:grid-cols-2 gap-8 text-center mb-8">
          <div className="bg-white/60 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-neutral-600 mb-2">必要な水平距離</h3>
            <p className="text-5xl font-bold font-lato text-blue-600 mb-2 tracking-tight">
              <span key={`h-${calculations.horizontalDistance}`} className="animate-fade-in">{calculations.horizontalDistance}</span>m
            </p>
          </div>
          <div className="bg-white/60 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-neutral-600 mb-2">エスカレーターの長さ</h3>
            <p className="text-5xl font-bold font-lato text-orange-500 mb-2 tracking-tight">
              <span key={`l-${calculations.escalatorLength}`} className="animate-fade-in">{calculations.escalatorLength}</span>m
            </p>
          </div>
        </div>

        <div className="text-center">
            <p key={currentOption.angle} className="text-neutral-600 leading-relaxed max-w-2xl mx-auto animate-fade-in">
              {currentOption.description}
            </p>
        </div>

      </div>
    </div>
  );
};
