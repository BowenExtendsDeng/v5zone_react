import './App.css';
import {useRoutes} from "react-router-dom";
import {Box} from "@mui/material";
import routes from "./routes"


function App() {
  const element = useRoutes(routes)
  return (
    <Box>
      {element}
    </Box>
  );
}


export default App;
