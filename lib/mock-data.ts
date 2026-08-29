export type SentimentPoint = { time: string; positive: number; negative: number; neutral: number }
export type AgeGroup = { group: string; percentage: number }
export type Region = { region: string; percentage: number }
export type Keyword = { keyword: string; volume: number }
export type NetworkNode = { id: string; name: string; followers: number; influenceScore: number }
export type NetworkEdge = {
  source: string
  target: string
  interactionType: 'retweet' | 'quote' | 'reply' | 'mention'
  weight: number
}

export type TopicSummary = {
  event: string
  totalPosts: number
  peakActivityTime: string
  growth: string
  sentimentLabel: string
  sentimentTone: 'negative' | 'positive' | 'default'
  sentimentDetail: string
  majorAudience: string
  majorAudienceDetail: string
  topInfluencer: string
  topInfluencerDetail: string
}

export type TopicDataset = {
  key: string
  hashtag: string
  summary: TopicSummary
  sentimentTimeline: SentimentPoint[]
  ageGroups: AgeGroup[]
  topRegions: Region[]
  trendingKeywords: Keyword[]
  networkNodes: NetworkNode[]
  networkEdges: NetworkEdge[]
}

const HOURS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
]

// Helper to build a 13-point hourly timeline from three shape arrays.
function timeline(positive: number[], negative: number[], neutral: number[]): SentimentPoint[] {
  return HOURS.map((time, i) => ({
    time,
    positive: positive[i],
    negative: negative[i],
    neutral: neutral[i],
  }))
}

// ---------------------------------------------------------------------------
// #StudentProtest — high negative/anxiety, very young (18-25) audience
// ---------------------------------------------------------------------------
const studentProtest: TopicDataset = {
  key: 'studentprotest',
  hashtag: '#StudentProtest',
  summary: {
    event: 'Student Protest Wave',
    totalPosts: 246980,
    peakActivityTime: '17:00',
    growth: '+512%',
    sentimentLabel: 'Anxious',
    sentimentTone: 'negative',
    sentimentDetail: '64% negative · 22% anxiety',
    majorAudience: '18 – 25',
    majorAudienceDetail: '61% of participants',
    topInfluencer: '@campus_voice',
    topInfluencerDetail: 'Score 96 · 780K reach',
  },
  sentimentTimeline: timeline(
    [320, 480, 720, 980, 1240, 1580, 1820, 2140, 2680, 3120, 3480, 2760, 1980],
    [680, 1120, 1980, 3240, 4780, 6320, 7480, 8360, 9240, 10120, 11480, 9260, 6840],
    [420, 640, 890, 1120, 1380, 1560, 1720, 1840, 1980, 2120, 2280, 1960, 1540],
  ),
  ageGroups: [
    { group: '18-25', percentage: 61 },
    { group: '26-35', percentage: 27 },
    { group: '36-50', percentage: 12 },
  ],
  topRegions: [
    { region: 'Delhi, IN', percentage: 28 },
    { region: 'Berlin, DE', percentage: 17 },
    { region: 'Santiago, CL', percentage: 13 },
  ],
  trendingKeywords: [
    { keyword: '#StudentProtest', volume: 68420 },
    { keyword: 'tuitionHike', volume: 41230 },
    { keyword: 'campusRights', volume: 33870 },
    { keyword: 'walkout', volume: 24560 },
    { keyword: 'studentUnion', volume: 18940 },
  ],
  networkNodes: [
    { id: 'influencer_1', name: '@campus_voice', followers: 780000, influenceScore: 96 },
    { id: 'influencer_2', name: '@student_union_intl', followers: 512000, influenceScore: 88 },
    { id: 'influencer_3', name: '@youth_frontline', followers: 634000, influenceScore: 91 },
    { id: 'influencer_4', name: '@edu_reform_now', followers: 298000, influenceScore: 79 },
  ],
  networkEdges: [
    { source: 'influencer_1', target: 'influencer_3', interactionType: 'retweet', weight: 1480 },
    { source: 'influencer_1', target: 'influencer_2', interactionType: 'quote', weight: 1120 },
    { source: 'influencer_3', target: 'influencer_4', interactionType: 'reply', weight: 640 },
    { source: 'influencer_2', target: 'influencer_4', interactionType: 'retweet', weight: 820 },
    { source: 'influencer_4', target: 'influencer_1', interactionType: 'mention', weight: 390 },
  ],
}

