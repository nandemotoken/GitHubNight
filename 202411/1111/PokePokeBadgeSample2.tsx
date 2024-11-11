import React, { useState } from 'react';
import { Badge, Clock, Map, User, Award } from 'lucide-react';

const PokedexBadges = () => {
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [obtainedBadges, setObtainedBadges] = useState({
    'カントー': new Set(['グレーバッジ', 'ブルーバッジ']),
    'ジョウト': new Set([]),
    'ホウエン': new Set([])
  });

  const badgeData = {
    'カントー': [
      { name: 'グレーバッジ', gym: 'ニビジム', leader: 'タケシ', type: 'いわ', location: 'ニビシティ', time: '2:00' },
      { name: 'ブルーバッジ', gym: 'ハナダジム', leader: 'カスミ', type: 'みず', location: 'ハナダシティ', time: '3:30' },
      { name: 'サンダーバッジ', gym: 'クチバジム', leader: 'マチス', type: 'でんき', location: 'クチバシティ', time: '4:15' },
      { name: 'レインボーバッジ', gym: 'タマムシジム', leader: 'エリカ', type: 'くさ', location: 'タマムシシティ', time: '5:45' },
      { name: 'ソウルバッジ', gym: 'サファリジム', leader: 'キョウ', type: 'どく', location: 'サファリゾーン', time: '6:30' }
    ]
  };

  const types = {
    'いわ': { color: 'bg-stone-600', lightColor: 'bg-stone-400' },
    'みず': { color: 'bg-blue-600', lightColor: 'bg-blue-400' },
    'でんき': { color: 'bg-yellow-500', lightColor: 'bg-yellow-300' },
    'くさ': { color: 'bg-green-600', lightColor: 'bg-green-400' },
    'どく': { color: 'bg-purple-600', lightColor: 'bg-purple-400' }
  };

  const toggleBadge = (region, badgeName) => {
    setObtainedBadges(prev => {
      const newObtained = new Set(prev[region]);
      if (newObtained.has(badgeName)) {
        newObtained.delete(badgeName);
      } else {
        newObtained.add(badgeName);
      }
      return { ...prev, [region]: newObtained };
    });
  };

  return (
    <div className="bg-red-600 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-red-700 rounded-lg shadow-2xl overflow-hidden">
        {/* ヘッダー部分 */}
        <div className="p-4 bg-red-800 text-white">
          <h1 className="text-2xl font-bold text-center mb-2">ポケモンジムバッジ図鑑</h1>
          <div className="flex justify-between text-sm">
            <span>登録数: {Object.values(obtainedBadges).reduce((acc, set) => acc + set.size, 0)}</span>
            <span>総数: {Object.values(badgeData).reduce((acc, arr) => acc + arr.length, 0)}</span>
          </div>
        </div>

        {/* メイン表示エリア */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {/* バッジリスト */}
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="space-y-2">
              {badgeData['カントー'].map(badge => {
                const isObtained = obtainedBadges['カントー'].has(badge.name);
                return (
                  <div
                    key={badge.name}
                    className={`
                      ${isObtained ? 'bg-slate-700' : 'bg-slate-900'} 
                      p-3 rounded-lg cursor-pointer
                      transition-all duration-300
                      hover:bg-slate-600
                      ${selectedBadge?.name === badge.name ? 'ring-2 ring-yellow-400' : ''}
                    `}
                    onClick={() => toggleBadge('カントー', badge.name)}
                    onMouseEnter={() => setSelectedBadge(badge)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${isObtained ? types[badge.type].color : 'bg-slate-800'}
                        transition-colors duration-300
                      `}>
                        <Badge className={`w-6 h-6 ${isObtained ? 'text-white' : 'text-gray-500'}`} />
                      </div>
                      <div className={`flex-1 ${isObtained ? 'text-white' : 'text-gray-500'}`}>
                        <div className="font-bold">{badge.name}</div>
                        <div className="text-sm">{badge.type}タイプ</div>
                      </div>
                      <div className={`
                        w-3 h-3 rounded-full
                        ${isObtained ? 'bg-green-500' : 'bg-gray-600'}
                      `} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 詳細表示エリア */}
          <div className="bg-slate-800 rounded-lg p-4">
            {selectedBadge ? (
              <div className="text-white space-y-4">
                <div className="flex justify-center mb-6">
                  <div className={`
                    w-24 h-24 rounded-full 
                    ${types[selectedBadge.type].color}
                    flex items-center justify-center
                    shadow-lg
                  `}>
                    <Badge className="w-12 h-12 text-white" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-center mb-4">{selectedBadge.name}</h2>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Map className="w-5 h-5 text-gray-400" />
                    <span>{selectedBadge.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-gray-400" />
                    <span>{selectedBadge.leader}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span>クリアタイム: {selectedBadge.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-gray-400" />
                    <span>{selectedBadge.type}タイプ</span>
                  </div>
                </div>

                <div className={`
                  mt-4 p-2 rounded-lg text-center
                  ${obtainedBadges['カントー'].has(selectedBadge.name) 
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-300'}
                `}>
                  {obtainedBadges['カントー'].has(selectedBadge.name) 
                    ? '獲得済み'
                    : '未獲得'}
                </div>
              </div>
            ) : (
              <div className="text-gray-400 text-center py-20">
                バッジを選択してください
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokedexBadges;