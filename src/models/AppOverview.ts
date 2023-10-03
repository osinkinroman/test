export interface AppOverviewData {
  appId: string;
  appName: string;
  appSources: AppSource[];
  category: string;
}

export interface AppOverviewDataTableItem extends AppOverviewData {
  id: number;
}

interface AppSource {
  name: string;
}