// ---------------------------------------------------------------------------
// #ElectionDebate — highly polarized (strong positive AND negative, low neutral)
// ---------------------------------------------------------------------------
const electionDebate: TopicDataset = {
  key: 'electiondebate',
  hashtag: '#ElectionDebate',
  summary: {
    event: 'National Election Debate',
    totalPosts: 421560,
    peakActivityTime: '21:00',
    growth: '+689%',
    sentimentLabel: 'Polarized',
    sentimentTone: 'default',
    sentimentDetail: '47% pos · 44% neg split',
    majorAudience: '36 – 50',
    majorAudienceDetail: '44% of participants',
    topInfluencer: '@political_pulse',
    topInfluencerDetail: 'Score 98 · 2.4M reach',
  },
  sentimentTimeline: timeline(
    [1840, 2360, 3120, 4280, 5640, 6980, 8240, 7860, 6540, 8920, 10240, 11680, 9840],
    [1760, 2280, 3040, 4180, 5520, 6840, 8120, 7720, 6420, 8760, 10080, 11520, 9680],
    [420, 560, 720, 940, 1180, 1420, 1680, 1580, 1320, 1720, 1980, 2240, 1860],
  ),
  ageGroups: [
    { group: '18-25', percentage: 19 },
    { group: '26-35', percentage: 37 },
    { group: '36-50', percentage: 44 },
  ],
  topRegions: [
    { region: 'Washington, US', percentage: 31 },
    { region: 'Texas, US', percentage: 19 },
    { region: 'Florida, US', percentage: 16 },
  ],
  trendingKeywords: [
    { keyword: '#ElectionDebate', volume: 92340 },
    { keyword: 'policyClash', volume: 61240 },
    { keyword: 'factCheck', volume: 54870 },
    { keyword: 'swingVoters', volume: 38210 },
    { keyword: 'townHall', volume: 29650 },
  ],
  networkNodes: [
    { id: 'influencer_1', name: '@political_pulse', followers: 2400000, influenceScore: 98 },
    { id: 'influencer_2', name: '@leftbloc_daily', followers: 1180000, influenceScore: 93 },
    { id: 'influencer_3', name: '@rightwing_report', followers: 1240000, influenceScore: 94 },
    { id: 'influencer_4', name: '@neutral_ballot', followers: 540000, influenceScore: 82 },
  ],
  networkEdges: [
    { source: 'influencer_1', target: 'influencer_2', interactionType: 'quote', weight: 2140 },
    { source: 'influencer_1', target: 'influencer_3', interactionType: 'quote', weight: 2080 },
    { source: 'influencer_2', target: 'influencer_3', interactionType: 'reply', weight: 1680 },
    { source: 'influencer_3', target: 'influencer_2', interactionType: 'reply', weight: 1620 },
    { source: 'influencer_4', target: 'influencer_1', interactionType: 'mention', weight: 720 },
  ],
}

