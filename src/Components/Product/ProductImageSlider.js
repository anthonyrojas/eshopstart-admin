import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
const tutorialSteps = [
    {
        label: 'San Francisco – Oakland Bay Bridge, United States',
        imgPath: 'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: 'Bird',
        imgPath: 'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: 'Bali, Indonesia',
        imgPath:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
    },
    {
        label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
        imgPath:
            'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: 'Goč, Serbia',
        imgPath:
            'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    },
];

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