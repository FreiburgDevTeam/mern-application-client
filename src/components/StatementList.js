import React, { useState, useContext } from "react";
import { DataContext } from "../context/data.context";
import { LayoutGroup, motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";
import moment from "moment";
import { Button, Table, TableBody, TableCell, TableRow, TableHead, TableContainer, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Title from "./Title";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const Content = ({ content }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell key={content._id}>
                                <p>Description: {content.description}</p>
                                <p>Category: {content.category}</p>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

        </motion.div>
    );
};

const Item = ({ content }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { updateData } = useContext(DataContext);
    const statementId = content._id;

    const handleDelete = (e) => {
        e.preventDefault();
        const answer = window.confirm("Are you sure to delete this statement?");
        if (answer) {
            const storedToken = localStorage.getItem('authToken');
            //send delete request with token to API
            axios.delete(`${process.env.REACT_APP_API_URL}/statements/${statementId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } })
                .then(() => {
                    updateData();
                })
                .catch((err) => console.log(err));
        }
    };

    const toggleOpen = () => setIsOpen(!isOpen);
    const startDate = new Date(content.startDate);
    const formattedDate = moment(startDate).format('DD/MM/YYYY');
    let options;
    isOpen ? options = <ExpandLessIcon /> : options = <ExpandMoreIcon />

    return (

        <motion.div>
            <motion.div layout>
                <TableContainer>
                    <Table >
                        <TableBody >
                            <TableRow>
                                <TableCell>{formattedDate}</TableCell>
                                <TableCell align="right">{content.title}</TableCell>
                                <TableCell align="right">{content.type}</TableCell>
                                <TableCell align="right">{content.regularity}</TableCell>
                                <TableCell align="right">{content.amount} €</TableCell>
                                <TableCell align="right">
                                    <Button onClick={toggleOpen}>{options}</Button>
                                    <Button><Link to={`/statements/${content._id}/edit`}><EditIcon /></Link></Button>
                                    <Button onClick={handleDelete}><DeleteIcon /></Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </motion.div>
            <AnimatePresence>{isOpen && <Content content={content} />}
            </AnimatePresence>
        </motion.div>
    );
};

function StatementList() {
    const [filteredTitle, setFilteredTitle] = useState('');
    const { statements } = useContext(DataContext);


    const handleSearchInput = (event) => {
        setFilteredTitle(event.target.value);
    };

    return (
        <section >
            <NavBar />
            <div className="Box main-container">
                <Title>Statement List</Title><br />
                <LayoutGroup >
                    <input
                        className="search-bar"
                        value={filteredTitle}
                        placeholder="Search Title"
                        type="text"
                        onChange={handleSearchInput}
                    />

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell align="right">Title</TableCell>
                                <TableCell align="right">Type</TableCell>
                                <TableCell align="right">Regularity</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell align="right">Options</TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                    <section className="StatementList"> <br />
                        {
                            statements.length === 0 ?
                                <Title>Your statements list is empty <SentimentVeryDissatisfiedIcon />, add a <Link to={"/statements/create"}>New Statement</Link></Title>
                                :
                                (
                                    statements
                                        .filter((statement) => {
                                            const lowerFilter = filteredTitle.toLowerCase();
                                            return statement.title.toLowerCase().includes(lowerFilter);
                                        })
                                        .map((item, index) => {
                                            return (
                                                <section key={index}>
                                                    <Item content={item} />
                                                </section>
                                            )
                                        })

                                )
                        }
                    </section>
                </LayoutGroup>
            </div>
        </section>
    )
}
export default StatementList;