// ---------------------------------------------------------------------------
// #TechPolicy2026 — negative lean, 26-35 core (the original dataset)
// ---------------------------------------------------------------------------
const techPolicy: TopicDataset = {
  key: 'techpolicy2026',
  hashtag: '#TechPolicy2026',
  summary: {
    event: 'Tech Policy Change 2026',
    totalPosts: 184320,
    peakActivityTime: '14:00',
    growth: '+342%',
    sentimentLabel: 'Negative',
    sentimentTone: 'negative',
    sentimentDetail: '58% of conversation',
    majorAudience: '26 – 35',
    majorAudienceDetail: '41% of participants',
    topInfluencer: '@siliconvalleyinsider',
    topInfluencerDetail: 'Score 97 · 1.12M reach',
  },
  sentimentTimeline: timeline(
    [420, 610, 980, 1340, 1780, 2210, 2890, 2540, 2110, 1680, 1290, 940, 710],
    [380, 720, 1450, 2380, 3620, 5140, 7460, 6980, 5720, 4310, 3050, 2180, 1560],
    [610, 890, 1120, 1560, 1980, 2340, 2810, 2670, 2390, 2020, 1710, 1340, 1080],
  ),
  ageGroups: [
    { group: '18-25', percentage: 34 },
    { group: '26-35', percentage: 41 },
    { group: '36-50', percentage: 25 },
  ],
  topRegions: [
    { region: 'California, US', percentage: 22 },
    { region: 'London, UK', percentage: 15 },
    { region: 'Ontario, Canada', percentage: 11 },
  ],
  trendingKeywords: [
    { keyword: '#TechPolicy2026', volume: 48210 },
    { keyword: 'dataPrivacy', volume: 36540 },
    { keyword: 'AIRegulation', volume: 29870 },
    { keyword: 'bigTechCrackdown', volume: 21430 },
    { keyword: 'digitalRights', volume: 15680 },
  ],
  networkNodes: [
    { id: 'influencer_1', name: '@techjournalist_maya', followers: 892000, influenceScore: 94 },
    { id: 'influencer_2', name: '@policywatchdog', followers: 654000, influenceScore: 89 },
    { id: 'influencer_3', name: '@siliconvalleyinsider', followers: 1120000, influenceScore: 97 },
    { id: 'influencer_4', name: '@digitalrightsnow', followers: 430000, influenceScore: 81 },
  ],
  networkEdges: [
    { source: 'influencer_3', target: 'influencer_1', interactionType: 'retweet', weight: 1240 },
    { source: 'influencer_3', target: 'influencer_2', interactionType: 'quote', weight: 980 },
    { source: 'influencer_1', target: 'influencer_4', interactionType: 'reply', weight: 560 },
    { source: 'influencer_2', target: 'influencer_4', interactionType: 'retweet', weight: 720 },
    { source: 'influencer_4', target: 'influencer_1', interactionType: 'mention', weight: 310 },
  ],
}

// ---------------------------------------------------------------------------
// #CyberFraudAlert — high panic/alert, sharp spike, broad age spread
// ---------------------------------------------------------------------------
const cyberFraud: TopicDataset = {
  key: 'cyberfraudalert',
  hashtag: '#CyberFraudAlert',
  summary: {
    event: 'Cyber Fraud Alert',
    totalPosts: 312740,
    peakActivityTime: '11:00',
    growth: '+874%',
    sentimentLabel: 'Panic',
    sentimentTone: 'negative',
    sentimentDetail: '71% negative · high alarm',
    majorAudience: '36 – 50',
    majorAudienceDetail: '39% of participants',
    topInfluencer: '@cyber_watchdog',
    topInfluencerDetail: 'Score 95 · 1.6M reach',
  },
  sentimentTimeline: timeline(
    [280, 420, 680, 920, 780, 640, 540, 460, 420, 380, 340, 300, 260],
    [1240, 3860, 8420, 11240, 9680, 8120, 6840, 5720, 4980, 4210, 3480, 2860, 2240],
    [340, 620, 980, 1240, 1120, 980, 860, 760, 680, 620, 560, 500, 440],
  ),
  ageGroups: [
    { group: '18-25', percentage: 26 },
    { group: '26-35', percentage: 35 },
    { group: '36-50', percentage: 39 },
  ],
  topRegions: [
    { region: 'Mumbai, IN', percentage: 24 },
    { region: 'Lagos, NG', percentage: 18 },
    { region: 'Manila, PH', percentage: 14 },
  ],
  trendingKeywords: [
    { keyword: '#CyberFraudAlert', volume: 81420 },
    { keyword: 'phishingScam', volume: 58730 },
    { keyword: 'bankAlert', volume: 47210 },
    { keyword: 'otpFraud', volume: 35680 },
    { keyword: 'dataBreach', volume: 27340 },
  ],
  networkNodes: [
    { id: 'influencer_1', name: '@cyber_watchdog', followers: 1600000, influenceScore: 95 },
    { id: 'influencer_2', name: '@fraud_alert_desk', followers: 940000, influenceScore: 90 },
    { id: 'influencer_3', name: '@infosec_daily', followers: 720000, influenceScore: 87 },
    { id: 'influencer_4', name: '@bank_safety_gov', followers: 1080000, influenceScore: 92 },
  ],
  networkEdges: [
    { source: 'influencer_1', target: 'influencer_2', interactionType: 'retweet', weight: 1980 },
    { source: 'influencer_4', target: 'influencer_1', interactionType: 'quote', weight: 1620 },
    { source: 'influencer_1', target: 'influencer_3', interactionType: 'reply', weight: 940 },
    { source: 'influencer_2', target: 'influencer_3', interactionType: 'retweet', weight: 1140 },
    { source: 'influencer_3', target: 'influencer_4', interactionType: 'mention', weight: 580 },
  ],
}

