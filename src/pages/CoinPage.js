import {
    LinearProgress,
    makeStyles,
    Typography,
    Container,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../components/CoinsTable";
import { CryptoState } from "../CryptoContext";

const CoinPage = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState();

    const { currency, symbol } = CryptoState();

    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id));

        setCoin(data);
    };

    useEffect(() => {
        fetchCoin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const useStyles = makeStyles((theme) => ({
        container: {
            marginLeft: 20,
            [theme.breakpoints.down("md")]: {
                flexDirection: "column",
                alignItems: "center",
            },
        },
        sidebar: {
            width: "30%",
            [theme.breakpoints.down("md")]: {
                width: "100%",
            },
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 25,
            //borderRight: "2px solid grey",
        },
        row: {
            display: "flex",
            flexDirection: "column",
        },
        heading: {
            fontWeight: "bold",
            marginBottom: 10,
            fontFamily: "Poppins",
        },
        description: {
            width: "100%",
            fontFamily: "Montserrat",
            padding: 25,
            paddingBottom: 15,
            paddingTop: 0,
            textAlign: "justify",
        },
        rectangle: {
            fontWeight: "bold",

            fontFamily: "Poppins",
        },
        marketDataSmall: {
            marginTop: 20,

        },
        marketData: {
            alignSelf: "start",
            padding: 25,
            paddingTop: 10,
            width: "100%",
            [theme.breakpoints.down("md")]: {
                display: "flex",
                justifyContent: "space-around",
            },
            [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
                alignItems: "center",
            },
            [theme.breakpoints.down("xs")]: {
                alignItems: "start",
            },
        },
    }));

    const classes = useStyles();
    const currencyLower = currency.toLowerCase();
    console.log(
        coin
    );
    if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
    return (
        <div className={classes.container}>
            <div className={classes.row}>
                <div className={classes.sidebar}>
                    <img
                        src={coin?.image.large}
                        alt={coin?.name}
                        height="100"
                        style={{ margin: 20, borderRadius: 20 }}
                    />
                    <div style={{ flexDirection: "row" }}>
                        <Typography variant="h2" className={classes.heading}>
                            {coin?.name}
                        </Typography>
                        <span
                            style={{
                                display: "flex",
                                backgroundColor: "grey",
                                alignItems: "center",
                                width: "50%",
                                borderRadius: 10,
                            }}
                        >
                            <Typography
                                variant="h5"
                                style={{
                                    fontFamily: "Montserrat",
                                    marginLeft: 5,
                                }}
                            >
                                Rank:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                                variant="h5"
                                style={{
                                    fontFamily: "Montserrat",
                                    marginLeft: 5,
                                }}
                            >
                                {numberWithCommas(coin?.market_cap_rank)}
                            </Typography>
                        </span>
                    </div>
                </div>
                <div className={classes.marketData}>
                    <span style={{ display: "flex", marginLeft: "100px" }}>
                        <Typography
                            variant="h2"
                            style={{
                                fontFamily: "Montserrat",
                                fontWeight: "bolder",
                            }}
                        >
                            {symbol}{" "}
                            {numberWithCommas(
                                coin?.market_data.current_price[currency.toLowerCase()]
                            )}
                        </Typography>
                        <Typography
                            variant="h6"
                            style={{
                                fontFamily: "Montserrat",
                                fontWeight: "bolder",
                                color:
                                    coin?.market_data.price_change_percentage_24h > 0
                                        ? "green"
                                        : "red",
                            }}
                        >
                            {
                                coin?.market_data.price_change_percentage_24h.toString().slice(0, -3)
                            }%
                        </Typography>
                    </span>
                </div>
                <div style={{ flexDirection: "row", display: "flex" }}>
                    <div
                        style={{
                            height: "200px",
                            width: "200px",
                            backgroundColor: "#808080",
                            borderRadius: 10,
                        }}
                    >
                        <div style={{ marginLeft: 20 }}>
                            <Typography variant="h6" className={classes.rectangle}>
                                Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
                                variant="h5"
                                style={{
                                    fontFamily: "Poppins",

                                    marginTop: "20px",
                                }}
                            >
                                {symbol}{" "}
                                {numberWithCommas(
                                    coin?.market_data.market_cap[currency.toLowerCase()]
                                        .toString()
                                        .slice(0, -6)
                                )}
              M
            </Typography>
                            <div className={classes.marketDataSmall}>
                                <Typography variant="h7" className={classes.marketDataSmall} style={{ color: coin.market_data.market_cap_change_percentage_24 > 0 ? 'green' : 'red' }}>
                                    {coin.market_data.market_cap_change_percentage_24h.toFixed(2)}%
                                </Typography>
                            </div>
                        </div>
          &nbsp; &nbsp;

          </div>
                </div>
                <CoinInfo coin={coin} />
            </div>
        </div>
    );
};

export default CoinPage;
