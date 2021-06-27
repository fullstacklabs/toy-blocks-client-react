import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getBlocks} from "../actions/nodes";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  makeStyles,
  Box,
} from "@material-ui/core";
import colors from "../constants/colors";
import Status from "./Status";

const Node = ({node, expanded, toggleNodeExpanded, getBlocks}) => {

  useEffect(() => {
    //debugger;
    console.log("didMount");
    getBlocks(node);
  }, []);
  const classes = useStyles();
  return (
    <Accordion
      elevation={3}
      className={classes.root}
      expanded={expanded}
      onChange={() => toggleNodeExpanded(node)}
    >
      <AccordionSummary
        className={classes.summary}
        classes={{
          expandIcon: classes.icon,
          content: classes.content,
          expanded: classes.expanded,
        }}
        expandIcon={<ExpandMoreIcon/>}
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
          <Status loading={node.loading} online={node.online}/>
        </Box>
      </AccordionSummary>
      <AccordionDetails className={classes.summaryDetail}>
        {(node.blocks || []).map(block =>
          (<Box className={classes.block}>
            <Typography className={classes.blockTitle}>
              {block.attributes && ("" + block.attributes.index).padStart(3, "0")}
            </Typography>
            <Typography className={classes.blockDetails}>
              {block.attributes && block.attributes.data}
            </Typography>
          </Box>))
        }
      </AccordionDetails>
    </Accordion>
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
  block: {
    background: "#DCDCDC",
    margin: "4px 0px"
  },
  blockTitle: {
    color: "blue",
    fontSize: "12px",
    padding: "1px 5px"
  },
  blockDetails: {
    fontSize: "15px",
    fontWeight: "500",
    padding: "0px 5px"
  },
  summaryContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingRight: 20,
  },
  summaryDetail: {
    display: "block",
    padding: "5px 20px",
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
}));

Node.propTypes = {
  node: PropTypes.shape({
    url: PropTypes.string,
    online: PropTypes.bool,
    name: PropTypes.string,
    loading: PropTypes.bool,
    blocks: PropTypes.array
  }).isRequired,
  expanded: PropTypes.bool,
  toggleNodeExpanded: PropTypes.func.isRequired,
  getBlocks: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({getBlocks}, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(Node);
