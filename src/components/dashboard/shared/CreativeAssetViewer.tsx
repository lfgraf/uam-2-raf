import { Card } from '@/components/ui/Card';
import { FileText, Image as ImageIcon, Video } from 'lucide-react';

interface CreativeAsset {
  type: 'image' | 'video' | 'text';
  url?: string;
  content?: string;
  name: string;
}

interface CreativeAssetViewerProps {
  assets: CreativeAsset[];
}

export function CreativeAssetViewer({ assets }: CreativeAssetViewerProps) {
  if (assets.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center text-gray-600 dark:text-graphite-500">
          No creative assets available
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-graphite-100">
        Creative Assets
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {assets.map((asset, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center gap-3 mb-3">
              {asset.type === 'image' && <ImageIcon className="w-5 h-5 text-acid" />}
              {asset.type === 'video' && <Video className="w-5 h-5 text-acid" />}
              {asset.type === 'text' && <FileText className="w-5 h-5 text-acid" />}
              <span className="text-sm font-medium text-gray-900 dark:text-graphite-100">
                {asset.name}
              </span>
            </div>

            {asset.type === 'image' && asset.url && (
              <img
                src={asset.url}
                alt={asset.name}
                className="w-full h-32 object-cover rounded-lg"
              />
            )}

            {asset.type === 'video' && asset.url && (
              <video
                src={asset.url}
                className="w-full h-32 rounded-lg"
                controls
              />
            )}

            {asset.type === 'text' && asset.content && (
              <div className="text-sm text-gray-700 dark:text-graphite-300 p-3 bg-gray-50 dark:bg-graphite-850 rounded">
                {asset.content}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}