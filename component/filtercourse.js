
'use client';
import { Label,Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "@/app/page.module.css";
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';
export default function FilterCourse() {
    return (
        <>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5vw" }} className={styles.fontp}>
                <h2 className={styles.fonth}>Course Categories</h2>
                <div>
                    <Input type="checkbox"

                        onChange={e => set3to5(e.target.value)}
                        value={'Age 3-5'}
                        id="3to5"
                    />
                    {' '}
                    <Label check>
                        Age 3-5
                    </Label>
                    <br />
                </div>
                <div>
                    <Input type="checkbox"

                        onChange={e => set5to9(e.target.value)}
                        value={'Age 5-9'}
                        id="5to9"
                    />
                    {' '}
                    <Label check>
                        Age 5-9
                    </Label>
                    <br />
                </div>
                <div>
                    <Input type="checkbox"

                        onChange={e => set6to8(e.target.value)}
                        value={'Age 9-15'}
                        id="9to15"
                    />
                    {' '}
                    <Label check>
                        Age 9-15
                    </Label>
                    <br />
                </div>
               
            </div>
            <br />
            <br />
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5vw" }}>
                <h2 className={styles.fonth}>Review</h2>
                <div>
                    <Input type="checkbox"

                        onChange={e => setstar5(e.target.value)}
                        value={'5'}
                        id="5star"
                    />
                    {' '}
                    <Label check>
                        <FaStar style={{ color: "gold", margin: "0 2px" }} />
                        <FaStar style={{ color: "gold", margin: "0 2px" }} />
                        <FaStar style={{ color: "gold", margin: "0 2px" }} />
                        <FaStar style={{ color: "gold", margin: "0 2px" }} />
                        <FaStar style={{ color: "gold", margin: "0 2px" }} />
                    </Label>
                    <br />
                </div>
                <div>
                    <Input type="checkbox"

                        onChange={e => setstar4(e.target.value)}
                        value={'4'}
                        id="4star"
                    />
                    {' '}
                    <Label check>
                        <FaStar style={{ color: "gold", margin: "0 2px" }} />
                        <FaStar style={{ color: "gold", margin: "0 2px" }} />
                        <FaStar style={{ color: "gold", margin: "0 2px" }} />
                        <FaStar style={{ color: "gold", margin: "0 2px" }} />
                        <FaStar style={{ color: "rgba(128, 128, 128, 0.5)", margin: "0 2px" }} />
                    </Label>
                    <br />
                </div>
                <div>
                    <Input type="checkbox"

                        onChange={e => setstar3(e.target.value)}
                        value={'3'}
                        id="3star"
                    />
                    {' '}
                    <Label check>
                        <FaStar style={{ color: "gold", margin: "0 2px" }} />
                        <FaStar style={{ color: "gold", margin: "0 2px" }} />
                        <FaStar style={{ color: "gold", margin: "0 2px" }} />
                        <FaStar style={{ color: "rgba(128, 128, 128, 0.5)", margin: "0 2px" }} />
                        <FaStar style={{ color: "rgba(128, 128, 128, 0.5)", margin: "0 2px" }} />
                    </Label>
                    <br />
                </div>
                <div>

                    <Input type="checkbox"

                        onChange={e => setstar2(e.target.value)}
                        value={'2'}
                        id="2star"
                    />
                    {' '}
                    <Label check>
                        <FaStar style={{ color: "gold", margin: "0 2px" }} />
                        <FaStar style={{ color: "gold", margin: "0 2px" }} />
                        <FaStar style={{ color: "rgba(128, 128, 128, 0.5)", margin: "0 2px" }} />
                        <FaStar style={{ color: "rgba(128, 128, 128, 0.5)", margin: "0 2px" }} />
                        <FaStar style={{ color: "rgba(128, 128, 128, 0.5)", margin: "0 2px" }} />
                    </Label>
                    <br />
                </div>
                <div>
                    <Input type="checkbox"

                        onChange={e => setstar1(e.target.value)}
                        value={'1'}
                        id="1star"
                    />
                    {' '}
                    <Label check>
                        <FaStar style={{ color: "gold", margin: "0 2px" }} />
                        <FaStar style={{ color: "rgba(128, 128, 128, 0.5)", margin: "0 2px" }} />
                        <FaStar style={{ color: "rgba(128, 128, 128, 0.5)", margin: "0 2px" }} />
                        <FaStar style={{ color: "rgba(128, 128, 128, 0.5)", margin: "0 2px" }} />
                        <FaStar style={{ color: "rgba(128, 128, 128, 0.5)", margin: "0 2px" }} />
                    </Label>
                </div>
            </div>
            <br />
            <br />
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5vw" }}>

                <h2 className={styles.fonth}>All Levels</h2>
                <div>
                    <Input type="checkbox"

                        onChange={e => setbeginner(e.target.value)}
                        value={'Beginner'}
                        id="beginner"
                    />
                    {' '}
                    <Label check>
                        Beginner
                    </Label>
                    <br />
                </div>

                <div>
                    <Input type="checkbox"

                        onChange={e => setmedium(e.target.value)}
                        value={'intermediate'}
                        id="intermediate"
                    />
                    {' '}
                    <Label check>
                        Intermediate
                    </Label>
                    <br />
                </div>

                <div>
                    <Input type="checkbox"

                        onChange={e => setexpert(e.target.value)}
                        value={'expert'}
                        id="expert"
                    />
                    {' '}
                    <Label check>
                        Expert
                    </Label>
                    <br />
                </div>
            </div>
        </>

    );
}