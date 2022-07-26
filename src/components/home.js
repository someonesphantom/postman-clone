import * as React from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ResponsiveAppBar from './appbar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import InnerMenu from './inMenu';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { height } from '@mui/system';
const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  const geRowsWithId = (rows) => {
    let id = 0
    let completeRowListArray = []
    console.log(rows)
    for (let row of rows) {
        const rowsWithId = {
            id: id,
            ...row
        }
        id++
        completeRowListArray.push(rowsWithId)
    }
    return completeRowListArray
}

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

export default function Home() {
  const [method, setmethod] = React.useState('');
  const [url, seturl] = React.useState('');
  const [resultValue, setResultValue] = React.useState('');
  const [value, setValue] = React.useState(0);
  const [body,setbody] = React.useState('');
  const [Id, setID] = React.useState('');
  const handleChange1 = (event, newValue) => {
    setValue(newValue);
  };
  const onBodyChange = (e)=>{
    setbody(e.target.value)
  }
  const handleChange = (event) => {
    setmethod(event.target.value);
  };
  const onUrlChange = (e) => {
        seturl(e.target.value);
    }
  const onIdChange=(e)=>{
    setID(e.target.value);
  }
    const sendRequest = (requestType, URL, body, headers) => {
        if (requestType === "GET") {
            axios.get(URL).then(response => {
                setResultValue(JSON.stringify(geRowsWithId(response.data)));
                console.log(response);
            });
          //var res = axios.get(URL, {}, {});
            
        }
        if(requestType==="POST"){
          console.log("The Data to DB is " + body)
            axios.post(URL, JSON.parse(body)).then(response => {
              setResultValue(body);
              console.log(body);
            })
        }
        if(requestType==="PUT"){
          axios.put(URL+ "/" + Id, JSON.parse(body)).then(response => {
            setResultValue(body);
            console.log(body);
          })
        }
        
        if(requestType==="DELETE"){
          axios.delete(URL + "/" + Id).then(
            setResultValue("Deleted data"));
        }
    };
    const OnSubmitClick = (e) => {
        sendRequest(method,url,body)
      }
  return (
    <Box sx={{ minWidth: 120 }} >
    <ResponsiveAppBar />
      <FormControl sx={{ m: 1, mt: 3, width: '25ch' }}>
        <InputLabel id="demo-simple-select-label">Method</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={method}
          label="Method"
          
          onChange={handleChange}
        >
          <MenuItem value="GET">GET</MenuItem>
          <MenuItem value="POST">POST</MenuItem>
          <MenuItem value="PUT">PUT</MenuItem>
          <MenuItem value="DELETE">DELETE</MenuItem>
        </Select>

      </FormControl>
      <FormControl sx={{ m: 0, mt: 3, width: '80ch' }}>
        <TextField 
        id="outlined-basic" 
        label="Enter request URL" 
        variant="outlined"
         onChange={(e) => onUrlChange(e)} />
      </FormControl>
      <FormControl sx={{ m: 1, mt: 4, width: '20ch' }}>
        <Button variant="contained"  size="large" endIcon={<SendIcon />} onClick={(e) => { OnSubmitClick(e.target.value);}} >Send</Button>
      </FormControl>
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange1} aria-label="basic tabs example">
          <Tab label="Params" {...a11yProps(0)} />
          <Tab label="Body" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        ID :
      <TextField label="Query Parameters" 
      color="warning" 
      style={{width:"50vw" }}
      size="small"
      onChange={(e) => onIdChange(e)}
        focused />
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
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Response
        </Typography>
        <Box>
        {resultValue}
        </Box>
      </CardContent>
    </Card>
    </Box>
  );
}
