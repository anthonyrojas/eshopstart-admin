import React from 'react'
import Grid from '@material-ui/core/Grid';
import update from 'immutability-helper';
import ProductImage from './ProductImage';
import SubmitButton from './SubmitButton';
import Typography from '@material-ui/core/Typography';
import ProductViewButton from '../Commons/ProductViewButton';
import ProductListButton from '../Commons/ProductListButton';
import {useSelector} from 'react-redux';
import { isUndefinedOrNullOrEmpty } from '../../../helpers';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert'

const Container = (props) => {
    const [productImages, setProductImages] = React.useState(props.product.ProductImages);
    const {statusMessage, orderUpdating, errorOrderUpdating} = useSelector(state => state.productImage)
    const moveProductImage = (dragIndex, hoverIndex) => {
        const dragImage = productImages[dragIndex];
        setProductImages(
            update(productImages, {
                $splice: [
                    [dragIndex, 1], 
                    [hoverIndex, 0, dragImage]
                ]
            })
        )
    }
    let renderAlert = null
    if(errorOrderUpdating && !isUndefinedOrNullOrEmpty(statusMessage)){
        renderAlert = (
            <Grid item xs={12}>
                <Alert severity='error' variant='filled'>
                    {statusMessage}
                </Alert>
            </Grid>
        )
    }else if(!isUndefinedOrNullOrEmpty(statusMessage)){
        renderAlert = (
            <Grid item xs={12}>
                <Alert severity='success' variant='filled'>
                    {statusMessage}
                </Alert>
            </Grid>
        )
    }
    return(
        <Grid
            container
            direction='row'
            justify='center'
            alignContent='center'
            alignItems='center'
            wrap='wrap'
            spacing={1}
        >
            <Grid item xs={12}>
                <Typography variant='h4' component='h2'>
                    {props.product.name}
                </Typography>
                <Typography variant='body2' color='textSecondary' gutterBottom>
                    ID# {props.product.id}
                </Typography>
                <Typography variant='body1' component='p' align='left' gutterBottom>
                    Edit the order of the product images by dragging them up or down and dropping an image. Once you are satisfied with the order of the product images, click the Save button.
                </Typography>
            </Grid>
            {renderAlert}
            {
                productImages.map((productImage, i) => (
                    <ProductImage 
                        key={productImage.id}
                        index={i}
                        id={productImage.id}
                        productImageInfo={productImage}
                        moveProductImage={moveProductImage}
                    />
                ))
            }
            <Grid item xs={12}>
                <SubmitButton productImages={productImages} />
                &nbsp;
                <ProductViewButton productId={props.product.id} />
                &nbsp;
                <ProductListButton />
            </Grid>
            {
                orderUpdating ?
                <Grid item xs={12}>
                    <Typography variant='body2' color='textSecondary' align='left'>
                        Updating product images...
                    </Typography>
                    <CircularProgress size={48} color='primary'/>
                </Grid>
                :
                null
            }
        </Grid>
    );
}
export default Container;