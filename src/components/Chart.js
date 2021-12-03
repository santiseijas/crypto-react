import React, { useState, useEffect, useRef } from 'react'
import { Line } from "react-chartjs-2";
import { CryptoState } from '../CryptoContext';
import axios from "axios";
import { HistoricalChart } from '../config/api';
import { CircularProgress } from '@material-ui/core'
import { chartDays } from "../config/data";
import TradingViewWidget, { Themes } from "react-tradingview-widget";


const { innerWidth: width, innerHeight: height } = window;
const Chart = ({ coin }) => {
    const [historicData, setHistoricData] = useState();
    const [days, setDays] = useState(1);
    const { currency } = CryptoState();
    const tradingRef = useRef(null);



    const fetchHistoricData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency));

        setHistoricData(data.prices);
    };

    useEffect(() => {
        fetchHistoricData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [days]);;
    return (
        !historicData ? (
            <CircularProgress
                style={{ color: "gold" }}
                size={250}
                thickness={1}
            />
        ) : (
                [<div style={{ align: 'left', width: '600px',marginTop:-80 }}>
                    <TradingViewWidget
                        allow_symbol_change={false}
                        symbol={`${coin.symbol}USD`}
                        theme={Themes.DARK}
                        locale="en"
                        ref={tradingRef}
                        enable_publishing={false}
                        save_image={false}
                        hide_top_toolbar={true}
                        hide_side_toolbar={false}
                        width={'1210'}
                    />
                </div>]
            ))
}

export default Chart
