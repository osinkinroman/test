import React from 'react';
import { User } from '../../models/User';
import { DataGrid } from '@mui/x-data-grid';

interface Props {
  usersData: User[];
}

export const UsersInfo = (props: Props) => {
  const { usersData } = props;

  return (
    <div className="">
      <DataGrid
        className=" flex "
        rows={usersData}
        columns={[{ field: 'username', headerName: 'username', width: 100 }]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 25 },
          },
        }}
        pageSizeOptions={[25, 50]}
      />
    </div>
  );
};
