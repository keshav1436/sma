export const event = 'Tech Policy Change 2026'

export const summary = {
  totalPosts: 184320,
  peakActivityTime: '14:00',
  primarySentiment: 'negative',
}

export const sentimentTimeline = [
  { time: '08:00', positive: 420, negative: 380, neutral: 610 },
  { time: '09:00', positive: 610, negative: 720, neutral: 890 },
  { time: '10:00', positive: 980, negative: 1450, neutral: 1120 },
  { time: '11:00', positive: 1340, negative: 2380, neutral: 1560 },
  { time: '12:00', positive: 1780, negative: 3620, neutral: 1980 },
  { time: '13:00', positive: 2210, negative: 5140, neutral: 2340 },
  { time: '14:00', positive: 2890, negative: 7460, neutral: 2810 },
  { time: '15:00', positive: 2540, negative: 6980, neutral: 2670 },
  { time: '16:00', positive: 2110, negative: 5720, neutral: 2390 },
  { time: '17:00', positive: 1680, negative: 4310, neutral: 2020 },
  { time: '18:00', positive: 1290, negative: 3050, neutral: 1710 },
  { time: '19:00', positive: 940, negative: 2180, neutral: 1340 },
  { time: '20:00', positive: 710, negative: 1560, neutral: 1080 },
]

export const ageGroups = [
  { group: '18-25', percentage: 34 },
  { group: '26-35', percentage: 41 },
  { group: '36-50', percentage: 25 },
]

export const topRegions = [
  { region: 'California, US', percentage: 22 },
  { region: 'London, UK', percentage: 15 },
  { region: 'Ontario, Canada', percentage: 11 },
]

export const trendingKeywords = [
  { keyword: '#TechPolicy2026', volume: 48210 },
  { keyword: 'dataPrivacy', volume: 36540 },
  { keyword: 'AIRegulation', volume: 29870 },
  { keyword: 'bigTechCrackdown', volume: 21430 },
  { keyword: 'digitalRights', volume: 15680 },
]

export const networkNodes = [
  { id: 'influencer_1', name: '@techjournalist_maya', followers: 892000, influenceScore: 94 },
  { id: 'influencer_2', name: '@policywatchdog', followers: 654000, influenceScore: 89 },
  { id: 'influencer_3', name: '@siliconvalleyinsider', followers: 1120000, influenceScore: 97 },
  { id: 'influencer_4', name: '@digitalrightsnow', followers: 430000, influenceScore: 81 },
]

export const networkEdges = [
  { source: 'influencer_3', target: 'influencer_1', interactionType: 'retweet', weight: 1240 },
  { source: 'influencer_3', target: 'influencer_2', interactionType: 'quote', weight: 980 },
  { source: 'influencer_1', target: 'influencer_4', interactionType: 'reply', weight: 560 },
  { source: 'influencer_2', target: 'influencer_4', interactionType: 'retweet', weight: 720 },
  { source: 'influencer_4', target: 'influencer_1', interactionType: 'mention', weight: 310 },
]
