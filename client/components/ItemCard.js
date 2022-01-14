import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import moment from 'moment';

// Redux
import { connect } from 'react-redux';

// UI
import { Card } from '@mui/material';
import { CardMedia } from '@mui/material';
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import css from './ItemCard.module.css';

const styles = {
    card: {
        width: '300px',
        margin: '10px 10px 10px 10px',
        backgroundColor: '#001c33',
        borderColor: '#154169',
        borderRadius: '10px',
        justifyContent: 'center'
    },
    cardTitle: {
        color: '#6db9fb',
        padding: '7px 3px 7px 3px',
        textAlign: 'left'
    },
    titlePadding: {
        padding: '5px 8px 5px 8px'
    },
    cardImage: {
        borderRadius: '7px',
        maxWidth: '96%'    },
    cardVideo: {
        borderColor: '#001c33',
        borderRadius: '7px',
        maxWidth: '95%',
        margin: '5px 5px 5px 5px'
    },
    cardContent: {
        color: '#ffffff',
        textAlign: 'left',
        marginBottom: '-7px'
    },
    actionsGrid: {
        justifyContent: 'space-between',
        marginTop: '6px'
    },
    imageButton: {
        maxWidth: '96%',
        borderRadius: '7px',
        margin: '5px -5px 5px 5px',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        borderColor: 'transparent'
    },
    mediaGrid: {
        maxWidth: '100%',
        height: '150px',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2e2f33',
        borderRadius: '7px',
        marginBottom: '20px'
    }
};

export class ItemCard extends Component {
    handleClick() {
    }

    _renderCardMedia() {
        const { classes, item } = this.props;

        if (item.thumbnailURL) {
            return (
                <button onClick={() => this.handleClick()} className={classes.imageButton}>
                    <CardMedia 
                        className={classes.cardImage}
                        component="img"
                        image={item.thumbnailURL}
                        alt={item.name}
                    />
                </button>
            );
        } else {
            return (
                <Grid container className={classes.mediaGrid}>
                </Grid>
            );
        }
    }

    render() {
        const { classes, item, index } = this.props;
        const humanizedDate = moment(item.dateRegistered).format("MMMM Do YYYY");

        return (
            <div>
            <Card 
                className={classes.card}
                variant='outlined'
            >
                <div className={classes.titlePadding}>
                    <Typography variant='body1' className={classes.cardTitle}>
                        {item.name}
                    </Typography>
                </div>
                {this._renderCardMedia()}
                <CardContent
                    className={classes.cardContent}
                >
                    <Typography variant='caption' style={{color: "#6db9fb"}}>
                        {"Registered: " + humanizedDate}
                    </Typography>
                    <br></br>
                    <Typography variant='caption'>
                        {"Tracking Number: " + item.trackingNumber}
                    </Typography>
                    <Grid container className={classes.actionsGrid}>
                        <Grid item>
                        </Grid>
                        <Grid item>
                            
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
})

const mapActionsToProps = {
};

ItemCard.propTypes = {
    index: PropTypes.number,
    item: PropTypes.object
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ItemCard));
