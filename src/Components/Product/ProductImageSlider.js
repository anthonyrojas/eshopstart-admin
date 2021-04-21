import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import EditIcon from '@material-ui/icons/Edit';
import {Link as RouterLink, useParams} from 'react-router-dom';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import ProductImageAddDialog from './ProductImageAddDialog';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
        flexGrow: 1,
    },
    img: {
        minHeight: 200,
        maxWidth: '100%',
        overflow: 'hidden',
        display: 'block',
        width: '100%',
    },
}));

const ProductImageSlider = (props) => {
    const {id} = useParams();
    const classes = useStyles();
    const theme = useTheme();
    const {product} = useSelector(state => state.product);
    const [activeStep, setActiveStep] = React.useState(0);
    const [openImageDialog, setOpenImageDialog] = React.useState(false);
    const maxSteps = props.productImages.length;
    const handleNext = () => {
        if(activeStep + 1 >= maxSteps){
            setActiveStep(0);
        }else{
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };
    const handleBack = () => {
        if(activeStep === 0){
            setActiveStep(maxSteps - 1);
        }else{
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };
    let productImages = product.ProductImages;
    if (productImages.length === 0) {
        productImages = [{
            url: '/uploads/noimage.png',
            label: 'No product images found'
        }];
    }
    const imgSrc = productImages[activeStep].url.includes('https://') || productImages[activeStep].url.includes('http://') ? productImages[activeStep].url : `${process.env.REACT_APP_API_URI}/${productImages[activeStep].url}`;
    return(
        <div className={classes.root}>
            <img
                className={classes.img}
                src={imgSrc}
                alt={props.label}
            />
            <MobileStepper
                steps={maxSteps}
                position="static"
                variant="text"
                activeStep={activeStep}
                nextButton={
                <Button size="small" onClick={handleNext}>
                    Next
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
                }
                backButton={
                <Button size="small" onClick={handleBack}>
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                    Back
                </Button>
                }
            />
            <div>
                <br />
                <Button variant='text' color='primary' component={RouterLink} to={`/product-image-edit/${id}`}>
                    <EditIcon />&nbsp;Edit Images
                </Button>
                &nbsp;
                <Button variant='text' color='primary' align='right' onClick={() => setOpenImageDialog(!openImageDialog)}>
                    <ControlPointIcon />&nbsp;Add Image
                </Button>
                <ProductImageAddDialog opened={openImageDialog} setOpenImageDialog={setOpenImageDialog} />
            </div>
        </div>
    );
};
export default ProductImageSlider;