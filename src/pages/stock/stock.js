import { useCallback, useEffect, useMemo, useState } from 'react';

// material-ui
import { IconButton, Stack, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// project import
import MainCard from 'components/MainCard';
import PaginatedTable from 'components/tables/PaginatedTable';
import ToggleCell from 'components/tables/cells/ToggleCell';
import { bpmAPI } from 'api/bpm/bpm-api';
import AddStockItemForm from 'sections/stock/forms/AddStockItemForm';
import { DownloadOutlined, EditTwoTone } from '@ant-design/icons';
import { useTheme } from '@mui/styles';
import EditStockItemForm from 'sections/stock/forms/EditStockItemForm';

// ==============================|| SAMPLE PAGE ||============================== //

const Stock = () => {
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  // When the edit buttom is pressed, contains information about the row
  const [item, setItem] = useState({});
  const theme = useTheme();

  const getData = useCallback(async () => {
    setData([]);

    try {
      const result = await bpmAPI.getStock();
      if (result.data) {
        setData(result.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Type',
        accessor: 'type'
      },
      {
        Header: 'Type ID',
        accessor: 'type_id'
      },
      {
        Header: 'Brand',
        accessor: 'brand'
      },
      {
        Header: 'Series',
        accessor: 'series'
      },
      {
        Header: 'Model',
        accessor: 'model'
      },
      {
        Header: 'Count',
        accessor: 'count'
      },
      {
        Header: 'Datasheet',
        accessor: 'datasheet',
        // eslint-disable-next-line
        Cell: ({ row }) => {
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              {/* eslint-disable-next-line react/prop-types */}
              {row.values.datasheet && (
                <Tooltip title="Download Datasheet">
                  <IconButton
                    color="primary"
                    onClick={async (e) => {
                      e.stopPropagation();
                      // eslint-disable-next-line react/prop-types
                      const file = await bpmAPI.getFile(row.values.datasheet);
                      await bpmAPI.downloadFile(
                        // eslint-disable-next-line react/prop-types
                        row.values.datasheet,
                        // eslint-disable-next-line react/prop-types
                        `Datasheet - ${row.values.brand} - ${row.values.model}.${file.data.file_ext}`
                      );
                    }}
                  >
                    <DownloadOutlined />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          );
        }
      },
      {
        Header: 'Warranty',
        accessor: 'warranty',
        // eslint-disable-next-line
        Cell: ({ row }) => {
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              {/* eslint-disable-next-line react/prop-types */}
              {row.values.warranty && (
                <Tooltip title="Download Warranty">
                  <IconButton
                    color="primary"
                    onClick={async (e) => {
                      e.stopPropagation();
                      // eslint-disable-next-line react/prop-types
                      const file = await bpmAPI.getFile(row.values.warranty);
                      await bpmAPI.downloadFile(
                        // eslint-disable-next-line react/prop-types
                        row.values.warranty,
                        // eslint-disable-next-line react/prop-types
                        `Warranty - ${row.values.brand} - ${row.values.model}.${file.data.file_ext}`
                      );
                    }}
                  >
                    <DownloadOutlined />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          );
        }
      },
      {
        Header: 'Status',
        accessor: 'active',
        // eslint-disable-next-line
        Cell: ToggleCell
      },
      {
        Header: 'Actions',
        className: 'cell-center',
        disableSortBy: true,
        // eslint-disable-next-line
        Cell: ({ row }) => {
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <Tooltip title="Edit">
                <IconButton
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    // eslint-disable-next-line
                    setItem({
                      // eslint-disable-next-line react/prop-types
                      ...row.values,
                      // eslint-disable-next-line react/prop-types
                      index: row.index
                    });
                    setOpenEditDialog(true);
                  }}
                >
                  <EditTwoTone twoToneColor={theme.palette.primary.main} />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        }
      }
    ],
    [theme.palette.primary.main]
  );

  const tableInitialState = {
    hiddenColumns: ['id', 'type_id']
  };

  const onAddStockItem = (values) => {
    const newData = [...data, values];
    setData(newData);
  };

  const onEditStockItem = (values) => {
    const newData = data.map((row, index) => {
      if (index === item.index) {
        return values;
      }
      return row;
    });
    setData(newData);
  };

  const updateMyData = async (rowIndex, columnId, value) => {
    const newData = data.map((row, index) => {
      if (index === rowIndex) {
        return {
          // @ts-ignore
          ...data[rowIndex],
          [columnId]: value
        };
      }
      return row;
    });

    try {
      const result = await bpmAPI.updateStockItem(newData[rowIndex].id, newData[rowIndex]);
      if (result.data) {
        setData(newData);
      }
    } catch (e) {
      console.error(e.message.message);
    }
  };

  return (
    <MainCard
      title="Items"
      content={false}
      secondary={
        <IconButton justify="center" color="primary" onClick={() => setOpenDialog(true)}>
          <AddIcon />
        </IconButton>
      }
    >
      <PaginatedTable columns={columns} data={data} updateMyData={updateMyData} initialState={tableInitialState} />
      <AddStockItemForm onFormSubmit={onAddStockItem} openDialog={openDialog} setOpenDialog={setOpenDialog} />
      <EditStockItemForm item={item} onFormSubmit={onEditStockItem} openDialog={openEditDialog} setOpenDialog={setOpenEditDialog} />
    </MainCard>
  );
};

export default Stock;
