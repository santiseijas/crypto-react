import { makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { numberWithCommas } from "./CoinsTable";

const Converter = ({ currency, coin }) => {
  const useStyles = makeStyles((theme) => ({
    input: {
      color: "#fff",
      fontWeight: "bolder",
      marginTop: 5,
      fontSize: 20,
      width:100
    },
    disabledInput: {
      "& .MuiInputBase-root.Mui-disabled": {
        color: "#fff",
      },
    },
  }));

  function multiply2(value, mul) {
    const op = value * mul;
    setMultiply(op);
    return numberWithCommas(op);
  }

  const number = coin?.market_data.current_price[currency.toLowerCase()];

  const ref = useRef();
  const [multiply, setMultiply] = useState(number);
  const classes = useStyles();

  let value = 1;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border:1,
        borderStyle:'solid',
        borderColor:'#909090',
        borderRadius: 20,
        backgroundColor: "#303030",
        height:120,

      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          borderBottom:2,
          borderStyle:'solid',
          borderTop:'none',
          borderLeft:'none',
          borderRight:'none',
          paddingBottom:10,
          paddingTop:5
        }}
      >
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="30"
          style={{ marginLeft: 10, borderRadius: 20,marginRight:5 }}
        />
        <div style={{ alignItems: "center", }}>
          <Typography
            variant="h5"
            style={{ fontFamily: "Montserrat", fontWeight: "bolder" }}
          >
            {coin?.name}
          </Typography>
        </div>
        <div style={{ marginLeft: 80 }}>
          <TextField
            defaultValue={value}
            ref={ref}
            onChange={(event) => {
              value = event.target.value;
              multiply2(number, value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              disableUnderline: true,
              className: classes.input,
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingTop:10
        }}
      >
        <img
          src={`https://s2.coinmarketcap.com/static/cloud/img/fiat-flags/${currency}.svg`}
          alt={currency}
          height="30"
          style={{ marginLeft: 10, borderRadius: 20 ,marginRight:5 }}
        />
        <div style={{ alignItems: "center" }}>
          <Typography
            variant="h5"
            style={{ fontFamily: "Montserrat", fontWeight: "bolder" }}
          >
            {currency}
          </Typography>
        </div>
        <div style={{ marginLeft: 70, justifyContent: "flex-end" }}>
          <TextField
            className={classes.disabledInput}
            value={numberWithCommas(multiply)}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              disableUnderline: true,
              className: classes.input,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Converter;
