import React from 'react';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { InventoryItem } from '../models/InventoryItem';
import { AppOverview } from './app-details/AppOverview';
import axios from 'axios';
import { AppOverviewData } from '../models/AppOverview';

interface Props {}

const MyModal = ({
  open,
  onClose,
  rowId,
}: {
  open: boolean;
  onClose: () => void;
  rowId?: number;
}) => (
  <Modal open={open} onClose={onClose}>
    <Box
      sx={{
        p: 4,
        bgcolor: 'white',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      children={<AppOverview appId={rowId || 0} />}
    ></Box>
  </Modal>
);

const testData: InventoryItem[] = [
  { id: 1, name: 'name', category: 'category', connector: 'connector' },
  { id: 2, name: 'name', category: 'category', connector: 'connector' },
  { id: 3, name: 'name', category: 'category', connector: 'connector' },
  { id: 4, name: 'name', category: 'category', connector: 'connector' },
  { id: 5, name: 'name', category: 'category', connector: 'connector' },
  { id: 6, name: 'name', category: 'category', connector: 'connector' },
  { id: 7, name: 'name', category: 'category', connector: 'connector' },
  { id: 8, name: 'name', category: 'category', connector: 'connector' },
  { id: 9, name: 'name', category: 'category', connector: 'connector' },
  { id: 10, name: 'name', category: 'category', connector: 'connector' },
  { id: 11, name: 'name', category: 'category', connector: 'connector' },
  { id: 12, name: 'name', category: 'category', connector: 'connector' },
  { id: 13, name: 'name', category: 'category', connector: 'connector' },
  { id: 14, name: 'name', category: 'category', connector: 'connector' },
  { id: 15, name: 'name', category: 'category', connector: 'connector' },
  { id: 16, name: 'name', category: 'category', connector: 'connector' },
];

const columns: GridColDef[] = [
  { field: 'appName', headerName: 'Name', width: 100 },
  { field: 'category', headerName: 'Category', width: 100 },
  { field: 'connector', headerName: 'Connector', width: 100 },
];

export const InventoryTable = (props: Props) => {
  const [open, setOpen] = React.useState(false);

  const [inventoryItems, setInventoryItems] = React.useState<AppOverviewData[]>([]);

  const [selectedRowId, setSelectedRowId] = React.useState<number>(0);

  const [rowCount, setRowCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 25,
  });

  const getInventoryItems = async () => {
    setIsLoading(true);

    try {
      const response = await axios({
        method: 'put',
        url: `/api/v1/app-service/get-apps`,
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
        data: { pageNumber: paginationModel.page + 1, pageSize: paginationModel.pageSize },
      });
      console.log(response.data.appRows);
      const transformedAppRows = response.data.appRows.map((row: AppOverviewData) => ({
        ...row,
        id: row.appId,
      }));

      setInventoryItems(transformedAppRows);
      setRowCount(response.data.totalCount);
    } catch (error) {
      console.error('There was an error fetching data', error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getInventoryItems();
  }, []);

  const handleRowClick = (param: GridRowParams) => {
    setSelectedRowId(param.row.id as number);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(inventoryItems);
  return (
    <div className="flex">
      <DataGrid
        className=" flex h-12"
        rowHeight={100}
        rows={inventoryItems || []}
        columns={columns}
        paginationMode="server"
        rowCount={rowCount}
        onRowClick={handleRowClick}
        paginationModel={paginationModel}
        pageSizeOptions={[25, 50]}
        onPaginationModelChange={newModel => setPaginationModel(newModel)}
        loading={isLoading}
      />
      <MyModal open={open} onClose={handleClose} rowId={selectedRowId} />
    </div>
  );
};
