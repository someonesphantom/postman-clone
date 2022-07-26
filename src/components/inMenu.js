import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { height } from '@mui/system';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function InnerMenu() {
  const [value, setValue] = React.useState(0);
  const [body,setbody] = React.useState('');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const onBodyChange = (e)=>{
    setbody(e.target.value)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Params" {...a11yProps(0)} />
          <Tab label="Body" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <TextField label="Query Parameters" 
      color="warning" 
      style={{width:"50vw"}}
      multiline={true}
      rows={5} focused />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <TextField label="JSON" 
      color="warning" 
      style={{width:"50vw"}}
      multiline={true}
      rows={5} 
      onChange={(e) => onBodyChange(e)}
      focused />
      </TabPanel> 
    </Box>
  );
}
