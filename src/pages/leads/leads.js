import { useCallback, useEffect, useState } from 'react';

// Material UI
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { bpmAPI } from 'api/bpm/bpm-api';
import LeadsTable from 'sections/leads/LeadsTable';
import AddLeadForm from 'sections/leads/forms/AddLeadForm';

// ==============================|| SAMPLE PAGE ||============================== //

const Leads = () => {
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const getData = useCallback(async () => {
    setData([]);

    try {
      const result = await bpmAPI.getLeads();
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

  const onAddLead = (values) => {
    const newData = [...data, values];
    setData(newData);
  };

  return (
    <>
      <MainCard
        title="Leads"
        content={false}
        secondary={
          <IconButton justify="center" color="primary" onClick={() => setOpenDialog(true)}>
            <AddIcon />
          </IconButton>
        }
      >
        <LeadsTable data={data} />
      </MainCard>
      <AddLeadForm onFormSubmit={onAddLead} openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </>
  );
};

export default Leads;
