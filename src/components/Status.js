import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Box } from "@material-ui/core";
import colors from "../constants/colors";

function Status({ online, loading }) {
  const classes = useStyles({ online, loading });
  return (
    <Box display="flex" alignItems="center">
      <span className={classes.dot}></span>
      <span className={classes.text}>
        {loading ? "LOADING" : online ? "ONLINE" : "OFFLINE"}
      </span>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  dot: ({ online, loading }) => {
    const color = loading
      ? colors.warning
      : online
      ? colors.success
      : colors.danger;
    return {
      borderRadius: "50%",
      display: "inline-block",
      width: 5,
      height: 5,
      backgroundColor: color,
    };
  },
  text: ({ online }) => ({
    fontSize: theme.typography.pxToRem(11),
    display: "block",
    lineHeight: 1.5,
    fontWeight: "500",
    letterSpacing: 1.5,
    paddingLeft: 5,
    color: online ? colors.text : colors.faded,
  }),
}));

Status.propTypes = {
  online: PropTypes.bool,
  loading: PropTypes.bool,
};

export default Status;
