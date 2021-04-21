import React from 'react'
import { DndProvider } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import Container from './ProductImagesEdit/Container';
import {useSelector, useDispatch} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import {
    getProduct
} from '../../Actions/Product';
import {
    useParams
} from 'react-router-dom';
import ProductListButton from './Commons/ProductListButton';
import ProductViewButton from './Commons/ProductViewButton';
export default function ProductImagesEditForm(props) {
    const {product, loadingGet} = useSelector(state => state.product);
    const {id} = useParams();
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getProduct({
            id: id
        }))
    }, []);

    let renderComponent = () => {
        if(loadingGet){
            return <CircularProgress style={{margin: 'auto', alignSelf: 'center', textAlign: 'center'}} size={36} color='primary' />
        }else if(!loadingGet && (product === '' || product === null)){
            return (
                <React.Fragment>
                    <Typography component='p' variant='h5' gutterBottom>
                        Product not found. View product list for current products.
                    </Typography>
                    <ProductListButton />
                </React.Fragment>
                )
        }else if(!loadingGet && product.ProductImages.length === 0){
            return (
                <React.Fragment>
                    <Typography component='p' variant='h5' gutterBottom>
                        No images assigned to this product. Upload and assign an image before proceeeding.
                    </Typography>
                    <br />
                    <ProductViewButton productId={product.id} />
                    &nbsp;
                    <ProductListButton />
                </React.Fragment>
            )
        }else{
            return(
                <DndProvider backend={HTML5Backend}>
                    <Container product={product}/>
                </DndProvider>
            );
        }
    }

    return(
        <div>
            {renderComponent()}
        </div>
    );
}
