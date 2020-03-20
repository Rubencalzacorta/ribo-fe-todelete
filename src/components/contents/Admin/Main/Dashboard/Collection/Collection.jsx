import React, { useState, useEffect } from 'react';
import './filterBar.scss'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        width: 300,
    },
});

function valuetext(value) {
    return `${value}`;
}

export default function Collection() {
    const classes = useStyles();
    const [filter, setFilter] = useState({
        dayRange: [-30, 180],

    });

    const handleRangeChange = (event, newValue) => {
        setFilter({ ...filter, dayRange: newValue });
    };

    const handleChange = (event, newValue) => {
        setFilter({ ...filter, dayRange: newValue });
    };



    return (
        <>
            <div className="filterBar">
                <div className="filterItem">
                    <Typography id="range-slider" gutterBottom>
                        Rango de días de atraso
                    </Typography>
                    <Slider
                        value={filter.dayRange}
                        name='dayRange'
                        onChange={handleRangeChange}
                        valueLabelDisplay="on"
                        valueLabelDisplay="auto"
                        step={15}
                        max={365}
                        min={-30}
                        marks={[{
                            value: 0,
                            label: '0 días',
                        }]}
                        aria-labelledby="range-slider"
                        getAriaValueText={valuetext}
                    />
                    <Typography id="range-slider" gutterBottom>
                        Desde:{filter.dayRange[0]} - hasta:{filter.dayRange[1]}
                    </Typography>
                </div>
                <div className="filterItem">
                    <Typography id="range-slider" gutterBottom>
                        Región
                    </Typography>
                    <Slider
                        value={filter.dayRange}
                        name='dayRange'
                        onChange={handleRangeChange}
                        valueLabelDisplay="on"
                        valueLabelDisplay="auto"
                        step={15}
                        max={365}
                        min={-30}
                        marks={[{
                            value: 0,
                            label: '0 días',
                        }]}
                        aria-labelledby="range-slider"
                        getAriaValueText={valuetext}
                    />
                </div>
            </div>
        </>
    )
}