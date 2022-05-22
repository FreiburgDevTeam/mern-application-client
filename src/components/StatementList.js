import React, { useState, useContext } from "react";
import { DataContext } from "../context/data.context";
import { LayoutGroup, motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

const Content = ({ content }) => {

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
                <Link to={`/statements/${content._id}/delete`}>Delete</Link><br />
            </div>
        </motion.div>
    );
};

const Item = ({ content }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);

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
                        <p>{content.startDate}</p>
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
                <div className="StatementList">
                    {
                        statements?.map((item, index) => {
                            return (
                                <div key={index} >
                                    <Item content={item} />
                                </div>
                            )
                        })
                    }
                </div>
            </LayoutGroup>
        </>
    )
}
export default StatementList;
