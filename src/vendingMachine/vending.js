import { useState } from 'react';
import './vending.scss';
import Modal from '../layout/modal';
import milkis from '../img/milkis.jpg'
import galbae from '../img/galbae.jpg'
import sprite from '../img/sprite.jpg'
import bongbong from '../img/bongbong.jpg'
import coke from '../img/coke.jpg'
import gatorade from '../img/gatorade.jpg'
import fanta from '../img/fanta.jpg'
import coffee from '../img/coffee.jpg'

import VendingData from './data/VendingData';

function Vending() {
    let [drinks, setDrinks] = useState([
        {name: "밀키스", img: milkis, price: "1000"},
        {name: "갈아만든 배", img: galbae, price: "1200"},
        {name: "칠성사이다", img: sprite, price: "2000"},
        {name: "포도봉봉", img: bongbong, price: "1500"},
        {name: "코카콜라", img: coke, price: "2000"},
        {name: "게토레이", img: gatorade, price: "1500"},
        {name: "환타", img: fanta, price: "2000"},
        {name: "레쓰비", img: coffee, price: "800"},
    ]);

    // let [drinkTitle, setDrinkTitle] = useState(["밀키스", "갈아만든 배", "칠성사이다", "포도봉봉", "코카콜라", "게토레이", "환타", "레쓰비"]);
    // let [drinkImg, setDrinkImg] = useState([milkis, galbae, sprite, bongbong, coke, gatorade, fanta, coffee]);
    // let [drinkPrice, setDrinkPrice] = useState(["1000", "1200", "2000", "1500", "2000", "1500", "2000", "800"]);
    let [drinkAddPop, setDrinkAddPop] = useState(false);

    let changeName = () => {
        let drinkname = [...drinks];
        drinkname[1] = {name: "갈배", img: galbae, price: "1200"};
        setDrinks(drinkname);
    }

    let popUpOpen = () => {
        setDrinkAddPop(!drinkAddPop);
    }

    return (
        <div className={drinkAddPop ? 'wrap activePop' : 'wrap'}>
            <div className="vendingTitle">
                <span>음료수 자판기</span>
            </div>
            <div className="vendingMarchineWrap">
                <div className="machineProductWrap">
                    {
                        drinks.map(function(drink, i){
                            return(
                                <div className="productBox" key={i}>
                                    <img src={drink.img} alt=""/>
                                    <span>{drink.name}</span>
                                    <p className="item">{drink.price}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="machineEtc">
                    <div className="drinkExit">
                        <p>상품 : </p>
                    </div>
                    <div className="etcWrap">
                        <p className="etcTitle">돈을 넣어주세요.</p>
                        <div className="moneyWrap">
                            <div className="moneyBox">
                                <p>카드&돈 투입구</p>
                            </div>
                            <div className="moneyButton">
                                <p>
                                    <span></span>
                                </p>
                            </div>
                        </div>
                        <div className="btnWrap">
                            <button className="btn" onClick={changeName}>클릭</button>
                            <button className="btnAdd" onClick={popUpOpen}>음료 추가</button>
                        </div>
                        <div className="sidePop">
                            {
                                drinkAddPop ? <Modal></Modal> : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        <div className="sideBg"></div>
        </div>
    );
}

export default Vending;
