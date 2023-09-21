import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles"
import Navigator from "./Navigator";
import NavigatorPortrait from "./NavigatorPortrait";
import { ItemType } from "../../Model/Menu/ItemType";

const NavigatorDispather:React.FC<{navItem:ItemType[]}> = (nav) => {
    
    const theme = useTheme();
    const isPortrait = useMediaQuery(theme.breakpoints.down('md'));
    return isPortrait ? <NavigatorPortrait navItem={nav.navItem}/>:<Navigator navItem={nav.navItem}/>
}

export default NavigatorDispather;