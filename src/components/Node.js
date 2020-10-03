import React from "react";
import PropTypes from "prop-types";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  makeStyles,
  Box,
  CircularProgress
} from "@material-ui/core";
import colors from "../constants/colors";
import Status from "./Status";
import Block from "./Block";

const Node = ({ node, expanded, toggleNodeExpanded }) => {
  const classes = useStyles();
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
          <Status loading={node.loading} online={node.online} expanded={expanded} />
        </Box>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.nodeBlocks}>
        {node.blocks.loading ? (
          <CircularProgress />
        ) : node.blocks.errorFecth ? (
          <Typography
            variant="subtitle1"
            className={classes.secondaryHeading}
          >
            {'Error to fetch the Blocks. Please try again.'}
          </Typography>
        ) : node.blocks.data && node.blocks.data.length > 0 ? (
          <Box width={1}>
            {node.blocks.data.map((block) => (
              <Block key={block.id} block={block}></Block>
            ))}
          </Box>
          ) : <Typography
            variant="subtitle1"
            className={classes.secondaryHeading}
          >
              {'There aren\'t Blocks, it is an empty node.'}
          </Typography>

        }
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
    borderRadius: "4px"
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
    paddingRight: 0,
  },
  icon: {
    color: colors.faded,
  },
  content: {
    margin: "10px 0 !important", // Avoid change of sizing on expanded
  },
  expanded: {
    "& $icon": {
      top: -10
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
  nodeBlocks: {
    padding: "8px 24px 10px"
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
