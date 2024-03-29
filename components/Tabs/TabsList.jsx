import TabList from '@mui/lab/TabList'
import Tab from '@mui/material/Tab'

// ** Icons Imports
import CartHeart from 'mdi-material-ui/CartHeart'
import Stethoscope from 'mdi-material-ui/Stethoscope'
import Charity from 'mdi-material-ui/Charity'
import SilverwareClean from 'mdi-material-ui/SilverwareClean'
import { isMobile } from 'react-device-detect'

const TabsList = ({ setCampanha }) => {
    const handleChange = (event, newValue) => {
        setCampanha(newValue)
    }

    return (
        <TabList
            onChange={handleChange}
            aria-label='tabs text-left'
            variant="fullWidth"
            orientation= { isMobile ? "vertical" : "horizontal" }
        >
            <Tab
                value='food'
                icon={<SilverwareClean />}
                iconPosition="start"
                label='Alimentos'
            />

            <Tab
                value='personal hygiene'
                icon={<Charity />}
                iconPosition="start"
                label='Higiene Pessoal'
            />

            <Tab
                value='accessories'
                icon={<CartHeart />}
                iconPosition="start"
                label='Acessórios'
            />

            <Tab
                value='medical treatments'
                icon={<Stethoscope />}
                iconPosition="start"
                label='Assistência médica'
            />

        </TabList>
    )

}

export default TabsList