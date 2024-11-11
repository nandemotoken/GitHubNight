import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const BadgeIcon = ({ type }) => {
  const iconProps = {
    className: "w-12 h-12 mx-auto mb-2",
    viewBox: "0 0 50 50",
  };

  const icons = {
    'グレーバッジ': (
      <svg {...iconProps}>
        <polygon points="25,5 45,25 25,45 5,25" fill="currentColor" />
        <circle cx="25" cy="25" r="5" fill="white" />
      </svg>
    ),
    'ブルーバッジ': (
      <svg {...iconProps}>
        <path d="M25,5 L45,25 L25,45 L5,25 Z" fill="currentColor" />
        <path d="M15,20 Q25,35 35,20" fill="none" stroke="white" strokeWidth="3" />
      </svg>
    ),
    'サンダーバッジ': (
      <svg {...iconProps}>
        <polygon points="25,5 35,25 25,45 15,25" fill="currentColor" />
        <path d="M20,15 L30,25 L20,35" fill="none" stroke="white" strokeWidth="3" />
      </svg>
    ),
    'レインボーバッジ': (
      <svg {...iconProps}>
        <circle cx="25" cy="25" r="20" fill="currentColor" />
        <path d="M15,25 C15,15 35,15 35,25" fill="none" stroke="white" strokeWidth="3" />
        <path d="M15,30 C15,20 35,20 35,30" fill="none" stroke="white" strokeWidth="3" />
      </svg>
    ),
    'ソウルバッジ': (
      <svg {...iconProps}>
        <path d="M25,5 L35,15 L35,35 L25,45 L15,35 L15,15 Z" fill="currentColor" />
        <circle cx="25" cy="25" r="5" fill="white" />
      </svg>
    ),
    'マーシュバッジ': (
      <svg {...iconProps}>
        <circle cx="25" cy="25" r="20" fill="currentColor" />
        <path d="M15,25 L35,25 M25,15 L25,35" stroke="white" strokeWidth="3" />
      </svg>
    ),
    'ボルケイノバッジ': (
      <svg {...iconProps}>
        <polygon points="25,5 40,20 35,45 15,45 10,20" fill="currentColor" />
        <path d="M20,15 Q25,5 30,15 Q35,25 25,35 Q15,25 20,15" fill="white" />
      </svg>
    ),
    'アースバッジ': (
      <svg {...iconProps}>
        <rect x="10" y="10" width="30" height="30" fill="currentColor" />
        <path d="M15,25 L35,25 M25,15 L25,35" stroke="white" strokeWidth="3" />
      </svg>
    ),
    // ジョウト地方のバッジ
    'ぜフィバッジ': (
      <svg {...iconProps}>
        <path d="M10,25 Q25,5 40,25 Q25,45 10,25" fill="currentColor" />
        <circle cx="25" cy="25" r="5" fill="white" />
      </svg>
    ),
    'ハイブバッジ': (
      <svg {...iconProps}>
        <polygon points="25,5 45,25 25,45 5,25" fill="currentColor" />
        <circle cx="25" cy="25" r="8" fill="white" />
        <circle cx="25" cy="25" r="3" fill="currentColor" />
      </svg>
    ),
    'プレーンバッジ': (
      <svg {...iconProps}>
        <circle cx="25" cy="25" r="20" fill="currentColor" />
        <rect x="15" y="15" width="20" height="20" fill="white" />
      </svg>
    ),
    'フォグバッジ': (
      <svg {...iconProps}>
        <path d="M15,15 Q25,5 35,15 Q45,25 35,35 Q25,45 15,35 Q5,25 15,15" fill="currentColor" />
        <circle cx="25" cy="25" r="5" fill="white" />
      </svg>
    ),
    'ストームバッジ': (
      <svg {...iconProps}>
        <path d="M25,5 L40,20 L40,30 L25,45 L10,30 L10,20 Z" fill="currentColor" />
        <path d="M20,20 L30,30 M30,20 L20,30" stroke="white" strokeWidth="3" />
      </svg>
    ),
    // 他のバッジも同様に追加...
  };

  return icons[type] || (
    <svg {...iconProps}>
      <circle cx="25" cy="25" r="20" fill="currentColor" />
    </svg>
  );
};

