import 'bootstrap/dist/css/bootstrap.min.css';
import {
    CardColumns,
    Card,
    CardImg,
    CardBody,
    CardText,
    Button
} from 'reactstrap';
import { useRouter } from "next/navigation";
const Cards = () => {
    const handleClick = () => {
        router.push('/product');
    };
    const router = useRouter();
    return (
        <CardColumns onClick={handleClick}
            style={{
                width: '20rem'
            }}
        >
            <Card style={{ border: "none",cursor:"pointer" }}>
                <CardImg
                    alt="Card image cap"
                    src="https://static.wixstatic.com/media/b71048_c0046375806145e09c680131b4e10b0d~mv2.png/v1/fill/w_815,h_574,al_c,lg_1,q_90,enc_auto/b71048_c0046375806145e09c680131b4e10b0d~mv2.png"
                    top
                    width="100%"
                />
                <CardBody>
                    {/* <CardTitle tag="h5">
                        
                    </CardTitle> */}
                    {/* <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                    >
                        Card subtitle
                    </CardSubtitle> */}
                    <CardText>
                        This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                    </CardText>
                    <Button>
                        $200
                    </Button>
                </CardBody>
            </Card>

        </CardColumns>
    );
};
export default Cards;
