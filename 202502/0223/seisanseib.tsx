import React, { useState } from 'react';
import { Clock, Calendar, Dumbbell, Code, Bell, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const [activeModule, setActiveModule] = useState('schedule');

  const modules = [
    { id: 'alarm', icon: Bell, title: '目覚まし', color: 'text-red-500' },
    { id: 'work', icon: Briefcase, title: '仕事', color: 'text-indigo-500' },
    { id: 'schedule', icon: Calendar, title: 'スケジュール', color: 'text-blue-500' },
    { id: 'development', icon: Code, title: '個人開発', color: 'text-yellow-500' },
    { id: 'exercise', icon: Dumbbell, title: '運動', color: 'text-green-500' },
    { id: 'game', icon: Bell, title: 'ゲーム', color: 'text-purple-500' } // Bellを一時的に使用
  ];

  const timeBlocks = [
    { time: '9:00-18:00', activity: '仕事', type: 'work', progress: 75 },
    { time: '18:30-19:00', activity: 'ポケモン', type: 'game', progress: 0 },
    { time: '19:00-20:00', activity: '運動', type: 'exercise', progress: 0 },
    { time: '20:30-22:00', activity: '個人開発', type: 'development', progress: 0 },
    { time: '22:00-22:30', activity: 'ゲーム', type: 'game', progress: 0 }
  ];

  const dailyTasks = [
    { category: 'ポケモン', tasks: ['デイリーチェックイン', 'レイドバトル'] },
    { category: '仕事', tasks: ['朝会', 'メール確認', '報告書作成'] },
    { category: '運動', tasks: ['ジョギング30分'] },
    { category: '開発', tasks: ['コード1時間'] }
  ];

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">1日の活動管理</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {modules.map((module) => {
            const IconComponent = module.icon;
            return (
              <Card 
                key={module.id}
                className={`cursor-pointer transition-all ${
                  activeModule === module.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setActiveModule(module.id)}
              >
                <CardContent className="p-4 text-center">
                  <IconComponent className={`w-8 h-8 mx-auto mb-2 ${module.color}`} />
                  <p className="text-sm font-medium">{module.title}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>今日のタイムライン</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timeBlocks.map((block, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{block.time}</span>
                    <span>{block.activity}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div 
                      className={`h-full rounded-full ${
                        block.type === 'work' ? 'bg-indigo-500' :
                        block.type === 'exercise' ? 'bg-green-500' :
                        block.type === 'development' ? 'bg-yellow-500' :
                        block.type === 'game' ? 'bg-purple-500' :
                        'bg-gray-400'
                      }`}
                      style={{ width: `${block.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>デイリータスク</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dailyTasks.map((category, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-medium">{category.category}</h3>
                  <div className="pl-4 space-y-1">
                    {category.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>活動バランス</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>仕事</span>
                <div className="w-40 h-2 bg-gray-200 rounded-full">
                  <div className="w-3/4 h-full bg-indigo-500 rounded-full"></div>
                </div>
                <span>6/8h</span>
              </div>
              <div className="flex items-center justify-between">
                <span>開発</span>
                <div className="w-40 h-2 bg-gray-200 rounded-full">
                  <div className="w-0 h-full bg-yellow-500 rounded-full"></div>
                </div>
                <span>0/1.5h</span>
              </div>
              <div className="flex items-center justify-between">
                <span>運動</span>
                <div className="w-40 h-2 bg-gray-200 rounded-full">
                  <div className="w-0 h-full bg-green-500 rounded-full"></div>
                </div>
                <span>0/1h</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>ゲーム</span>
                <div className="w-40 h-2 bg-gray-200 rounded-full">
                  <div className="w-1/2 h-full bg-purple-500 rounded-full"></div>
                </div>
                <span>0.5/1h</span>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">今日の達成</p>
                <div className="flex space-x-2">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                    ポケモンデイリー
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                    運動
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;