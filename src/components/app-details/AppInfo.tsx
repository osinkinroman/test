import React from 'react';
import { AppOverviewData } from '../../models/AppOverview';

interface Props {
  appData?: AppOverviewData;
}

export const AppInfo = (props: Props) => {
  const { appData } = props;
  return (
    <div className="flex flex-col">
      {appData ? (
        <div>
          <div>App name: {appData.appName}</div>
        </div>
      ) : null}
    </div>
  );
};
