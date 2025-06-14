export interface Spot {
  id: string
  name: string
  category: 'park' | 'cafe' | 'center' | 'mall' | 'library' | 'other'
  address: string
  google_map_url: string | null
  target_age_min: number
  target_age_max: number
  indoor: boolean
  has_nursing_room: boolean
  has_diaper_space: boolean
  has_stroller_space: boolean
  has_kids_space: boolean
  has_sink: boolean
  has_diaper_trash: boolean
  opening_hours: string | null
  is_visible: boolean
  created_at: string
  updated_at: string
  firstImageUrl?: string
}

export interface SpotReview {
  id: string
  spot_id: string
  comment: string
  is_visible: boolean
  created_at: string
  spots?: { name: string }
}

export interface SpotImage {
  id: string
  spot_id: string
  file_path: string
  content_type: string
  file_size: number | null
  created_at: string
}

export const mockSpots: Spot[] = [
  {
    id: '1',
    name: '中央公園',
    category: 'park',
    address: '東京都渋谷区神南1-1-1',
    google_map_url: 'https://maps.google.com/?q=中央公園',
    target_age_min: 0,
    target_age_max: 12,
    indoor: false,
    has_nursing_room: false,
    has_diaper_space: true,
    has_stroller_space: true,
    has_kids_space: true,
    has_sink: true,
    has_diaper_trash: true,
    opening_hours: '6:00-22:00',
    is_visible: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    firstImageUrl: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    name: 'ママカフェ ひなた',
    category: 'cafe',
    address: '東京都新宿区西新宿2-2-2',
    google_map_url: 'https://maps.google.com/?q=ママカフェひなた',
    target_age_min: 0,
    target_age_max: 6,
    indoor: true,
    has_nursing_room: true,
    has_diaper_space: true,
    has_stroller_space: true,
    has_kids_space: true,
    has_sink: true,
    has_diaper_trash: true,
    opening_hours: '10:00-18:00',
    is_visible: true,
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z',
    firstImageUrl: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '3',
    name: '区立児童館',
    category: 'center',
    address: '東京都世田谷区三軒茶屋3-3-3',
    google_map_url: 'https://maps.google.com/?q=区立児童館',
    target_age_min: 0,
    target_age_max: 18,
    indoor: true,
    has_nursing_room: true,
    has_diaper_space: true,
    has_stroller_space: true,
    has_kids_space: true,
    has_sink: true,
    has_diaper_trash: true,
    opening_hours: '9:00-17:00',
    is_visible: true,
    created_at: '2024-01-03T00:00:00Z',
    updated_at: '2024-01-03T00:00:00Z',
    firstImageUrl: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '4',
    name: 'ファミリーモール',
    category: 'mall',
    address: '東京都港区六本木4-4-4',
    google_map_url: 'https://maps.google.com/?q=ファミリーモール',
    target_age_min: 0,
    target_age_max: 15,
    indoor: true,
    has_nursing_room: true,
    has_diaper_space: true,
    has_stroller_space: true,
    has_kids_space: true,
    has_sink: true,
    has_diaper_trash: true,
    opening_hours: '10:00-21:00',
    is_visible: true,
    created_at: '2024-01-04T00:00:00Z',
    updated_at: '2024-01-04T00:00:00Z',
    firstImageUrl: 'https://images.pexels.com/photos/264507/pexels-photo-264507.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '5',
    name: '市立図書館',
    category: 'library',
    address: '東京都品川区大崎5-5-5',
    google_map_url: 'https://maps.google.com/?q=市立図書館',
    target_age_min: 0,
    target_age_max: 18,
    indoor: true,
    has_nursing_room: false,
    has_diaper_space: true,
    has_stroller_space: true,
    has_kids_space: true,
    has_sink: false,
    has_diaper_trash: false,
    opening_hours: '9:00-20:00',
    is_visible: true,
    created_at: '2024-01-05T00:00:00Z',
    updated_at: '2024-01-05T00:00:00Z',
    firstImageUrl: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '6',
    name: 'みどりの広場',
    category: 'park',
    address: '東京都杉並区荻窪6-6-6',
    google_map_url: 'https://maps.google.com/?q=みどりの広場',
    target_age_min: 2,
    target_age_max: 10,
    indoor: false,
    has_nursing_room: false,
    has_diaper_space: false,
    has_stroller_space: false,
    has_kids_space: true,
    has_sink: false,
    has_diaper_trash: false,
    opening_hours: '24時間',
    is_visible: true,
    created_at: '2024-01-06T00:00:00Z',
    updated_at: '2024-01-06T00:00:00Z',
    firstImageUrl: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
]

export const mockReviews: SpotReview[] = [
  {
    id: '1',
    spot_id: '1',
    comment: '子供が楽しく遊べる素晴らしい公園です。設備も充実していて安心です。',
    is_visible: true,
    created_at: '2024-01-10T00:00:00Z',
    spots: { name: '中央公園' }
  },
  {
    id: '2',
    spot_id: '2',
    comment: 'ママ友とのランチに最適！授乳室もあって助かります。',
    is_visible: true,
    created_at: '2024-01-11T00:00:00Z',
    spots: { name: 'ママカフェ ひなた' }
  },
  {
    id: '3',
    spot_id: '1',
    comment: '遊具が新しくて安全性も高いです。おすすめです！',
    is_visible: true,
    created_at: '2024-01-12T00:00:00Z',
    spots: { name: '中央公園' }
  },
  {
    id: '4',
    spot_id: '3',
    comment: 'スタッフの方が親切で、子供も楽しそうでした。',
    is_visible: true,
    created_at: '2024-01-13T00:00:00Z',
    spots: { name: '区立児童館' }
  }
]

export const mockImages: SpotImage[] = [
  {
    id: '1',
    spot_id: '1',
    file_path: 'mock/park1.jpg',
    content_type: 'image/jpeg',
    file_size: 1024000,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    spot_id: '2',
    file_path: 'mock/cafe1.jpg',
    content_type: 'image/jpeg',
    file_size: 2048000,
    created_at: '2024-01-02T00:00:00Z'
  }
]

// Mock image URLs for display
export const mockImageUrls: Record<string, string> = {
  '1': 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800',
  '2': 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'
}