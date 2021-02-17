import React from 'react';
import PropTypes from 'prop-types';
import {
    makeStyles,
    Box
} from '@material-ui/core';
import colors from '../constants/colors';

const Block = ({ block }) => {
    const classes = useStyle();

    return (
        <Box className={classes.root}>
            <Box className={classes.container}>
                <Box fontSize={12} fontWeight="fontWeightBold" className={classes.index}>
                    {block.index}
                </Box>
                <Box>
                    {block.data}
                </Box>
            </Box>
        </Box>
    )
}

const useStyle = makeStyles(() => ({
    root: {
        padding: '2px'
    },
    container: {
        backgroundColor: 'lightgrey',
        padding: '8px'
    },
    index:{
        color: colors.blue
    }
}))

Block.propTypes = PropTypes.shape({
    block: PropTypes.shape({
        index: PropTypes.number,
        data: PropTypes.string
    })
}).isRequired

export default Block;