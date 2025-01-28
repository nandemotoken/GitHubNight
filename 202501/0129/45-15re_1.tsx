import React, { useState } from 'react';
import { Calendar, Clock, Book } from 'lucide-react';

const MikuScheduleApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('character');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'ライブ練習', time: '13:00', completed: false },
    { id: 2, title: '作曲', time: '15:00', completed: false },
    { id: 3, title: 'ダンス練習', time: '17:00', completed: false },
  ]);

  const toggleNotebook = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* メインコンテナ */}
      <div className="relative bg-cyan-50 rounded-lg shadow-lg min-h-96">
        {/* タブヘッダー */}
        <div className="flex bg-cyan-200 rounded-t-lg">
          <button
            className={`px-6 py-3 ${activeTab === 'character' ? 'bg-cyan-50' : 'bg-cyan-200'}`}
            onClick={() => setActiveTab('character')}
          >
            ミク
          </button>
          <button
            className={`px-6 py-3 ${activeTab === 'schedule' ? 'bg-cyan-50' : 'bg-cyan-200'}`}
            onClick={() => setActiveTab('schedule')}
          >
            スケジュール
          </button>
        </div>

        {/* メインコンテンツ */}
        <div className="p-4">
          {/* キャラクタービュー */}
          {activeTab === 'character' && (
            <div className="flex flex-col items-center justify-center p-4">
              {/* ミクのSVGアニメーション */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" className="w-48 h-72">
                <path d="M70 80 Q40 120 50 200" stroke="#39c5bb" fill="none" strokeWidth="4">
                  <animate
                    attributeName="d"
                    dur="3s"
                    repeatCount="indefinite"
                    values="M70 80 Q40 120 50 200;M70 80 Q45 130 50 200;M70 80 Q40 120 50 200"
                  />
                </path>
                <path d="M130 80 Q160 120 150 200" stroke="#39c5bb" fill="none" strokeWidth="4">
                  <animate
                    attributeName="d"
                    dur="3s"
                    repeatCount="indefinite"
                    values="M130 80 Q160 120 150 200;M130 80 Q155 130 150 200;M130 80 Q160 120 150 200"
                  />
                </path>
                <circle cx="100" cy="80" r="30" fill="#ffffff" stroke="#000000" strokeWidth="2"/>
                <ellipse cx="85" cy="75" rx="5" ry="8" fill="#39c5bb">
                  <animate
                    attributeName="ry"
                    dur="4s"
                    repeatCount="indefinite"
                    values="8;2;8"
                  />
                </ellipse>
                <ellipse cx="115" cy="75" rx="5" ry="8" fill="#39c5bb">
                  <animate
                    attributeName="ry"
                    dur="4s"
                    repeatCount="indefinite"
                    values="8;2;8"
                  />
                </ellipse>
                <path d="M95 90 Q100 95 105 90" stroke="#000000" fill="none" strokeWidth="2"/>
              </svg>
              
              {/* スケジュール帳を開くボタン */}
              <button
                onClick={toggleNotebook}
                className="mt-4 px-6 py-3 bg-cyan-500 text-white rounded-lg flex items-center gap-2 hover:bg-cyan-600 transition-colors"
              >
                <Book className="w-5 h-5" />
                スケジュール帳を開く
              </button>
            </div>
          )}

          {/* スケジュールビュー */}
          {activeTab === 'schedule' && (
            <div className="space-y-4">
              {tasks.map(task => (
                <div
                  key={task.id}
                  className="bg-white p-3 rounded-lg flex items-center gap-2 shadow-sm"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => {
                      setTasks(tasks.map(t =>
                        t.id === task.id ? { ...t, completed: !t.completed } : t
                      ));
                    }}
                    className="w-4 h-4"
                  />
                  <Clock className="w-4 h-4 text-cyan-600" />
                  <span className="text-cyan-900">{task.time}</span>
                  <span className={task.completed ? 'line-through text-cyan-600' : 'text-cyan-900'}>
                    {task.title}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ノートブックオーバーレイ */}
        <div
          className={`absolute top-0 left-0 w-full h-full bg-white rounded-lg shadow-2xl transition-all duration-500 transform origin-left
            ${isOpen ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}
          style={{
            backgroundImage: 'linear-gradient(to right, #e5e5e5 1px, transparent 1px)',
            backgroundSize: '20px 100%'
          }}
        >
          {/* ノートブックの内容 */}
          <div className="h-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-cyan-800">ミクのスケジュール帳</h2>
              <button
                onClick={toggleNotebook}
                className="text-cyan-600 hover:text-cyan-800"
              >
                ✕
              </button>
            </div>
            
            {/* スケジュール内容 */}
            <div className="space-y-4">
              {tasks.map(task => (
                <div
                  key={task.id}
                  className="p-3 border-b border-cyan-100 flex items-center gap-2"
                >
                  <Clock className="w-4 h-4 text-cyan-600" />
                  <span className="text-cyan-900">{task.time}</span>
                  <span className="text-cyan-900">{task.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MikuScheduleApp;