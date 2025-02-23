import React, { useState } from 'react';
import { Clock, Calendar, Dumbbell, Code, GamepadIcon, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const [activeModule, setActiveModule] = useState('schedule');

  const modules = [
    { id: 'alarm', icon: Bell, title: '目覚まし', color: 'text-red-500' },
    { id: 'schedule', icon: Calendar, title: 'スケジュール', color: 'text-blue-500' },
    { id: 'gaming', icon: GamepadIcon, title: 'ゲーム管理', color: 'text-purple-500' },
    { id: 'exercise', icon: Dumbbell, title: '運動記録', color: 'text-green-500' },
    { id: 'coding', icon: Code, title: '開発活動', color: 'text-yellow-500' }
  ];

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">生産性向上ダッシュボード</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>今日の目標と進捗</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>コーディング時間</span>
              <div className="w-64 h-2 bg-gray-200 rounded-full">
                <div className="w-3/4 h-full bg-blue-500 rounded-full"></div>
              </div>
              <span>3/4時間</span>
            </div>
            <div className="flex items-center justify-between">
              <span>運動時間</span>
              <div className="w-64 h-2 bg-gray-200 rounded-full">
                <div className="w-1/2 h-full bg-green-500 rounded-full"></div>
              </div>
              <span>30/60分</span>
            </div>
            <div className="flex items-center justify-between">
              <span>ゲーム時間</span>
              <div className="w-64 h-2 bg-gray-200 rounded-full">
                <div className="w-full h-full bg-red-500 rounded-full"></div>
              </div>
              <span>2/2時間</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>次の予定</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>15:00 - システム開発</span>
              </div>
              <div className="flex items-center">
                <Dumbbell className="w-4 h-4 mr-2" />
                <span>17:00 - ワークアウト</span>
              </div>
              <div className="flex items-center">
                <GamepadIcon className="w-4 h-4 mr-2" />
                <span>19:00 - ゲーム時間</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>週間サマリー</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>開発目標達成率: 85%</p>
              <p>運動目標達成率: 70%</p>
              <p>ゲーム時間遵守率: 90%</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;