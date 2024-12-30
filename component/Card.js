import {
    Card,
    CardImg,
    CardBody,
    Button,
} from 'reactstrap';
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Cards = ({ product }) => {
    const router = useRouter();

    const handleproduct = (id) => {
        router.push(`/product/${id}`);
    }

    return (
        <Card
            onClick={() => handleproduct(product.id)}
            style={{
                minWidth: '250px',
                maxWidth: '250px',
                border: "none",
                cursor: "pointer"
            }}
        >
            <CardImg
                alt={product.product_name}
                src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${product.product_image}` || 'profile.png'}
                top
                width="100%"
                height="200px"
            />
            <CardBody style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: 'bold' }}>
                    <p style={{margin:'0px',padding:'0px'}}>{product.product_name}</p>
                    {product.rating > 0 && (
                        <div style={{ display: 'flex', fontSize: '30px' }}>
                            {Array.from({ length: product.rating }).map((_, index) => (
                                <FaStar key={index} style={{ color: 'gold' }} />
                            ))}

                        </div>
                    )}

                </div>
                <Button>
                    ${product.price}
                </Button>
            </CardBody>
        </Card>
    );
};

export default Cards;



