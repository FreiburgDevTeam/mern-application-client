import React, { useState, useContext } from "react";
import { DataContext } from "../context/data.context";
import { LayoutGroup, motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";
import moment from "moment";

const Content = ({ content }) => {
    const { updateData } = useContext(DataContext);
    const statementId = content._id;

    const handleDelete = () => {
        const storedToken = localStorage.getItem('authToken');
        //send delete request with token to API
        axios.delete(`${process.env.REACT_APP_API_URL}/statements/${statementId}`,
            { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(() => {
                updateData();
            })
            .catch((err) => console.log(err));
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div>
                <p>{content.description}</p>
                <p>Regularity: {content.regularity}</p>
                <p>Category: {content.category}</p>
            </div>
            <div>
                <Link to={`/statements/${content._id}/edit`}>Edit</Link><br />
                <button onClick={handleDelete}>Delete</button>
            </div>
        </motion.div>
    );
};

const Item = ({ content }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);
    const startDate = new Date(content.startDate);
    const formattedDate = moment(startDate).format('DD/MM/YYYY');
    let options;
    isOpen ? options = " - Less" : options = "+ More"

    return (
        <motion.div
            layout
            // title="Click to see more details"
            // onClick={toggleOpen}
            initial={{ borderRadius: [25] }
            }
        >
            <motion.div className="item" layout>
                <div className="flex-row">
                    <div>
                        <h2>{content.title}</h2>
                        <h2>{content.amount}</h2>
                        <p>{formattedDate}</p>
                    </div>
                    <Link to="#" onClick={toggleOpen}>{options}</Link><br />
                </div>
            </motion.div>
            <AnimatePresence>{isOpen && <Content content={content} />}
            </AnimatePresence>
        </motion.div>
    );
};

function StatementList() {
    const { statements } = useContext(DataContext);

    return (
        <>
            <NavBar />
            <h1>Statement List</h1>
            <LayoutGroup>
                <form>
                    <select>
                        <option>Income</option>
                        <option>Expense</option>
                    </select>
                </form>
                <div className="StatementList">
                    {
                        statements === null ?
                            <p>Your statements list is empty. Please add a <Link to={"/statements/create"}>New Statement</Link> to continue.<br /></p>
                            :
                            (
                                <>
                                    <p>{statements.length} statements found</p>
                                    <br />
                                    {statements?.map((item, index) => {
                                        return (
                                            <div key={index} >
                                                <Item content={item} />
                                            </div>
                                        )
                                    })}
                                </>
                            )
                    }
                </div>
            </LayoutGroup>
        </>
    )
}
export default StatementList;