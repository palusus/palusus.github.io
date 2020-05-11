import React from "react";
import {Bullseye, Button, EmptyState} from "@patternfly/react-core";
import {textCenter} from "@patternfly/react-table";

const Landing = ( {setView} ) =>
    <div>
    <div style={{ float: "right", width: "28%", margin: "1%" }}>
        <img src="https://cdn.pixabay.com/photo/2020/03/31/14/04/covid-19-4987797_960_720.jpg" alt="" style={{ float: "left" }} />
        <img
            src="https://i.redd.it/q4dgjo77y6n41.jpg"
            alt='When you find out your daily lifestyle is called "quarantine"'
            style={{ float: "left" }}
        />
    </div>
        <Bullseye>
            <div>
                <br />
                <br />
                <br />
                <h1><b>What is this app about?</b></h1>
            <p>The serious coronavirus app was created to help you with research of COVID-19 pandemic data.</p>
            <p>It offers interesting ways to organize publicly available data about the pandemic.</p><br />

                <Button onClick={() => setView("table")}>Start your research</Button>

                <br />
                <br />
                <br />
                <h1><b>What is coronavirus?</b></h1>
                <p>I believe you are gifted enough to google it yourself.</p><br />
                <br />
                <br />
                <h1><b>I am not gifted enough to google coronavirus. Help!</b></h1>
                <p>If you understand Czech language, you can check very trustworthy journaling website AZ247</p>
                <p>Otherwise, the only thing you can do is to enjoy coronavirus memes</p>
                <a href="https://az247.cz/category/panikakolemkoronaviru/">AZ247 coronavirus articles <i>[Czech]</i></a><br />
                <a href="https://www.reddit.com/r/CoronavirusMemes/top/?t=all">Best coronavirus memes</a><br />
                <br />
                <br />
                <img width="50%" src="https://cdn.pixabay.com/photo/2020/03/27/20/00/shopping-4974738_960_720.jpg" alt="tiny shopping wheel with toilet paper"/>
            </div>
        </Bullseye>
    </div>


export default Landing;
