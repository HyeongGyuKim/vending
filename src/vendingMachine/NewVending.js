import './vending.scss';
import { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';
import Alert from './Alert'
import { toBeEmptyDOMElement } from '@testing-library/jest-dom/matchers';

function NewVending() {
    let [viewName, setViewName] = useState([]);
    let [drinkPop, setDrinkPop] = useState(false);
    let [drinkPriceTitle, setDrinkPriceTitle] = useState('');
    let [drinkPrice, setDrinkPrice] = useState('');
    let [inputPrice, setInputPrice] = useState('');
    let [lever, setLever] = useState(false);
    let [vendingData, setVendingData] = useState({});
    let [vendingDataDrinksOne, setVendingDataDrinksOne] = useState([]);
    let [vendingDataDrinksTwo, setVendingDataDrinksTwo] = useState([]);
    let [openAlert, setOpenAlert] = useState(false);
    let [drinkAddPop, setDrinkAddPop] = useState(false);
    let [initialization, setInitialization] = useState('')
    let [outDrinkId, setOutDrinkId] = useState([])
    let [inDrinkId, setInDrinkId] = useState([])
    

    // let [a, setA] = useState(drinkData);
    // let nums = [];
    // for(let i = 0; i < drinkData.length; i++) {
    //     let num = drinkData[i].price
    //     nums.push(num);
    // }

    let chargingPop = () => {
        setDrinkPop(!drinkPop);
        document.getElementById("insertCoin").focus();
        setInputPrice('')
    }

    let closePop = () => {
        setDrinkPop(false);
        setDrinkAddPop(false);
    }

    let insertCoin = () => {
        setDrinkPriceTitle(+inputPrice + +drinkPriceTitle);
        closePop();
    }

    let addPop = () => {
        setDrinkAddPop(!drinkAddPop);
    }
    
    let buyDrinkItem = (info) => {
        if(+drinkPriceTitle < info.price) {
            // alert("돈을 넣어주세요")
            setOpenAlert(!openAlert);
            return;
        }
        setOpenAlert(openAlert)
        setViewName([...viewName, info.name]);
        drinkPrice = info.price;
        setDrinkPriceTitle(drinkPriceTitle - drinkPrice);
    }

    let validation = (e) => {
        if(isNaN(e.target.value)) {
            alert("숫자를 써주세요");
        }else {
            setInputPrice(e.target.value);
        }
    }

    // let checkChk = (e) => {
    //     setInDrinkId([...inDrinkId, e.target.id]);
    //     console.log(setInDrinkId)
    // }
    
    let drinkChk = (e) => {
        // const checkboxes = document.querySelectorAll('.selectChk:checked');
        // let chkCopy = [];
        // checkboxes.forEach((checkbox) => {
        //     chkCopy.push(checkbox.id)
        // })
        if(e.target.checked) {
            setInDrinkId((ids) => {
                return [...ids, e.target.id];
            })
        }else {
            setInDrinkId((ids) => {
                let resultIds = ids.filter((id) => id !== e.target.id);
                return resultIds;
            })
        }
        // setInDrinkId(chkCopy);
        // console.log(inDrinkId)
        // changeDrink(chkCopy);
    }

    let drinkUpdate = () => {
        let newDrinks = vendingDataDrinksTwo.filter((ids) => {
            if(inDrinkId.includes('' + ids.drinkId)) {
                return true;
            }else {
                return false;
            }  
        })
        setVendingDataDrinksOne(newDrinks);
        closePop();
    }

    useEffect(() => {
        setTimeout(() => {setLever(false)}, 500)
    })

    let leverRotation = () => {
        setDrinkPriceTitle(initialization);
        setLever(!lever);
    }
    
    let enterKey = e => {
        if (e.key === 'Enter') {
            insertCoin();
        }
    };

    // let selectAll = (selectAll) => {
    //     const checkboxes = document.querySelectorAll('.selectChk');
    //     checkboxes.forEach((checkbox) => {
    //         checkbox.checked = selectAll.checked;
    //         console.log(checkbox)
    //     })
    // }

    useEffect(()=>{
        axios.get('http://192.168.0.85:18080/api/v9/vending-machine/2').then((data) => {
            vendingData = {...data.data};
            vendingDataDrinksOne = [...data.data.drinks];
            vendingDataDrinksTwo = [...data.data.drinks];
            // console.log(vendingData)
            setVendingData(vendingData);
            setVendingDataDrinksOne(vendingDataDrinksOne);
            setVendingDataDrinksTwo(vendingDataDrinksTwo);
        })
        .catch(() => {
            console.log("실패")
        })
        return () => {

        }
    }, [])

    let moneyOpen;
    
    if (drinkPop) {
        moneyOpen = "wrap active_nav";
    } else if (drinkAddPop) {
        moneyOpen = "wrap activePop";
    } else {
        moneyOpen = "wrap";
    }

    console.log(vendingData)
    return(
        <div className={moneyOpen}>
            <Alert isAnimation={openAlert} />
            <div className="vendingTitle">
                <span>{vendingData.name}</span>
                <span>{vendingData.location?.address1}{vendingData.location?.address2}{vendingData.location?.zipcode}</span>
            </div>
            <div className="vendingMarchineWrap">
                <div className="machineProductWrap">
                    {
                        vendingDataDrinksOne?.map((info, i) => {
                            return(
                                <div className="productBox" key={i}>
                                    <img src={info.image} alt=""/>
                                    <span>{info.name}</span>
                                    <p className={+drinkPriceTitle >= info.price ? 'item on' : 'item'} onClick={() => {buyDrinkItem(info)}}>{info.price}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="machineEtc">
                    <div className="drinkExit">
                        <p>
                            상품 : {
                                viewName.map((info, i) => {
                                    return(
                                        <span key={i}>{info}</span>
                                    )
                                }) 
                            }
                        </p>
                    </div>
                    <div className="etcWrap">
                        <p className="etcTitle">{drinkPriceTitle ? drinkPriceTitle : '돈을 넣어주세요.'}</p>
                        <div className="moneyWrap">
                            <div className="moneyBox" onClick={() => {chargingPop()}}>
                                <p>카드&돈 투입구</p>
                            </div>
                            <div className="moneyButton" onClick={() => {leverRotation()}}>
                                <p className={lever ? "on" : ""}>
                                    <span></span>
                                </p>
                            </div>
                        </div>
                        <div className="btnWrap">
                            <button className="btn">클릭</button>
                            <button className="btnAdd" onClick={() => {addPop()}}>음료 추가</button>
                        </div>
                        <div className="sidePop">
                        <div className="sideDrinkJon">
                            <div className="sideCont">
                            {
                                vendingDataDrinksTwo?.map((info, i) => {
                                    // inDrinkId = info.drinkId;
                                    return(
                                        <div className="productBox" key={i}>
                                            <img src={info.image} alt=""/>
                                            <span>{info.name}</span>
                                            <p className="item">{info.price}</p>
                                            <input type="checkbox" className='selectChk' id={info.drinkId} onChange={(e) => {drinkChk(e)}}/>
                                        </div>
                                    )
                                })
                            }
                            </div>
                            <div className="btnDU">
                                <button className="btnDelete">삭제</button>
                                <button className="btnUpload" onClick={() => {drinkUpdate()}}>등록</button>
                                <label htmlFor="entireChk">
                                    전체선택
                                    <input type="checkbox" className="entireChk" id="entireChk" />
                                </label>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="side_nav">
                <div className="side_cont">
                    <img src="img/img.gif" alt="" />
                    <div className="input-container">
                        <input type="text" id="insertCoin" value={inputPrice} onChange={validation} onKeyDown={enterKey}/>
                        <button className="invite-btn" type="button" onClick={() => {insertCoin()}}>돈을 넣어주세요</button>
                    </div>
                </div>
            </div>
            <div className="sideBg" onClick={() => {closePop()}}></div>
        </div>
    )
}

export default NewVending;