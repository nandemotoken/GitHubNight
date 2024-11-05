import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Music, Save } from 'lucide-react';

const SongCreator = () => {
  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [notes, setNotes] = useState('');
  
  const handleSave = () => {
    console.log('保存された歌:', { title, lyrics, notes });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="w-6 h-6" />
            歌作成ツール
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              タイトル
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="曲のタイトルを入力"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              歌詞
            </label>
            <Textarea
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              placeholder="歌詞を入力してください"
              className="w-full h-32"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              メロディー (ドレミで入力)
            </label>
            <Input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="例: ドレミファソラシド"
              className="w-full"
            />
          </div>

          <Button 
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            保存する
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SongCreator;