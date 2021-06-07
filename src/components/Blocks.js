import React from 'react';
import Block from './Block';
import PropTypes from 'prop-types';
import colors from '../constants/colors';
import { CircularProgress } from "@material-ui/core";

const Blocks = ({ blocks }) => {

  if(blocks.loading){
    return (
      <CircularProgress />
    )
  }

  if(blocks.error) {
    return (
      <div>
         <span style={styles.messageError}>{blocks.error}</span>
      </div>
    )
  }

  return (
    <div>
      {blocks.data && blocks.data.map(({id, attributes })=> (
        <Block
          key={`${id}`}
          id={id}
          description={attributes.data}
          />
       )
      )}
    </div>
  )
}

const styles = {
  messageError: {
    color: colors.text,
    fontSize: 14,
  }
};

Blocks.propTypes = {
  blocks: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.string,
    data: PropTypes.array
  })
}

export default Blocks;
