import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Card,
    CardImg,
    CardBody,
    CardText,
    Button,
    CardHeader
} from 'reactstrap';
import { useRouter } from "next/navigation";

const Cards = ({ product }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/product');
    };

    return (
        <Card
            onClick={handleClick}
            style={{
                minWidth: '210px',
                maxWidth:'250px',
                border: "none",
                cursor: "pointer"
            }}
        >
            <CardImg
                alt={product.product_name}
                src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${product.product_image}`||'profile.png'}
                top
                width="100%"
            />
            <CardBody>
                <CardHeader>
                    {product.product_name}
                </CardHeader>
                <CardText>
                    {product.description}
                </CardText>
                <Button>
                    ${product.price}
                </Button>
            </CardBody>
        </Card>
    );
};

export default Cards;