export const datasets: Record<string, TopicDataset> = {
  studentprotest: studentProtest,
  electiondebate: electionDebate,
  techpolicy2026: techPolicy,
  cyberfraudalert: cyberFraud,
}

export const trendingSearches = [
  '#StudentProtest',
  '#ElectionDebate',
  '#TechPolicy2026',
  '#CyberFraudAlert',
]

function normalizeKey(query: string) {
  return query.trim().toLowerCase().replace(/[#\s_-]/g, '')
}

// Fallback dataset for custom searches not in the 4 known topics.
function buildDefaultDataset(query: string): TopicDataset {
  const label = query.trim() || 'Custom Topic'
  const hashtag = label.startsWith('#') ? label : `#${label.replace(/\s+/g, '')}`
  return {
    key: 'default',
    hashtag,
    summary: {
      event: label,
      totalPosts: 94280,
      peakActivityTime: '13:00',
      growth: '+128%',
      sentimentLabel: 'Neutral',
      sentimentTone: 'default',
      sentimentDetail: '46% neutral · mixed',
      majorAudience: '26 – 35',
      majorAudienceDetail: '38% of participants',
      topInfluencer: '@trend_tracker',
      topInfluencerDetail: 'Score 84 · 460K reach',
    },
    sentimentTimeline: timeline(
      [480, 620, 780, 960, 1180, 1420, 1580, 1490, 1320, 1140, 960, 780, 620],
      [420, 560, 720, 900, 1120, 1360, 1520, 1440, 1280, 1100, 920, 740, 580],
      [640, 820, 1020, 1280, 1540, 1820, 2020, 1920, 1720, 1500, 1280, 1060, 860],
    ),
    ageGroups: [
      { group: '18-25', percentage: 31 },
      { group: '26-35', percentage: 38 },
      { group: '36-50', percentage: 31 },
    ],
    topRegions: [
      { region: 'New York, US', percentage: 19 },
      { region: 'Toronto, CA', percentage: 13 },
      { region: 'Sydney, AU', percentage: 10 },
    ],
    trendingKeywords: [
      { keyword: hashtag, volume: 32450 },
      { keyword: 'trending', volume: 24180 },
      { keyword: 'viral', volume: 19630 },
      { keyword: 'breaking', volume: 14270 },
      { keyword: 'update', volume: 9840 },
    ],
    networkNodes: [
      { id: 'influencer_1', name: '@trend_tracker', followers: 460000, influenceScore: 84 },
      { id: 'influencer_2', name: '@social_signal', followers: 380000, influenceScore: 80 },
      { id: 'influencer_3', name: '@buzz_monitor', followers: 520000, influenceScore: 86 },
      { id: 'influencer_4', name: '@pulse_report', followers: 240000, influenceScore: 74 },
    ],
    networkEdges: [
      { source: 'influencer_3', target: 'influencer_1', interactionType: 'retweet', weight: 840 },
      { source: 'influencer_3', target: 'influencer_2', interactionType: 'quote', weight: 620 },
      { source: 'influencer_1', target: 'influencer_4', interactionType: 'reply', weight: 380 },
      { source: 'influencer_2', target: 'influencer_4', interactionType: 'retweet', weight: 460 },
      { source: 'influencer_4', target: 'influencer_1', interactionType: 'mention', weight: 210 },
    ],
  }
}

export function getDataset(query: string): TopicDataset {
  return datasets[normalizeKey(query)] ?? buildDefaultDataset(query)
}
