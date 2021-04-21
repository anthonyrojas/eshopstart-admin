import React, {useImperativeHandle, useRef} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import { DragSource, DropTarget } from "react-dnd";
import ItemTypes from "./ProductImageTypes";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    details: {
        display: 'flex',
        flexDirection: 'column'
    },
    content: {
        flex: '1 0 auto'
    },
    cover: {
        width: 200
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    }
}))

const ProductImage = React.forwardRef(
    ({productImageInfo, isDragging, connectDragSource, connectDropTarget}, ref) => {
        const elementRef = useRef(null);
        connectDragSource(elementRef);
        connectDropTarget(elementRef);
        const opacity = isDragging ? 0 : 1;
        useImperativeHandle(ref, () => ({
            getNode: () => elementRef.current
        }));
        const classes = useStyles();
        const theme = useTheme();
        const imgSrc = productImageInfo.url.includes('http://') || productImageInfo.url.includes('https://') ? productImageInfo.url : `${process.env.REACT_APP_API_URI}/${productImageInfo.url}`
        return(
            <Grid item 
                xs={12}
                ref={elementRef}
                styles={opacity}
            >
                <Card className={classes.root}>
                    <CardMedia 
                        className={classes.cover}
                        image={imgSrc}
                        title={productImageInfo.label}
                    />
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <p>
                                <Typography variant='h6' component='span' color='textSecondary'>
                                    ID: 
                                </Typography>
                                <Typography variant='h6' component='span'>
                                    {productImageInfo.id}
                                </Typography>
                            </p>
                            <p>
                                <Typography variant='h6' component='span' color='textSecondary'>
                                    Label:
                                </Typography>
                                <Typography variant='h6' component='span'>
                                    {productImageInfo.label}
                                </Typography>
                            </p>
                        </CardContent>
                    </div>
                </Card>
                {/* <Paper>
                    <Typography variant='body2'>{productImageInfo.id}</Typography>
                    <Typography variant='body1'>{productImageInfo.label}</Typography>
                </Paper> */}
            </Grid>
        )
    }
);

export default DropTarget(
    ItemTypes.PRODUCT_IMAGE,
    {
        hover(props, monitor, component){
            if(!component){
                return null;
            }
            const node = component.getNode();
            if(!node){
                return null;
            }
            const dragIndex = monitor.getItem().index;
            const hoverIndex = props.index;
            if(dragIndex === hoverIndex){
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = node.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            props.moveProductImage(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            monitor.getItem().index = hoverIndex;
        }
    },
    connect => ({
        connectDropTarget: connect.dropTarget()
    })
)(
    DragSource(
        ItemTypes.PRODUCT_IMAGE,
        {
            beginDrag: props => ({
                id: props.id,
                index: props.index
            })
        },
        (connect, monitor) => ({
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging()
        })
    )(ProductImage)
)