import { useDispatch, useSelector } from "react-redux";
import { taskDeleteAll, filterUpdate } from "../../redux/actions"

import './footer.css'

function Footer() {
    const tasks = useSelector(state => {
        const { itemsReducer } = state;
        return itemsReducer.tasks;
    })

    const filter = useSelector(state => {
        const { itemsReducer } = state;
        return itemsReducer.filter;
    })

    const dispatch = useDispatch();

    const falseItems = tasks.filter(item => !item.done).length
    const trueItems = tasks.filter(item => item.done).length

    const buttonsData = [
        { name: 'all', label: 'All' },
        { name: 'active', label: 'Active' },
        { name: 'compleated', label: 'Completed' }
    ]

    const buttons = buttonsData.map(({ name, label }) => {
        const active = filter === name;
        let clazz = active ? "to-do__btn-active" : "to-do__board-btn";

        const filterBtn = (name) => {
            try {
                dispatch(filterUpdate(name))
            } catch (error) {
                console.log(error)
            }
        }

        return (
            <button
                className={clazz}
                type="button"
                onClick={() => filterBtn(name)}
                key={name}
            >
                {label}
            </button>
        )
    })


    const deleteAll = (e) => {
        e.preventDefault();
        try {
            dispatch(taskDeleteAll())
        } catch (error) {
            console.log(error)
        }
    }


    if (tasks.length) {
        const checkS = falseItems > 1 ? "s" : "";
        const classBtn = trueItems ? "to-do__board-btn-clear to-do__board-btn-active" : "to-do__board-btn-clear";

        return (
            <div className="to-do__board">
                <p className="to-do__board-list-items">
                    {falseItems} item{checkS}
                </p>
                <ul className="to-do__board-check">
                    <li className="to-do__board-li">
                        {buttons}
                    </li>
                </ul>
                <div className={classBtn}>
                    <button
                        className="to-do__board-list-btn"
                        onClick={deleteAll}
                    >
                        Clear completed
                    </button>
                </div>
            </div>
        )
    }
    else {
        return (<></>)
    }

}

export default Footer;
