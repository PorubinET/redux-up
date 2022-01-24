import { useState } from "react";
import { useDispatch } from "react-redux";
import { inputDelete, updateText, updateDesc, updateDate, checkUpdate } from "../../redux/actions";
import DateMomentUtils from '@date-io/moment';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Popover, TextField, Modal, Box, Typography, Button } from "@material-ui/core";

import ObjectManipulator from "../taskItem/taskItemlogic"

import './taskItem.css';


function TaskItem(props) {
    const { _id, desc, done, text, date } = props
    const dispatch = useDispatch();
    let [mode, setMode] = useState(false);
    let [btn, setBtn] = useState(false);


    const [selectedDate, setdateChange] = useState(date);

    const [input, setInput] = useState(" ")
    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(inputDelete(_id))
    };

    const handleInput = (e) => { setInput(e.target.value = e.target.value.replace(/ +/g, ' ')) }

    console.log(input)


    // обновление чека и отправка на сервер
    // const handleCheck = (e) => {
    //     e.preventDefault();
    //     try {
    //         dispatch(checkUpdate(_id, !done));
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

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

    const addPopap = (e) => {
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
        console.log('text')
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
        console.log('text')
        if (!input || input === " ") {
            setInput(e.target.value = props.desc);
        }
        else {
            try {
                setInput(desc);
                let el = document.getElementsByClassName("to-do__description");
                for (var i = 0; i < el.length; i++) {
                    let attr = el[i].getAttribute("index")
                    if (attr === _id) {
                        el[i].classList.remove("active");
                    }
                }
            } catch (error) {
                console.log(error);
            }
            console.log(_id, input)
        }
    };

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
        classBtn = "to-do__popup active"
    } else {
        classBtn = "to-do__popup"
    }

    const onCalendarChange = (e) => {
        console.log(e)
        setdateChange(e._d)
        dispatch(updateDate(_id, e._d))
    }

    //////////////////////////////////////////////////

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: '15px',
    };

    const updateDescript = (e) => {
        e.preventDefault();
        if (!input || input === " ") {
            setInput(e.target.value = props.desc);
        }
        else {
            try {
                dispatch(updateDesc(_id, input))
                setBtn(!btn)
                setInput("")
            } catch (error) {
                console.log(error);
            }
            console.log(_id, input)
        }
    }

    const handleKeyDesck = (e) => {
        if (e.keyCode === 13) {
            updateDescript(e)
            setMode(false)
        }
    }

    return (
        <li className="to-do__list-li">
            <MuiPickersUtilsProvider utils={DateMomentUtils}>
                <div className="to-do__Time to-do__material">
                    <DateTimePicker
                        value={selectedDate}
                        format="YYYY-MM-DD-HH:mm"
                        autoOk={true}
                        onChange={onCalendarChange}
                    />
                </div>
            </MuiPickersUtilsProvider>
            <label
                className={classCheck}
                htmlFor="checkItem">
            </label>
            <input
                id="checkItem"
                className="to-do__checkbox-input"
                onClick={handleCheck()}
                type="checkbox"
            />
            <img
                className={classActive}
                src="/img/check.svg"
                alt="check"
            />
            <div className="to-do__wrapp-div">
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

                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            index={_id}
                        >
                            <Box sx={style}>
                                <TextField onChange={handleInput} onKeyDown={handleKeyDesck} label={desc} value={input} id="margin-normal" margin="normal" />
                                <div className='to-do__btn-add-desc'>
                                    <Button className='to-do__btn-add' onClick={updateDescript}>save</Button>
                                </div>
                            </Box>
                        </Modal>


                        <Button className="to-do__menu-add" onClick={handleOpen}>
                            <img className="to-do__menu-img" src="/img/pencil.svg" alt="add" />
                        </Button>

                        {/* ////////////////////////////// */}

                        {/* <div className={classBtn}>
                            <div className="to-do__desc-wrap">
                                    <button className="to-do__btn-exit" onClick={addPopap}>
                                        <img className="to-do__checkbox-cross" src="/img/cross.svg" alt="delete" />
                                    </button>
                                <label className="to-do__label">
                                    <textarea
                                        className="to-do__description"
                                        maxLength="130"
                                        name="text"
                                        onChange={handleInput}
                                        placeholder="Description"
                                        defaultValue={desc}
                                        index={_id}
                                    />
                                </label>
                                    <button className="to-do__btn-send" onClick={handleUpdateDesc}>отправить</button>
                                <div className="to-do__btn-wrap">
                                </div>
                            </div>
                        </div>       
                        <button className="to-do__menu-add" onClick={addPopap}>
                            <img className="to-do__menu-img" src="/img/pencil.svg" alt="add"/>
                        </button> */}

                        <button className="to-do__checkbox-btn" onClick={handleDelete}>
                            <img className="to-do__checkbox-cross" src="/img/cross.svg" alt="delete" />
                        </button>
                    </>}
            </div>
        </li>
    )
}



export default TaskItem;
