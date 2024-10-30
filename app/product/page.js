
'use client';
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";

export default function Product() {
    const [source1, setSource1] = useState('https://static.wixstatic.com/media/b71048_383a88c72a9a4982b0a67cac0a72ce50~mv2.png/v1/fill/w_384,h_437,al_c,lg_1,q_85,enc_auto/Picture28.png');

    const handleImage = (source) => {
        setSource1(source);
    };

    return (
        <>
            <br />
            <br />
            <div style={{ display: "flex", justifyContent: "space-evenly", gap: "20px", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <Image 
                        src='https://static.wixstatic.com/media/b71048_18a9a376102c4a95aee105370a14fc9d~mv2.jpg'
                        width={50}
                        height={50}
                        alt="Image 1"
                        onClick={() => handleImage('https://static.wixstatic.com/media/b71048_18a9a376102c4a95aee105370a14fc9d~mv2.jpg')}
                    />
                    <Image 
                        src='https://static.wixstatic.com/media/b71048_383a88c72a9a4982b0a67cac0a72ce50~mv2.png/v1/fill/w_384,h_437,al_c,lg_1,q_85,enc_auto/Picture28.png'
                        width={50}
                        height={50}
                        alt="Image 2"
                        onClick={()=>handleImage('https://static.wixstatic.com/media/b71048_383a88c72a9a4982b0a67cac0a72ce50~mv2.png/v1/fill/w_384,h_437,al_c,lg_1,q_85,enc_auto/Picture28.png')}
                    />
                    <Image 
                        src='https://static.wixstatic.com/media/b71048_d55c490ceccc4191a48e075d0b728bd0~mv2.png'
                        width={50}
                        height={50}
                        alt="Image 3"
                        onClick={() => handleImage('https://static.wixstatic.com/media/b71048_d55c490ceccc4191a48e075d0b728bd0~mv2.png')}
                    />
                </div>

                <div style={{ width: "50vw" }}>
                    <Image 
                        src={source1}
                        width={600}
                        height={550}
                        alt="Main Product"
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", margin: "20px" }}>
                        <button className="btn btn-primary">Add to cart</button>
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>

                <div style={{ width: "50vw" }}>
                    <div>$200</div>
                    <div>
                        <strong>Product Details</strong> <br />
                        Name: Aluminium Gujiya and Modak Maker Mould Pack of 2 <br />
                        Material: Aluminium <br />
                        Product Breadth: 10 cm <br />
                        Product Height: 10 cm <br />
                        Product Length: 10 cm <br />
                        Net Quantity (N): Pack Of 2 <br />
                        Country of Origin: India
                    </div>
                </div>
            </div>
        </>
    );
}
