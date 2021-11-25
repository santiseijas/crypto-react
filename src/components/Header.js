import { AppBar, Container, createTheme, makeStyles, MenuItem, MuiThemeProvider, Select, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'


const useStyles = makeStyles(() => ({
    title: {
        flex: 1,
        color: 'gold',
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        cursor: 'pointer'
    }
}))
const Header = () => {
    const classes = useStyles()
    const history = useHistory()

    const { currency, setCurrency } = CryptoState()
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff',
            },
            type: 'dark'
        }
    })
    return (
        <MuiThemeProvider theme={darkTheme}>
            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar>
                        <Typography className={classes.title} onClick={() => history.push(`/`)} variant={'h5'}>Crypto Market Cap</Typography>
                        <Select variant='outlined' style={{
                            width: 100,
                            height: 40,
                            marginLeft: 15,
                        }}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value={'USD'}>USD</MenuItem>
                            <MenuItem value={'EUR'}>EUR</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </MuiThemeProvider>
    )
}

export default Header
