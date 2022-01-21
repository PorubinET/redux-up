import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { inputDelete, updateText, updateDesc, checkUpdate } from "../../redux/actions";
import './taskItem.css';

import DateMomentUtils from '@date-io/moment';// choose your lib
import {
    // DatePicker,
    // TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';


function TaskItem(props) {
    let [mode, setMode] = useState(false);
    let [btn, setBtn] = useState(false);
    // const [descript, setDescript] = useState(descript)
    const [selectedDate, handleDateChange] = useState(new Date().setHours(24));
    const [input, setInput] = useState('')
    const [desc, setDesc] = useState('')


    const { text, _id, done, descript } = props
    const dispatch = useDispatch();

    // удаляем таску
    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(inputDelete(_id))
    };

    // ввод инпута
    const handleInput = (e) => { setInput(e.target.value = e.target.value.replace(/ +/g, ' ')) }
    const handleDescript = (e) => { setInput(e.target.value = e.target.value.replace(/ +/g, ' ')) }


    // обновление чека и отправка на сервер
    const handleCheck = (e) => {
        e.preventDefault();
        try {
            dispatch(checkUpdate(_id, !done));
        } catch (error) {
            console.log(error);
        }
    }

    // взаимодействие с css
    const removeAttribute = (e) => {
        e.currentTarget.removeAttribute("readonly", "true")
    }
    const onBlur = (e) => {
        e.preventDefault();
        handleUpdateInput(e)
        setMode(false)
        e.currentTarget.classList.remove("to-do__text-active")
    }
    const onFocus = (e) => {
        handleUpdateInput(e)
        e.currentTarget.classList.add("to-do__text-active")
    }

    const addBtn = (e) => {
        e.preventDefault();
        setBtn(!btn)
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleUpdateInput(e)
            setMode(false)
            e.currentTarget.setAttribute("readonly", "true")
            e.currentTarget.classList.remove("to-do__text-active");
        }
    }
    const modeUpdateTrue = (e) => {
        e.preventDefault();
        setMode(true)
    }

    const handleUpdateInput = async (e) => {
        e.preventDefault();
        if (!input || input === " ") {
            setInput(e.target.value = props.text);
        }
        else {
            try {
                setInput(text);
            } catch (error) {
                console.log(error);
            }
            dispatch(updateText(input, _id, done))
        }
    };

    //Description//
    const handleUpdateDesc = async (e) => {
        e.preventDefault();
        if (!input || input === " ") {
            setDesc(e.target.value = props.text);
        }
        else {
            try {
                setDesc(text);
            } catch (error) {
                console.log(error);
            }
            dispatch(updateDesc(_id, input))
        }
    };
    //////////////////

    let classDone, classCheck, classActive, classBtn;
    if (done) {
        classDone = "to-do__text to-do__done";
        classCheck = "to-do__checkbox to-do__checkbox-actve";
        classActive = "to-do__checkbox-check to-do__checkbox-check-active";
    } else {
        classDone = "to-do__text";
        classCheck = "to-do__checkbox";
        classActive = "to-do__checkbox-check";
    }


    if (btn) {
        classBtn = "to-do__menu-wrapp active"
    } else {
        classBtn = "to-do__menu-wrapp"
    }

    useEffect(() => {
        if (text) {
            setInput(text)
        }
    }, [text])
    return (
        <li className="to-do__list-li">
            <MuiPickersUtilsProvider utils={DateMomentUtils}>
                <div className="to-do__Time to-do__material">
                    <DateTimePicker value={selectedDate} onChange={handleDateChange} />
                </div>
            </MuiPickersUtilsProvider>
            <label
                className={classCheck}
                htmlFor="checkItem">
            </label>
            <input
                id="checkItem"
                className="to-do__checkbox-input"
                onClick={handleCheck}
                type="checkbox"
            />
            <img
                className={classActive}
                src="/img/check.svg"
                alt="check"
            />
            <div className="div">
                {mode ?
                    <>
                        <input
                            type="text"
                            autoFocus
                            className={classDone}
                            onBlur={onBlur}
                            onFocus={onFocus}
                            onKeyDown={handleKeyDown}
                            onDoubleClick={removeAttribute}
                            onChange={handleInput}
                            defaultValue={text}
                            id={_id}
                        />
                    </>
                    :
                    <>
                        <div
                            type="text"
                            disabled
                            className={classDone}
                            onDoubleClick={modeUpdateTrue}
                            id={_id}
                        >
                            {text}
                        </div>

                        {btn ? <>
                        <textarea
                            className="to-do__description"
                            maxlength="130"
                            name="text"
                            onChange={handleInput}
                            placeholder="Description"
                            id={_id}
                        >
                            {desc}
                        </textarea>
                        </> : <></>}
                        <button className="to-do__checkbox-btn" onClick={handleDelete}>
                            <img className="to-do__checkbox-cross" src="/img/cross.svg" alt="delete" />
                        </button>
                        <button className="to-do__menu-add" onClick={addBtn}>
                            <img className="to-do__menu-img" src="/img/pencil.svg"width={18} height={18}/>
                        </button>
                        <div className="to-do__menu">
                            <div className={classBtn}>
                                <div className="to-do__menu-btn-wrapp">
                                    <button className="to-do__menu-brn"onClick={handleUpdateDesc}>add</button>
                                </div>
                                <div className="to-do__menu-btn-wrapp">
                                    <button className="to-do__menu-brn">watch</button>
                                </div>
                                <div className="to-do__menu-btn-wrapp">
                                    <button className="to-do__menu-brn">change</button>
                                </div>
                            </div>
                        </div>

                    </>}
            </div>
        </li>
    )
}



export default TaskItem;
