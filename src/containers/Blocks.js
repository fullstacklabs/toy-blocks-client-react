import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import {
  CircularProgress,
  Typography,
  Button,
  Box,
  Container,
  makeStyles,
} from "@material-ui/core";

import { SentimentVeryDissatisfied } from '@material-ui/icons';

import { fetchBlocksLists } from "../actions/blocks";

import colors from "../constants/colors";
import { getNodeBlocks, blockIsLoading, blockHadFailure, blockIsIddle } from "../selectors/blocks";

export const Blocks = ({ blocks, isLoading, isFailured, retryRequest, isIddle }) => {
  const classes = useStyles();

  if (isIddle) return <Box />;

  if (isFailured) {
      return (
        <Box className={[classes.block, classes.blockLoading]} key={'error-feedback'}>
          <SentimentVeryDissatisfied className={classes.icon} />
          <Typography className={classes.text}>Something get wrong with this node :(</Typography>
          <Button className={classes.button} variant="contained" color="primary" onClick={retryRequest}>
            Try Again
          </Button>
        </Box>
      )
  }

  if (isLoading) {
    return  (
      <Box className={[classes.block, classes.blockLoading]} key={'loading-indicator'}>
        <CircularProgress variant="indeterminate" />
        <Typography className={classes.text}>Waiting a minute please!</Typography>
      </Box>
    )
  }

  if (!blocks?.data) return <Box />

  const renderBlock = (block) => {
    return (
      <Box className={classes.block} key={block.attributes?.hash}>
        <Typography className={classes.identifier} component="strong">{block?.id}</Typography>
        <Typography className={classes.text}>{block?.attributes?.data}</Typography>
      </Box>
    )
  }


  return (
    <Container className={classes.container}>{blocks?.data?.map(renderBlock)}</Container>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 0
  },
  block: {
    background: colors.blockBackground,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontStyle: 'normal',
    borderRadius: '2px',
    marginTop: '5px',
    display: 'block',
    width: '100%',
    padding: '8px 0',
  },
  blockLoading: {
    textAlign: 'center',
  },
  identifier: {
    color: colors.info,
    fontWeight: 'bold',
    fontSize: '10px',
    lineHeight: '1.4em',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    padding: '8px',
  },
  text: {
    color: colors.text,
    fontSize: '14px',
    lineHeight: '1.4em',
    letterSpacing: '0.25px',
    padding: '8px',
  },
  icon: {
    fontSize: '4em',
  },
  button: {
    marginTop: '10px'
  }
}));

Blocks.propTypes = {
  blocks: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  isFailured:PropTypes.bool.isRequired,
  isIddle: PropTypes.bool.isRequired,
};

function mapStateToProps(state, { node }) {
  return {
    blocks: getNodeBlocks(state, node),
    isLoading: blockIsLoading(state, node),
    isFailured: blockHadFailure(state, node),
    isIddle: blockIsIddle(state, node),
  };
}

function mapDispatchToProps(dispatch, { node }) {
  return {
    ...bindActionCreators({ retryRequest: () => fetchBlocksLists(node?.url) }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Blocks);
