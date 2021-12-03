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
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import RectanglesInfo from "../components/RectanglesInfo";
import Converter from "../components/Converter";

export const renderIcons = (value) => {
  return value > 0 ? <FaArrowAltCircleUp /> : <FaArrowAltCircleDown />;
};
const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol, icon } = CryptoState();

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

      flexDirection: "column",
      alignItems: "center",
    },
    sidebar: {
      width: "30%",

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

    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",

      display: "flex",
      justifyContent: "space-around",

      flexDirection: "column",
      alignItems: "center",

      alignItems: "start",
    },

    chart: {
      gridColumn: 1,
    },
    info: {
      gridColumn: 5,
    },
  }));

  const classes = useStyles();
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
                  margin: 5,
                }}
              >
                Rank:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                  marginRight: 5,
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
                    ? "#16c784"
                    : "#ea3943",
              }}
            >
              &nbsp;
              {renderIcons(coin?.market_data.price_change_percentage_24h)}
              &nbsp;
              {coin?.market_data.price_change_percentage_24h
                .toString()
                .slice(0, -3)}
              %
            </Typography>
          </span>
        </div>

        <div style={{ flexDirection: "row", display: "flex" }}>
          <RectanglesInfo
            title={"Market Cap"}
            value={coin.market_data?.market_cap[currency.toLowerCase()]}
            percentage={coin?.market_data?.market_cap_change_percentage_24h}
            currency={currency.toString().toLowerCase()}
            symbol={symbol}
            number={true}
          />
          &nbsp;
          <RectanglesInfo
            title={"Total Supply"}
            value={coin?.market_data.total_supply}
            number={true}
          />
          &nbsp;
          <RectanglesInfo
            title={"Volume"}
            symbol={symbol}
            value={coin?.market_data?.total_volume[currency.toLowerCase()]}
            number={true}
          />
          &nbsp;
          <RectanglesInfo
            title={"Info"}
            value={coin?.links?.repos_url.github}
            link={true}
          />
          &nbsp;
        </div>
      </div>
      <div style={{ flexDirection: "row", display: "grid" }}>
        <div
          className={classes.chart}
          style={{ align: "left", width: "600px" }}
        >
          <CoinInfo coin={coin} />
        </div>
        <div
          className={classes.info}
          style={{
            height: "610px",
            width: "250px",
            align: "right",
            marginTop: 25,
            marginRight: 20,
            backgroundColor: "#303030",
            borderRadius: 20,
          }}
        >
          <Converter coin={coin} currency={currency.toString()}></Converter>
        </div>
      </div>
    </div>
  );
};

export default CoinPage;
