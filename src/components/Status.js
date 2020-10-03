import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Box } from "@material-ui/core";
import colors from "../constants/colors";

function Status({ online, loading, expanded }) {
  const classes = useStyles({ online, loading, expanded });
  return (
    <Box display="flex" alignItems="center" className={classes.expanded}>
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
      width: 7,
      height: 7,
      backgroundColor: color,
    };
  },
  text: ({ online }) => ({
    fontSize: theme.typography.pxToRem(12),
    display: "block",
    lineHeight: 1.5,
    paddingLeft: 5,
    fontWeight: theme.typography.fontWeightBold,
    letterSpacing: 2,
    color: online ? colors.text : colors.faded,
  }),
  expanded: ({ expanded }) => {
    return expanded ? {
      top: -10,
      position: "relative"
    } : {}
  },
}));

Status.propTypes = {
  online: PropTypes.bool,
  loading: PropTypes.bool,
  expanded: PropTypes.bool,
};

export default Status;
