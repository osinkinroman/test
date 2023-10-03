import React from 'react';
import { API } from '../../api/api';
import { AppOverviewData } from '../../models/AppOverview';
import axios from 'axios';
import { AppInfo } from './AppInfo';
import { User } from '../../models/User';
import { UsersInfo } from './UsersInfo';

interface Props {
  appId: number;
}

export const AppOverview = (props: Props) => {
  const { appId } = props;

  const [appData, setAppData] = React.useState<AppOverviewData>();
  const [usersData, setUsersData] = React.useState<User[]>([]);

  React.useEffect(() => {
    axios
      .get(`${API}/app-service/get-app-overview/${appId}`)
      .then((response: { data: any }) => {
        setAppData(response.data);
      })
      .catch((error: any) => {
        console.error('There was an error fetching data', error);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get(`${API}/app-service/get-app-overview-users/${appId}`)
      .then((response: { data: any }) => {
        setUsersData(response.data);
      })
      .catch((error: any) => {
        console.error('There was an error fetching data', error);
      });
  }, []);
  return (
    <div className="flex">
      <h3>App overview</h3>
      <AppInfo appData={appData} />
      <UsersInfo usersData={usersData} />
    </div>
  );
};
