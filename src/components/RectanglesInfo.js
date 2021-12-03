import React from "react";
import {
    LinearProgress,
    makeStyles,
    Typography,
    Container,
} from "@material-ui/core";
import { numberWithCommas } from "./Banner/Carrousel";
import { renderIcons } from "../pages/CoinPage";
import { Link, Route } from "react-router-dom";

const RectanglesInfo = ({
    value,
    currency,
    symbol,
    percentage,
    title,
    number,
}) => {
    const useStyles = makeStyles((theme) => ({
        rectangle: {
            fontWeight: "bold",
            fontFamily: "Poppins",
        },
        marketDataSmall: {
            marginTop: 20,
        },
    }));

    const classes = useStyles();
    if (value === null) {
        value = "No idea";
    }
    return number ? (
        <div
            style={{
                height: "120px",
                width: "300px",
                backgroundColor: "#303030",
                borderRadius: 10,
            }}
        >
            <div style={{ marginLeft: 20 }}>
                <Typography variant="h6" className={classes.rectangle}>
                    {title}
                </Typography>
        &nbsp; &nbsp;
        <Typography
                    variant="h7"
                    style={{
                        fontFamily: "Poppins",

                        marginTop: "20px",
                    }}
                >
                    {symbol} {numberWithCommas(value?.toString())}
                </Typography>
                <div className={classes.marketDataSmall}>
                    <Typography
                        variant="h7"
                        className={classes.marketDataSmall}
                        style={{
                            color: percentage < 0 ? "#ea3943" : "#16c784",
                        }}
                    >
                        {percentage ? (
                            <div>
                                {renderIcons(percentage)}
                                {percentage?.toFixed(2) + "%"}
                            </div>
                        ) : null}
                    </Typography>
                </div>
            </div>
      &nbsp; &nbsp;
        </div>
    ) : (
            <div
                style={{
                    height: "120px",
                    width: "300px",
                    backgroundColor: "#303030",
                    borderRadius: 10,
                }}
            >
                <div style={{ marginLeft: 20 }}>
                    <Typography variant="h6" className={classes.rectangle}>
                        {title}
                    </Typography>
        &nbsp; &nbsp;
        <a href={value}>
                        <Typography
                            variant="h7"
                            className={classes.rectangle}
                            style={{
                                fontSize: 14,
                                color: "white",
                                wordBreak: "break-all",
                                overflowWrap: "break-word",
                            }}
                        >
                            {value[0]}
                        </Typography>
                    </a>
                </div>
            </div>
        );
};

export default RectanglesInfo;
