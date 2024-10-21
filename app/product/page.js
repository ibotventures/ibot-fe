import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Product() {
    return (
        <>
        <br/>
        <br/>
            <div style={{ display: "flex", justifyContent: "space-evenly",gap:"20px",alignItems:"center" }}>
                <div style={{ width: "50vw" }}>
                    <Image src="https://static.wixstatic.com/media/b71048_18a9a376102c4a95aee105370a14fc9d~mv2.jpg/v1/fill/w_961,h_583,al_c,q_85,enc_auto/b71048_18a9a376102c4a95aee105370a14fc9d~mv2.jpg" width={600} height={550}></Image>
                    <div style={{ display: "flex", justifyContent: "space-between",margin:"20px" }}>
                        <button className="btn btn-primary">
                            Add to cart
                        </button>
                        <button className="btn btn-primary">
                            Buy Now
                        </button>

                    </div>
                </div>
                <div style={{width:"50vw"}}>
                    <div>
                        $200
                    </div>
                    <div>
                        Product Details <br></br>
                        Name : Aluminium gujiya and Modak Maker Mould Pack of 2. <br></br>
                        Material : Aluminium <br></br>
                        Product Breadth : 10 Cm <br></br>
                        Product Height : 10 Cm <br></br>
                        Product Length : 10 Cm <br></br>
                        Net Quantity (N) : Pack Of 2 <br></br>

                        Country of Origin : India
                    </div>

                </div>
            </div>

        </>
    );
}