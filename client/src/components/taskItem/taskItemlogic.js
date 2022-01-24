
import { useState } from "react";
import { useDispatch } from "react-redux";
import { inputDelete, updateText, updateDesc, updateDate, checkUpdate } from "../../redux/actions";


export default function ObjectManipulator(props) {
    const { _id, desc, done, text, date } = props
    const dispatch = useDispatch();

    handleCheck = (e) => {
        e.preventDefault();
        try {
            dispatch(checkUpdate(_id, !done));
        } catch (error) {
            console.log(error);
        }
    }
};


  