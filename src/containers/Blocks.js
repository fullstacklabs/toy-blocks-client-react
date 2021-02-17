import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Block from '../components/Block'

const Blocks = ({ blocks }) => {
    return (
        <Box>
            {blocks.data.length === 0 ? <Box>Information not found</Box>
                : blocks.data.map(block => <Block key={block.id} block={block.attributes} />)}
        </Box>
    )
}

Blocks.propTypes = PropTypes.shape({
    blocks: PropTypes.arrayOf(PropTypes.object)
}).isRequired

export default Blocks;