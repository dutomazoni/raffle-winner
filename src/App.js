import './App.css'
import './App.scss';
import {Button, Container, Divider, Header, Icon, List, Modal, Segment, Table} from "semantic-ui-react";
import * as XLSX from 'xlsx';
import {useState} from "react";
import Loading from "./Loading";
import Fireworks from "fireworks/lib/react";
import {useScreenSize} from "./mediaQuery";


function App() {
    const [Response, setResponse] = useState([]);
    const [Load, setLoad] = useState(false);
    const [File, setFile] = useState(false);
    const [open, setOpen] = useState(false);
    const [winner, setWinner] = useState(0);
    const {isLarge} = useScreenSize();
    let fxProps1 = {
        count: 3,
        interval: 2000,
        colors: ['#cc3333', '#4CAF50', '#81C784'],
        calc: (props, i) => ({
            ...props,
            x: (i + 1) * (window.innerWidth / 2) - (i + 1) * 100,
            y:  Math.random() * 100 - 50 + (i === 2 ? -80 : 0)
        })
    }
    let fxProps2 = {
        count: 3,
        interval: 2000,
        colors: ['#f6e206', '#1bec1b', '#f65f31'],
        calc: (props, i) => ({
            ...props,
            x: (i + 1)  * 100,
            y: 300 + Math.random() * 100 - 50 + (i === 2 ? -80 : 0)
        })
    }
    let fxProps3 = {
        count: 3,
        interval: 2000,
        colors: ['#33a3cc', '#e526f3', '#e5ab8c'],
        calc: (props, i) => ({
            ...props,
            x: (i + 1) * (window.innerWidth*0.01) - (i + 1) * 100,
            y: 50 + Math.random() * 100 - 50 + (i === 2 ? -80 : 0)
        })
    }
    let fxProps4 = {
        count: 3,
        interval: 2000,
        colors: ['#ffffff', '#00e4ff', '#f10000'],
        calc: (props, i) => ({
            ...props,
            x: (i + 1)  * 100,
            y: -200 + Math.random() * 100 - 50 + (i === 2 ? -80 : 0)
        })
    }
    const onChange = (event) => {
        setFile(true)
        setLoad(true)
        setResponse([])
        console.log(event)
        const file = event.target.files[0]
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (e) => {
            const bufferArray = e.target.result;
            const wb = XLSX.read(bufferArray, {type: "buffer"});
            const wsname = wb.SheetNames[0]
            const ws = wb.Sheets[wsname]
            let formattedData = [];
            const data = XLSX.utils.sheet_to_json(ws)
            data.forEach((dados) => {
                if(dados["Nome"] && dados["Número"]){
                    let resposta = {
                        nome: dados["Nome"].toString(),
                        numero: dados["Número"].toString(),
                    };
                    formattedData.push(resposta)
                }
            })
            setResponse(formattedData)
            setLoad(false)
        }

    }

    return (
        <div className={"container"}>
            <div style={{display: "flex", minHeight: "10vh", flexDirection:"column"}}>
                <Header style={{margin: "auto", fontSize: "4rem", color: "#00324F"}}>Sortito</Header>
                <Header sub style={{margin: "auto", color: "#00324F",  fontSize: "1.5rem"}}>Seu site de sorteio favorito</Header>
            </div>
            <Divider horizontal/>
            <div>
                <div className={"Center"}>
                    <br/>
                    <p>Passo 1: Faça o download do arquivo modelo.</p>
                    <button className={"downloadButton"}><a download={"modelo-rifa.xlsx"}
                                                            href={"data:application/pdf;base64,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apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMwqaauWvW7apWuGlMw6bN0dQr/ezddNaZgUk1dtep31SpdNaZgUk1dtep31SpdNaZgUk1dtep31SpdNaZgUk1dtep31SpdNaZgUk1dtep31SpdNaZgUk1dtep31SpdNaZgUk1dtep31SpdNaZgUk1dtep31SpdNaZgUk1dtep31SpdNaZgUk1dtep31SpdNaZgUk1dtep31SpdNaZgUk1dtep31SpdNaZgUk1dtep31SpdNaZgUk1dtep31SpdNaZgUk1dtep31SpdNaZgUk1dtep31SpdNaZgUk1dtep31SpdNaZgUk1dtep31SpdNaZgUk1dtep31SpdNaZgUk1dtep31SpdNaZgUk1dtep31SpdNaZgUk1dtep31SpdNaZgUk1dtep31SpdNaZgUk1dteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZgUktdteZ31RpdNaZg0mfp6hT+9266akzBpJa6as3vqjW6akzBpJa6as3vqjW6akzBpJa6as3vqjW6akzBpJa6as3vqjW6akzBpJa6as3vqjW6akzBpJa6as3vqjW6akzBpJa6as3vqjW6akzBpJa6as3vqjW6akzBpJa6as3vqjW6akzBpJa6as3vqjW6akzBpJa6as3vqjW6akzBpJa6as3vqjW6akzBpJa6as3vqjW6akzBpJa6as3vqjW6akzBpJa6as3vqjW6akzBpJa6as3vqjW6akzBpJa6as3vqjW6akzBpJa6as3vqjW6akzBpJa6as3vqjW6akzBpJa6as3vqjW6akzBpJa6as3vqjW6akzBpJa6as3vqjW6akzBpJa6as3vqjW6akzBpJa6at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpJ66at3vqnW6akzBpM/S1Sn879101ZiCST111brfVet01ZiCST111brfVet01ZiCST111brfVet01ZiCST111brfVet01ZiCST111brfVet01ZiCST111brfVet01ZiCST111brfVet01ZiCST111brfVet01ZiCST111brfVet01ZiCST111brfVet01ZiCST111brfVet01ZiCST111brfVet01ZiCST111brfVet01ZiCST111brfVet01ZiCST111brfVet01ZiCST111brfVet01ZiCST111brfVet01ZiCST111brfVet01ZiCST111brfVet01ZiCST111brfVet01ZiCST111brfVet01ZiCST111brfVet01ZiCST111brfVet01ZiCST111YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSSN11YbfVRt01ZiCSZ+lq1P437vpqjEFk0bqqg2/qzboqjEFk0bqqg2/qzboqjEFk0bqqg2/qzboqjEFk0bqqg2/qzboqjEFk0bqqg2/qzboqjEFk0bqqg2/qzboqjEFk0bqqg2/qzboqjEFk0bqqg2/qzboqjEFk0bqqg2/qzboqjEFk0bqqg2/qzboqjEFk0bqqg2/qzboqjEFk0bqqg2/qzboqjEFk0bqqg2/qzboqjEFk0bqqg2/qzboqjEFk0bqqg2/qzboqjEFk0bqqg2/qzboqjEFk0bqqg2/qzboqjEFk0bqqg2/qzboqjEFk0bqqg2/qzboqjEFk0bqqg2/qzboqjEFk0bqqg2/qzboqjEFk0bqqg2/qzboqjEFk0bqqg2/qzboqjEFk0bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFk2bqqk2/qzbpqjEFkz5LV6fwv3fTVWMKJs3UVZt+V23SVWMKJs3UVZt+V23SVWMKJs3UVZt+V23SVWMKJs3UVZt+V23SVWMKJs3UVZt+V23SVWMKJs3UVZt+V23SVWMKJs3UVZt+V23SVWMKJs3UVZt+V23SVWMKJs3UVZt+V23SVWMKJs3UVZt+V23SVWMKJs3UVZt+V23SVWMKJs3UVZt+V23SVWMKJs3UVZt+V23SVWMKJs3UVZt+V23SVWMKJs3UVZt+V23SVWMKJs3UVZt+V23SVWMKJs3UVZt+V23SVWMKJs3UVZt+V23SVWMKJs3UVZt+V23SVWMKJs3UVZt+V23SVWMKJs3UVZt+V23SVWMKJs3UVZt+V23SVWMKJs3UVZt+V23SVWMKJs3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJq3UVVt+V23RVWMKJn2Wrk7hf++mq8YUTFqpq7b8rtqiq8YUTFqpq7b8rtqiq8YUTFqpq7b8rtqiq8YUTFqpq7b8rtqiq8YUTFqpq7b8rtqiq8YUTFqpq7b8rtqiq8YUTFqpq7b8rtqiq8YUTFqpq7b8rtqiq8YUTFqpq7b8rtqiq8YUTFqpq7b8rtqiq8YUTFqpq7b8rtqiq8YUTFqpq7b8rtqiq8YUTFqpq7b8rtqiq8YUTFqpq7b8rtqiq8YUTFqpq7b8rtqiq8YUTFqpq7b8rtqiq8YUTFqpq7b8rtqiq8YUTFqpq7b8rtqiq8YUTFqpq7b8rtqiq8YUTFqpq7b8rtqiq8YUTFqpq7b8rtqiq8YUTFqpq7b8rtqiq8YUTFqpq7b8rtqiq8YUTFqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTNqpq7b9rtqmq8YUTPosXZ3C/95NV40pmLRTV237XbVNV40pmLRTV237XbVNV40pmLRTV237XbVNV40pmLRTV237XbVNV40pmLRTV237XbVNV40pmLRTV237XbVNV40pmLRTV237XbVNV40pmLRTV237XbVNV40pmLRTV237XbVNV40pmLRTV237XbVNV40pmLRTV237XbVNV40pmLRTV237XbVNV40pmLRTV237XbVNV40pmLRTV237XbVNV40pmLRTV237XbVNV40pmLRTV237XbVNV40pmLRTV237XbVNV40pmLRTV237XbVNV40pmLRTV237XbVNV40pmLRTV237XbVNV40pmLRTV237XbVNV40pmLRTV237XbVNV40pmLRTV237XbVNV40pmLRTV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmHRSV+34XbVDV40pmPRZujqF/72brhpTMOmkrtrxu2qHrhpTMOmkrtrxu2qHrhpTMOmkrtrxu2qHrhpTMOmkrtrxu2qHrhpTMOmkrtrxu2qHrhpTMOmkrtrxu2qHrhpTMOmkrtrxu2qHrhpTMOmkrtrxu2qHrhpTMOmkrtrxu2qHrhpTMOmkrtrxu2qHrhpTMOmkrtrxu2qHrhpTMOmkrtrxu2qHrhpTMOmkrtrxu2qHrhpTMOmkrtrxu2qHrhpTMOmkrtrxu2qHrhpTMOmkrtrxu2qHrhpTMOmkrtrxu2qHrhpTMOmkrtrxu2qHrhpTMOmkrtrxu2qHrhpTMOmkrtrxu2qHrhpTMOmkrtrxu2qHrhpTMOmkrtrxu2qHrhpTMOmkrtrxu2qHrhpTMOmkrlp56YfVPj3n5+e40eJG0+ft01G+/PD93d2jXj2++uar9w9v3j3+0/vHN/fvPnzx/d2r12/e/fHDL9f4x4c3r3/3dJFP5fHhx1+H3989/ty+v39482/37x5fvY27d493D88H+PSRP989PL759tf90+M+Xcn7V3+8+2+vHv745ulp39599/RgL3/z/AOrD5/u0affPN6/f/7l8x39w/3j0y38+XfPF3r38Py7Ucou5WVts9aXz9/t+d39/ePtD/30rE9X/uP7L96/en/38Ps3/3b39IX5dH+eLvLu44v79ABvHv/5/l/evH78/in89NufX7qnDz8/xD89fHz2+6fz/fP3d+90/5d3T6/nw5unY756vpNfv3h///D48OrN49OFv3317Z/+87vX//L9m8e7X27s64dX3/3tS+Hbu7dv4/6HH57+/NOdfnf/7rO7qvdvnl6+50v7+X7+rXx7//7N86tTnk/36a789uMN+OL1m+++e7rn7x5/++bhw9+e6pf8T69f/z9//tvX6Ddf3b9+/Y8fH+DpC+RXv3765adH/JR/+fWvn+zpt3+5f/jTxy+rb/5/UEsHCIjaCjakNgAAohIDAFBLAQIUABQACAgIADm6nlSFmjSa7gAAAM4CAAALAAAAAAAAAAAAAAAAAAAAAABfcmVscy8ucmVsc1BLAQIUABQACAgIADm6nlS0j9VYEwIAALgDAAAPAAAAAAAAAAAAAAAAACcBAAB4bC93b3JrYm9vay54bWxQSwECFAAUAAgICAA5up5UvLlr/s8CAAAkFgAADQAAAAAAAAAAAAAAAAB3AwAAeGwvc3R5bGVzLnhtbFBLAQIUABQACAgIADm6nlRddp1xuAMAAH0JAAAYAAAAAAAAAAAAAAAAAIEGAAB4bC93b3Jrc2hlZXRzL3NoZWV0MS54bWxQSwECFAAUAAgICAA5up5UMZNlVLgAAAAhAQAAFAAAAAAAAAAAAAAAAAB/CgAAeGwvc2hhcmVkU3RyaW5ncy54bWxQSwECFAAUAAgICAA5up5UcOWw6doAAACyAgAAGgAAAAAAAAAAAAAAAAB5CwAAeGwvX3JlbHMvd29ya2Jvb2sueG1sLnJlbHNQSwECFAAUAAgICAA5up5U/fRwW1IBAACKAgAAEQAAAAAAAAAAAAAAAACbDAAAZG9jUHJvcHMvY29yZS54bWxQSwECFAAUAAgICAA5up5U9BSp9BABAAC6AQAAEAAAAAAAAAAAAAAAAAAsDgAAZG9jUHJvcHMvYXBwLnhtbFBLAQIUABQACAgIADm6nlTh1gCAlwAAAPEAAAATAAAAAAAAAAAAAAAAAHoPAABkb2NQcm9wcy9jdXN0b20ueG1sUEsBAhQAFAAICAgAObqeVD4CnpprAQAAXAYAABMAAAAAAAAAAAAAAAAAUhAAAFtDb250ZW50X1R5cGVzXS54bWxQSwECFAAUAAgICAA5up5UiNoKNqQ2AACiEgMAGAAAAAAAAAAAAAAAAAD+EQAAeGwvd29ya3NoZWV0cy9zaGVldDIueG1sUEsFBgAAAAALAAsAxgIAAOhIAAAAAA=="}
                    >DOWNLOAD MODELO</a></button>
                    <br/><br/>
                    <span
                        style={{marginLeft: "45px"}}>OBS: Colunas além de Nome e Número serão <strong>DESCONSIDERADAS</strong>.</span>
                    <br/><br/>
                </div>
                <div className={"Center"}>
                    <p>Passo 2: Escolha o arquivo com os dados para o sorteio.</p>
                    <br/>
                    <input type="file" id="file" style={{marginLeft: "45px"}} onClick={(e) => {
                        setLoad(true)
                        if (e.target.value.length === 0 && File) {
                            setLoad(false)
                        }
                    }}
                           onChange={(e) => onChange(e)}/>
                    <br/>
                    <br/>
                    <br/>
                </div>
                <div style={isLarge ? {display: "flex", flexDirection: "row"} : {display: "flex", flexDirection: "column"}}>
                    <div className={"Center"}>
                        <p>Passo 3: Verifique os dados preenchidos.</p>
                        <span
                            style={{marginLeft: "45px"}}>OBS: Caso os dados estejam errados, voltar para o <strong>PASSO 2</strong>.</span>
                        <br/>
                    </div>
                    <div className={"Center"}>
                        <br/>
                        <button className={"downloadButton"} onClick={() => {
                            if(Response.length > 0) {
                                setWinner(Math.floor(Math.random() * (Response.length - 1)) + 1);
                                setOpen(true)
                            }else {
                                alert("Insira um documento válido!")
                            }
                        }}>REALIZAR SORTEIO
                        </button>
                        <br/>
                        <br/>
                        {open &&
                        <Modal
                            closeIcon
                            size={"tiny"}
                            open={open}
                            onClose={() => setOpen(false)}
                        >
                            <Modal.Header>PARABÉNS!!!</Modal.Header>
                            <Modal.Content>
                                <p>O vencedor é:</p>
                                <h1 style={{margin: "0 0 0 35%"}}>{Response[winner].nome}</h1>
                                <h2 style={{margin: "0 0 0 50%"}}>{Response[winner].numero}</h2>
                                <Fireworks {...fxProps1} />
                                <Fireworks {...fxProps2} />
                                <Fireworks {...fxProps3} />
                                <Fireworks {...fxProps4} />
                            </Modal.Content>

                        </Modal>}

                    </div>
                </div>
                <div className={"Center"}>
                    {Response.length > 0 ?
                        <p>Foram encontrados {Response.length} números.</p> : File ?
                            <p>Insira um arquivo válido!</p> : <></>
                    }
                </div>
                {Response.length > 0 ?
                    <div className={"CenterTable"}>
                        <Table compact="very" style={{margin: "2vh"}}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Nome</Table.HeaderCell>
                                    <Table.HeaderCell>Número</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {
                                    Response
                                        .map((i, index) => {
                                            return (
                                                <Table.Row key={index}>
                                                    <Table.Cell>{i.nome}</Table.Cell>
                                                    <Table.Cell>{i.numero}</Table.Cell>
                                                </Table.Row>
                                            )
                                        })
                                }
                            </Table.Body>
                        </Table>
                    </div> : <></>
                }
                {Load && (
                    <>
                        <Loading/>
                    </>
                )}
            </div>

            <footer className={"footer"}>
                <Segment inverted vertical style={{ padding: '0.5em 0em' }}>
                    <span style={{margin: "1vmin"}}>Contate o desenvolvedor</span>
                    <Button circular color="linkedin" icon="linkedin" style={{margin: "1vmin"}} as={"a"} href={"https://www.linkedin.com/in/eduardo-tomazoni-7652ba1b6/"}/>
                    <Button circular color="github" icon="github" style={{margin: "1vmin"}} as={"a"} href={"https://github.com/dutomazoni/"}/>
                    <Button circular color="green" icon="whatsapp" style={{margin: "1vmin"}} as={"a"} href={"https://mywhats.net/dutomazoni"}/>
                </Segment>
            </footer>
        </div>
    );
}

export default App;
