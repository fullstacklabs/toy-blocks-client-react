import React from 'react';
import PropTypes from 'prop-types';
import colors from '../constants/colors';

const Block = ({ id, description }) => (
 <div style={styles.container}>
   <span style={styles.title}>{id.padStart(3, '0')}</span>
   <span style={styles.description}>{description}</span>
 </div>
)

Block.propTypes = {
  id: PropTypes.string,
  description: PropTypes.string,
};

const styles = {
  container: {
    display: 'block',
    width: '584px',
    backgroundColor: colors.blocksBackground,
    padding: 8,
    marginTop: 5
  },
  title: {
    display: 'block',
    color: colors.blockId,
    fontSize: 10,
    fontWeight: '700',
    paddingBottom: 6,
    letterSpacing: 1.5,
    padding: 5,
  },
  description: {
    display: 'block',
    color: colors.text,
    fontSize: 14,
    letterSpacing: 0.25,
    padding: 5,
  }
};

export default Block;
