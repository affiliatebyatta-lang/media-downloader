/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DownloadOption {
  quality: string; // e.g., 'HD Video', 'SD Video', 'Original Image', 'GIF'
  url: string;
  type: string; // e.g., 'video/mp4', 'image/jpeg', 'image/gif'
  resolution?: string;
}

export interface MediaMetadata {
  success: boolean;
  title: string;
  thumbnail: string;
  downloads: DownloadOption[];
  sourceUrl: string;
  description?: string;
  mediaType: 'video' | 'image' | 'gif';
}

export interface RecentDownload {
  id: string;
  title: string;
  thumbnail: string;
  sourceUrl: string;
  timestamp: number;
  mediaType: 'video' | 'image' | 'gif';
  downloads: DownloadOption[];
}
