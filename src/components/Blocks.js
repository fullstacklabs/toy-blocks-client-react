import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Box, Typography } from "@material-ui/core";
import colors from "../constants/colors";

function Blocks({ fetching, blocks, loading, online }) {
  const classes = useStyles();

  let msg;
  if(loading) msg = "Loading..."
  else if(fetching) msg = "Fetching..."
  else if(!online) msg = "Offline, couldn't retrieve blocks"
  else if(!blocks) msg = "Error retrieving blocks"

  if(msg) return (
    <Box>
      <Typography className={classes.loading}>{msg}</Typography>
    </Box>
  )

  return (
    <Box className={classes.container}> 
      { blocks.map( block => {
        const heading = "000".substr(0, 3 - block.id.toString().length) + block.id.toString()
        return (
          <Box className={classes.block} key={block.id}>
            <span className={classes.heading}>{heading}</span>
            <span className={classes.text}>{block.attributes.data}</span>
          </Box>
        )
      })}
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    paddingRight: 20,
  },
  text: {
    fontSize: theme.typography.pxToRem(14),
    display: "block",
    lineHeight: 1.5,
    fontWeight: "400",
  },
  heading: {
    fontSize: theme.typography.pxToRem(11),
    color: colors.blockHeading,
    display: "block",
    marginBottom: 2,
    fontWeight: "500",
    letterSpacing: 1.5
  },
  block: {
    backgroundColor: colors.blockBackground,
    padding: 5,
    paddingRight: 10, 
    paddingLeft: 10,
    marginBottom: 5, 
    borderRadius: 2,
    width: "100%"
  },
  loading: {
    fontSize: theme.typography.pxToRem(14),
    display: "block",
    color: colors.text,
    lineHeight: 1.5
  }
}));

Blocks.propTypes = {
  loading: PropTypes.bool,
  fetching: PropTypes.bool,
  blocks: PropTypes.array,
  online: PropTypes.bool
};

export default Blocks;
