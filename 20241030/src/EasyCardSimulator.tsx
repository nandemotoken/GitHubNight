import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Card {
  id: number;
  name: string;
  probability: number;
  rarity: 'N' | 'R' | 'SR' | 'SSR' | 'UR';
  color: string;
}

interface SimulationResult {
  pulls: number;
  success: boolean;
  cards: Card[];
}

const initialDeck: Card[] = [
  { id: 1, name: "URカード", probability: 1, rarity: 'UR', color: '#FFD700' },
  { id: 2, name: "SSRカード", probability: 3, rarity: 'SSR', color: '#FF69B4' },
  { id: 3, name: "SRカード", probability: 12, rarity: 'SR', color: '#4169E1' },
  { id: 4, name: "Rカード", probability: 34, rarity: 'R', color: '#32CD32' },
  { id: 5, name: "Nカード", probability: 50, rarity: 'N', color: '#808080' }
];

export const EasyCardSimulator: React.FC = () => {
  const [deck, setDeck] = useState<Card[]>(initialDeck);
  const [pulls, setPulls] = useState<number>(10);
  const [simulations, setSimulations] = useState<number>(1000);
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [targetCard, setTargetCard] = useState<string>("URカード");
  const [averagePulls, setAveragePulls] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [drawnCard, setDrawnCard] = useState<Card | null>(null);

  const simulateOnePull = (): Card => {
    const rand = Math.random() * 100;
    let cumulative = 0;
    
    for (const card of deck) {
      cumulative += card.probability;
      if (rand <= cumulative) {
        return card;
      }
    }
    return deck[deck.length - 1];
  };

  const runSimulation = useCallback(async () => {
    setIsAnimating(true);
    const newResults: SimulationResult[] = [];
    let totalPulls = 0;

    for (let i = 0; i < simulations; i++) {
      let currentPulls = 0;
      let found = false;
      const drawnCards: Card[] = [];

      while (!found && currentPulls < pulls) {
        const card = simulateOnePull();
        drawnCards.push(card);
        if (card.name === targetCard) {
          found = true;
        }
        currentPulls++;
      }

      if (found) {
        totalPulls += currentPulls;
      }

      newResults.push({
        pulls: currentPulls,
        success: found,
        cards: drawnCards
      });
    }

    setResults(newResults);
    setAveragePulls(totalPulls / simulations);
    setIsAnimating(false);
  }, [deck, pulls, simulations, targetCard]);

  const handleCardClick = async (card: Card) => {
    setIsAnimating(true);
    setTargetCard(card.name);
    const drawnResult = simulateOnePull();
    setDrawnCard(drawnResult);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAnimating(false);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        カードガチャシミュレーター
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {deck.map(card => (
          <motion.div
            key={card.id}
            className="relative cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCardClick(card)}
          >
            <div
              className="w-full aspect-[2/3] rounded-xl shadow-lg flex flex-col items-center justify-center p-4"
              style={{
                background: `linear-gradient(135deg, ${card.color}22, ${card.color}66)`,
                border: `2px solid ${card.color}`
              }}
            >
              {/* <span className="text-2xl font-bold mb-2">{card.rarity}</span> */}
              <span className="text-lg">{card.name}</span>
              <span className="mt-2 text-sm">{card.probability}%</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2">1パックのカード数：</label>
            <input
              type="number"
              value={pulls}
              onChange={(e) => setPulls(Number(e.target.value))}
              className="border rounded p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 mb-2">シミュレーション精度のための試行回数：</label>
            <input
              type="number"
              value={simulations}
              onChange={(e) => setSimulations(Number(e.target.value))}
              className="border rounded p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 mb-2">目標カード：</label>
            <select
              value={targetCard}
              onChange={(e) => setTargetCard(e.target.value)}
              className="border rounded p-2"
            >
              {deck.map(card => (
                <option key={card.id} value={card.name}>
                  {card.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={runSimulation}
          disabled={isAnimating}
          className="w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
        >
          {isAnimating ? '計算中...' : 'シミュレーション実行'}
        </button>
      </div>

      {/* {drawnCard && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
        >
          <div
            className="w-64 aspect-[2/3] rounded-xl shadow-xl flex flex-col items-center justify-center p-4"
            style={{
              background: `linear-gradient(135deg, ${drawnCard.color}44, ${drawnCard.color}88)`,
              border: `3px solid ${drawnCard.color}`
            }}
          >
            <span className="text-4xl font-bold mb-4">{drawnCard.rarity}</span>
            <span className="text-2xl">{drawnCard.name}</span>
          </div>
        </motion.div>
      )} */}

      {results.length > 0 && (
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">シミュレーション結果</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded">
              {/* <p className="text-lg">平均引き回数: {averagePulls.toFixed(2)}回</p> */}
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-lg">獲得確率: {
                ((results.filter(r => r.success).length / results.length) * 100).toFixed(2)
              }%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EasyCardSimulator;