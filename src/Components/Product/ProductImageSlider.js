import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

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
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
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
    let productImages = props.productImages;
    if (productImages.length === 0) {
        productImages.push({
            url: '/uploads/noimage.png'
        });
    }
    return(
        <div className={classes.root}>
            <img
                className={classes.img}
                src={`${process.env.REACT_APP_API_URI}/${productImages[activeStep].url}`}
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
        </div>
    );
};
export default ProductImageSlider;