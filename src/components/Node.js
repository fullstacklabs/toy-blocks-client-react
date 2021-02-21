import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  makeStyles,
  Box,
  CircularProgress,
  Grid
} from "@material-ui/core";
import colors from "../constants/colors";
import Status from "./Status";
import axios from "axios";
import Block from "./Block";

const useBlocks = (expanded, online, url) => {
  const [blocks, setBlocks] = useState([]);
  const [showLoading, setShowloading] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (expanded && online) {
      setShowloading(true);
      setShowError(false);

      axios.get(`${url}/api/v1/blocks`).then(r => {
        setShowloading(false);
        setBlocks(r.data.data);
      }).catch(() => {
        setShowloading(false);
        setShowError(true);
      });
    }
  }, [expanded, online, url]);

  return { blocks, showLoading, showError };
};

const Node = ({ node, expanded, toggleNodeExpanded }) => {
  const classes = useStyles();
  const { blocks, showLoading, showError } = useBlocks(expanded, node.online, node.url);

  const errorAlert = (
    <Box className={classes.errorBlock}>
      The blocks could not be loaded :(
    </Box>
  );
  const messageBlock = (
    <Grid container justify="center">
      {showError && errorAlert}
      {showLoading && <CircularProgress data-testid="spinner" />}
      {!showError && !showLoading && <Box data-testid="empty">Nothing to show</Box>}
    </Grid>
  );

  return (
    <ExpansionPanel
      elevation={3}
      className={classes.root}
      expanded={expanded}
      onChange={() => toggleNodeExpanded(node)}
    >
      <ExpansionPanelSummary
        className={classes.summary}
        classes={{
          expandIcon: classes.icon,
          content: classes.content,
          expanded: classes.expanded,
        }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Box className={classes.summaryContent}>
          <Box>
            <Typography variant="h5" className={classes.heading}>
              {node.name || "Unknown"}
            </Typography>
            <Typography
              variant="subtitle1"
              className={classes.secondaryHeading}
            >
              {node.url}
            </Typography>
          </Box>
          <Status loading={node.loading} online={node.online} />
        </Box>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.blocksPanel}>
        {!blocks.length && messageBlock}
        {blocks.map(block => <Block key={block.id} attributes={block.attributes} />)}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "16px 0",
    boxShadow: "0px 3px 6px 1px rgba(0,0,0,0.15)",
    "&:before": {
      backgroundColor: "unset",
    },
  },
  summary: {
    padding: "0 24px",
  },
  summaryContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingRight: 20,
  },
  icon: {
    color: colors.faded,
  },
  content: {
    margin: "10px 0 !important", // Avoid change of sizing on expanded
  },
  expanded: {
    "& $icon": {
      paddingLeft: 0,
      paddingRight: 12,
      top: -10,
      marginRight: 0,
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    display: "block",
    color: colors.text,
    lineHeight: 1.5,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(14),
    color: colors.faded,
    lineHeight: 2,
  },
  blocksPanel: {
    flexDirection: "column"
  },
  errorBlock: {
    backgroundColor: "#f44336",
    color: "#fff",
    padding: 5,
    borderRadius: 3
  }
}));

Node.propTypes = {
  node: PropTypes.shape({
    url: PropTypes.string,
    online: PropTypes.bool,
    name: PropTypes.string,
    loading: PropTypes.bool,
  }).isRequired,
  expanded: PropTypes.bool,
  toggleNodeExpanded: PropTypes.func.isRequired,
};

export default Node;
