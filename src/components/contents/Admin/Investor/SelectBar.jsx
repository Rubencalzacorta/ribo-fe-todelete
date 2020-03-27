import React from 'react'
import Paper from "@material-ui/core/Paper";
import { Link } from 'react-router-dom'
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './SelectBar.scss'
import CountryFlag from '../../../helpers/CountryFlag.jsx'

const SelectBar = (props) => {
    let { investors, _investor, handleChange } = props
    return (
        <Paper className="select-bar">
            <IconButton className="iconButton" disabled aria-label="menu">
                <i className="material-icons">
                    account_circle
                    </i>
            </IconButton>
            <FormControl variant="standard" className="formControl">
                <Select
                    value={_investor ? _investor : 'Seleccione un inversionista'}
                    onChange={e => handleChange(e)}
                    className='menu-item'
                    inputProps={{
                        name: '_investor',
                        id: 'outlined-age-simple',
                    }}
                >
                    {investors ? investors.map(e =>
                        <Link to={`/admin/investor/details/${e._id}`} key={e._id} value={e._id}>
                            <MenuItem className='menu-item' value={e._id}>
                                <CountryFlag country={e.location} />
                                {" " + e.firstName + " " + e.lastName}
                            </MenuItem>
                        </Link>
                    ) : ""}
                </Select>
            </FormControl>
            <IconButton disabled className="iconButton" aria-label="search">
                <SearchIcon />
            </IconButton>
            <Divider className="divider" orientation="vertical" />
            <IconButton
                color="secondary"
                className="iconButton"
                aria-label="directions"
            >
                <i className="material-icons">
                    <Link to="/admin/investor/create">
                        create
                        </Link>
                </i>
            </IconButton>
        </Paper>
    )

}

export default SelectBar