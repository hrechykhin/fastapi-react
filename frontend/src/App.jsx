import React, {useEffect, useState} from 'react';
import {Menu, Spin} from 'antd';
import axios from "axios";
import CryptocurrencyCard from "./components/CryptocurrencyCard.jsx";


const App = () => {
    const [currencies, setCurrencies] = useState([]);
    const [currencyId, setCurrencyId] = useState(1);
    const [currencyData, setCurrencyData] = useState(null);

    const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000';



    const fetchCurrencies = () => {
        axios.get(`${API_BASE}/cryptocurrencies`).then(response => {
            const currenciesResponse = response.data;
            const menuItems = [
                {
                    key: 'g1',
                    label: 'Cryptocurrencies',
                    type: 'group',
                    children: currenciesResponse.map((item) => {
                            return {label: item.name, key: item.id}
                        }
                    ),
                }
            ]
            setCurrencies(menuItems)
        })
    }

    const fetchCurrency = () => {
        axios.get(`${API_BASE}/cryptocurrencies/${currencyId}`).then(response => {
            setCurrencyData(response.data)
        })
    }

    useEffect(() => {
        fetchCurrencies()
    }, [])

    useEffect(() => {
        setCurrencyData(null)
        fetchCurrency()
    }, [currencyId])


    const onClick = e => {
        console.log('click ', e);
        setCurrencyId(e.key)
    };
    return (
        <div className="flex">
            <Menu
                onClick={onClick}
                style={{width: 256}}
                defaultSelectedKeys={['1']}
                mode="inline"
                items={currencies}
                className="h-screen overflow-scroll"
            />
            <div className="mx-auto my-auto">
                {currencyData ? <CryptocurrencyCard currency={currencyData}/> : <Spin size="large"/>}
            </div>
        </div>

    );
};
export default App;