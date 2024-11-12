import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Container } from 'react-bootstrap';
import Image from 'next/image';

const ImageCarousel = () => {
    const images = [
        'https://static.wixstatic.com/media/b71048_8ff483d6d7344d788dd0c9893ee1c5f6~mv2.png/v1/fill/w_503,h_538,al_c,lg_1,q_85,enc_auto/Picture7_edited.png',
        'https://static.wixstatic.com/media/b71048_d55c490ceccc4191a48e075d0b728bd0~mv2.png/v1/fill/w_433,h_568,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Picture22_edited.png',
        'https://static.wixstatic.com/media/b71048_b3c35cc3b76b4a97835a6a7a11cb8a9c~mv2.png/v1/fill/w_576,h_491,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Picture31.png',
        'https://static.wixstatic.com/media/b71048_3e22834e6da14209868096ed056deb3c~mv2.png/v1/fill/w_410,h_347,al_c,lg_1,q_85,enc_auto/Picture53_edited.png',
        'https://static.wixstatic.com/media/b71048_b7ef7fab7cf74bc6aabfaf29fd07c0e8~mv2.png/v1/fill/w_576,h_390,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Picture27_edited.png',
        'https://static.wixstatic.com/media/b71048_9c3375f57b61406c91d32b0d7f078702~mv2.png/v1/fill/w_346,h_365,al_c,lg_1,q_85,enc_auto/Picture67_edited.png'
    ];

    return (
        <Container className='container-fluid'>
            <Carousel
                indicators={false}  // Disable indicators if not needed
                interval={3000}     // Set interval between slides
                controls={false}     // Enable/Disable next/prev buttons
                style={{ width: "100%", display: "flex", alignItems: "center" }}
                className='container-fluid'
            >
                {/* Display images in groups of 3 */}
                <Carousel.Item>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '50px' }}>
                        {images.slice(0, 3).map((image, index) => (
                            <div key={index} style={{ width: '200px' }} className='container-fluid'>
                                <Image width={150} height={150} className="d-block"
                                    src={image}
                                    alt={`Slide ${index}`} />
                            </div>
                        ))}
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '50px' }}>
                        {images.slice(3, 6).map((image, index) => (
                            <div key={index} style={{ width: '200px' }} className='container-fluid'>
                                <Image width={150} height={150} className="d-block"
                                    src={image}
                                    alt={`Slide ${index}`} />
                            </div>
                        ))}
                    </div>
                </Carousel.Item>
            </Carousel>
        </Container>
    );
};

export default ImageCarousel;


