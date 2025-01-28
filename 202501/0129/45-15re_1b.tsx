import React, { useState } from 'react';
import { Calendar, Clock, Music, AlarmClock, Settings, Book, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const MikuApp = () => {
  const [activeTab, setActiveTab] = useState('character');
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [alarms, setAlarms] = useState([
    { id: 1, time: '07:00', active: true, message: 'おはよう！今日も一緒に頑張ろう！' }
  ]);
  const [songs] = useState([
    { id: 1, title: 'メルト', duration: '4:20' },
    { id: 2, title: 'ワールドイズマイン', duration: '4:15' },
    { id: 3, title: '千本桜', duration: '4:00' }
  ]);

  const tabs = [
    { id: 'character', label: 'ミク', icon: Book },
    { id: 'schedule', label: 'スケジュール', icon: Calendar },
    { id: 'sing', label: 'うたう', icon: Music },
    { id: 'alarm', label: 'めざまし', icon: AlarmClock }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="relative bg-cyan-50 rounded-lg shadow-lg min-h-96">
        {/* ヘッダー: タブと設定 */}
        <div className="flex justify-between bg-cyan-200 rounded-t-lg">
          <div className="flex">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`px-4 py-3 flex items-center gap-2 transition-colors
                  ${activeTab === tab.id ? 'bg-cyan-50' : 'bg-cyan-200 hover:bg-cyan-100'}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
          <button
            className="px-4 hover:bg-cyan-300 transition-colors"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="w-5 h-5" />
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
            </div>
          )}

          {/* うたう機能 */}
          {activeTab === 'sing' && (
            <div className="space-y-4">
              <Alert className="bg-cyan-100">
                <Music className="w-4 h-4" />
                <AlertTitle>うたう機能</AlertTitle>
                <AlertDescription>
                  お気に入りの曲を選んでね！
                </AlertDescription>
              </Alert>
              
              {songs.map(song => (
                <Card key={song.id} className="hover:bg-cyan-50 cursor-pointer">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Music className="w-5 h-5 text-cyan-600" />
                      <div>
                        <div className="font-medium">{song.title}</div>
                        <div className="text-sm text-gray-500">{song.duration}</div>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">
                      再生
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* めざまし機能 */}
          {activeTab === 'alarm' && (
            <div className="space-y-4">
              <Alert className="bg-cyan-100">
                <AlarmClock className="w-4 h-4" />
                <AlertTitle>めざまし設定</AlertTitle>
                <AlertDescription>
                  ミクが指定した時間に起こしてくれるよ！
                </AlertDescription>
              </Alert>

              {alarms.map(alarm => (
                <Card key={alarm.id} className="hover:bg-cyan-50">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlarmClock className="w-5 h-5 text-cyan-600" />
                      <div>
                        <div className="font-medium">{alarm.time}</div>
                        <div className="text-sm text-gray-500">{alarm.message}</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={alarm.active}
                        className="sr-only peer"
                        onChange={() => {
                          setAlarms(alarms.map(a =>
                            a.id === alarm.id ? { ...a, active: !a.active } : a
                          ));
                        }}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                    </label>
                  </CardContent>
                </Card>
              ))}

              <button className="w-full px-4 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 flex items-center justify-center gap-2">
                <Clock className="w-5 h-5" />
                新しいアラームを追加
              </button>
            </div>
          )}
        </div>

        {/* 設定パネル */}
        {showSettings && (
          <div className="absolute top-0 right-0 w-64 bg-white shadow-lg rounded-lg mt-16 mr-4">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">設定</h3>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>音声</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span>通知</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span>ダークモード</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MikuApp;