const PokemonBadges = () => {
  const [selectedBadge, setSelectedBadge] = useState(null);

  const badges = {
    'カントー': [
      { name: 'グレーバッジ', gym: 'ニビジム', leader: 'タケシ', type: 'いわ' },
      { name: 'ブルーバッジ', gym: 'ハナダジム', leader: 'カスミ', type: 'みず' },
      { name: 'サンダーバッジ', gym: 'クチバジム', leader: 'マチス', type: 'でんき' },
      { name: 'レインボーバッジ', gym: 'タマムシジム', leader: 'エリカ', type: 'くさ' },
      { name: 'ソウルバッジ', gym: 'サファリジム', leader: 'キョウ', type: 'どく' },
      { name: 'マーシュバッジ', gym: 'ヤマブキジム', leader: 'ナツメ', type: 'エスパー' },
      { name: 'ボルケイノバッジ', gym: 'グレンジム', leader: 'カツラ', type: 'ほのお' },
      { name: 'アースバッジ', gym: 'トキワジム', leader: 'サカキ', type: 'じめん' }
    ],
    'ジョウト': [
      { name: 'ぜフィバッジ', gym: 'キキョウジム', leader: 'ハヤト', type: 'ひこう' },
      { name: 'ハイブバッジ', gym: 'ヒワダジム', leader: 'ツクシ', type: 'むし' },
      { name: 'プレーンバッジ', gym: 'コガネジム', leader: 'アカネ', type: 'ノーマル' },
      { name: 'フォグバッジ', gym: 'エンジュジム', leader: 'マツバ', type: 'ゴースト' },
      { name: 'ストームバッジ', gym: 'タツツジム', leader: 'イブキ', type: 'ドラゴン' },
      { name: 'ミネラルバッジ', gym: 'チョウジジム', leader: 'ミカン', type: 'はがね' },
      { name: 'グレイシャーバッジ', gym: 'アサギジム', leader: 'ヤナギ', type: 'こおり' },
      { name: 'ライジングバッジ', gym: 'フスベジム', leader: 'シバ', type: 'かくとう' }
    ],
    'ホウエン': [
      { name: 'ストーンバッジ', gym: 'トウカジム', leader: 'ツツジ', type: 'いわ' },
      { name: 'ナックルバッジ', gym: 'ムロジム', leader: 'マキシ', type: 'かくとう' },
      { name: 'ダイナモバッジ', gym: 'キンセツジム', leader: 'テッセン', type: 'でんき' },
      { name: 'ヒートバッジ', gym: 'ムロタウンジム', leader: 'アスナ', type: 'ほのお' },
      { name: 'バランスバッジ', gym: 'トバリジム', leader: 'センリ', type: 'ノーマル' },
      { name: 'フェザーバッジ', gym: 'ハジツゲジム', leader: 'ナギ', type: 'ひこう' },
      { name: 'マインドバッジ', gym: 'ミナモジム', leader: 'ミロ', type: 'エスパー' },
      { name: 'レインバッジ', gym: 'ソウセツジム', leader: 'ルリ', type: 'みず' }
    ]
  };

  const colorByType = {
    'いわ': 'bg-stone-200 text-stone-700',
    'みず': 'bg-blue-200 text-blue-700',
    'でんき': 'bg-yellow-200 text-yellow-700',
    'くさ': 'bg-green-200 text-green-700',
    'どく': 'bg-purple-200 text-purple-700',
    'エスパー': 'bg-pink-200 text-pink-700',
    'ほのお': 'bg-red-200 text-red-700',
    'じめん': 'bg-amber-200 text-amber-700',
    'ひこう': 'bg-sky-200 text-sky-700',
    'むし': 'bg-lime-200 text-lime-700',
    'ノーマル': 'bg-gray-200 text-gray-700',
    'ゴースト': 'bg-indigo-200 text-indigo-700',
    'ドラゴン': 'bg-violet-200 text-violet-700',
    'はがね': 'bg-zinc-200 text-zinc-700',
    'こおり': 'bg-cyan-200 text-cyan-700',
    'かくとう': 'bg-orange-200 text-orange-700'
  };

  return (
    <Card className="w-full max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">ポケモンジムバッジ図鑑</h1>
      <Tabs defaultValue="カントー">
        <TabsList className="w-full justify-center mb-6">
          {Object.keys(badges).map((region) => (
            <TabsTrigger key={region} value={region} className="px-6">
              {region}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.entries(badges).map(([region, regionBadges]) => (
          <TabsContent key={region} value={region}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {regionBadges.map((badge) => (
                <div
                  key={badge.name}
                  className={`${colorByType[badge.type]} p-4 rounded-lg cursor-pointer transition-all hover:scale-105`}
                  onMouseEnter={() => setSelectedBadge(badge)}
                  onMouseLeave={() => setSelectedBadge(null)}
                >
                  <BadgeIcon type={badge.name} />
                  <h3 className="font-bold text-lg mb-2 text-center">{badge.name}</h3>
                  {selectedBadge?.name === badge.name && (
                    <div className="text-sm">
                      <p>ジム: {badge.gym}</p>
                      <p>ジムリーダー: {badge.leader}</p>
                      <p>タイプ: {badge.type}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
};

export default PokemonBadges;