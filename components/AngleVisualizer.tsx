import React, { useState } from 'react';

type AngleOption = {
  angle: number;
  label: string;
  description: string;
  color: string;
};

const angleOptions: AngleOption[] = [
  {
    angle: 30,
    label: '30° (標準)',
    description: '日本の建築基準法で定められている標準的な角度です。安全性、輸送効率、そして利用者の心理的な安心感のバランスが最も優れており、世界中で広く採用されています。',
    color: 'blue',
  },
  {
    angle: 35,
    label: '35° (レア)',
    description: '高さ6m以下など、特定の条件下でのみ設置が認められる角度。スペースが限られた都市部の駅などで見られる、少し珍しいケースです。',
    color: 'orange',
  },
  {
    angle: 45,
    label: '45° (危険)',
    description: '比較のために用意した仮想の角度です。実際にこの角度で設置されることはありません。急すぎて非常に危険で、万が一の事故が起きた場合、被害が大きくなってしまうからです。',
    color: 'red',
  },
];

const colorConfig = {
    blue: {
        text: 'text-blue-600',
        bg: 'bg-blue-600',
    },
    orange: {
        text: 'text-orange-500',
        bg: 'bg-orange-500',
    },
    red: {
        text: 'text-red-600',
        bg: 'bg-red-600',
    },
};
type ColorKey = keyof typeof colorConfig;

const gridBackgroundStyle = {
    backgroundSize: '20px 20px',
    backgroundImage: `
        linear-gradient(to right, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 1px, transparent 1px)
    `,
};


export const AngleVisualizer: React.FC = () => {
  const [activeAngle, setActiveAngle] = useState<number>(30);

  const currentOption = angleOptions.find(opt => opt.angle === activeAngle) || angleOptions[0];
  const theme = colorConfig[currentOption.color as ColorKey];

  const escalatorHeight = 150; 
  const escalatorBaseWidth = escalatorHeight / Math.tan(activeAngle * (Math.PI / 180));
  const escalatorHypotenuse = Math.sqrt(escalatorHeight ** 2 + escalatorBaseWidth ** 2);

  const radius = 60;
  const angleRad = (activeAngle * Math.PI) / 180;
  const arcEndX = radius * Math.cos(angleRad);
  const arcEndY = radius * Math.sin(angleRad);
  const pathD = `M ${radius} 0 A ${radius} ${radius} 0 0 1 ${arcEndX} ${arcEndY}`;

  const textAngleRad = (activeAngle / 2) * (Math.PI / 180);
  const textRadius = 50; 
  const textX = textRadius * Math.cos(textAngleRad);
  const textY = textRadius * Math.sin(textAngleRad);


  return (
    <div className={`bg-neutral-100/70 rounded-2xl p-8 md:p-12 transition-all duration-500`}>
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        {/* Visual Area */}
        <div 
            className="w-full lg:w-1/2 h-64 flex items-end justify-center p-4 rounded-lg bg-white/50"
            style={gridBackgroundStyle}
        >
            <div className="relative transition-all duration-700 ease-in-out" style={{ width: `${escalatorBaseWidth}px`, height: `${escalatorHeight}px` }}>
                <div className="absolute bottom-0 left-0 w-full h-px border-b border-dashed border-neutral-300"></div>
                <div className="absolute bottom-0 left-0 h-full w-px border-l border-dashed border-neutral-300"></div>
                <div 
                    className="absolute bottom-0 left-0 origin-bottom-left transition-transform duration-700 ease-in-out bg-neutral-300 rounded-sm"
                    style={{ 
                        width: `${escalatorHypotenuse}px`, 
                        height: '16px', 
                        transform: `rotate(-${activeAngle}deg)`,
                     }}
                ></div>
                <svg
                  className={`absolute bottom-0 left-0 overflow-visible ${theme.text} transition-colors duration-500`}
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  aria-hidden="true"
                >
                  <g transform="translate(0, 100) scale(1, -1)">
                    <path
                      d={pathD}
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.5"
                    />
                    <text
                      x={textX-10}
                      y={-textY}
                      transform="scale(1, -1)" 
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="currentColor"
                      className="text-lg font-bold font-lato"
                      style={{ transition: 'x 0.7s ease-in-out, y 0.7s ease-in-out' }}
                    >
                      {activeAngle}°
                    </text>
                  </g>
                </svg>
            </div>
        </div>

        {/* Controls and Info */}
        <div className="w-full lg:w-1/2">
          <div className="flex justify-center lg:justify-start mb-8">
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
                        {label}
                      </button>
                    );
                })}
            </div>
          </div>
          <div>
            <h3 className={`font-lato text-3xl font-semibold mb-3 ${theme.text} transition-colors duration-500`}>
              {currentOption.label}
            </h3>
            <p key={currentOption.angle} className="text-neutral-600 leading-relaxed min-h-[96px] animate-fade-in">
              {currentOption.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};