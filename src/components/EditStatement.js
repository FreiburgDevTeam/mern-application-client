import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";



function EditStatement () {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [regularity, setRegularity] = useState("");
    const [startDate, setStartDate] = useState("");
    const [category, setCategory] = useState("");

    const navigate = useNavigate();

    const {statementId} = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newDetails = {
            title,
            amount,
            description,
            type,
            regularity,
            startDate,
            category,
        }

        const storedToken = localStorage.getItem('authToken');

        axios.put(`${process.env.REACT_APP_API_URL}/statements/${statementId}/edit`, newDetails,
        { headers: { Authorization: `Bearer ${storedToken}` } } )
            .then(response => {
                console.log('update response', response)
                navigate("/dashboard");
            })
            .catch(e => console.log("error updating statement...", e));
    }

   


    return (
        <div className="App">
        <NavBar/>
        <h2>Edit Statement</h2>
        <br />
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label><br />
            <input
            type="text"
            name="title"
            id="title"
            value={title}
            required={true}
            onChange={(e) => setTitle(e.target.value)} /><br />

            <label htmlFor="description">Description:</label><br />
            <textarea
            id="description"
            name="description"
            rows="4"
            cols="50"
            minLength="4"
            maxLength="100"
            value={description}
            required={true}
            onChange={(e) => setDescription(e.target.value)} /><br />

            <label htmlFor="startDate">Start date:</label><br />
            <input
            type="date"
            name="startDate"
            id="startDate"
            modifiers={{disabled: { after: new Date() }}}
            value={startDate}
            disabled={false}
            locale="en"
            onChange={(e) => setStartDate(e.target.value)}/><br />

            <label htmlFor="amount">Amount:</label><br />
            <input
            type="number"
            name="amount"
            id="amount"
            min="1"
            max="1000000"
            value={amount}
            required={true}
            onChange={(e) => setAmount(e.target.value)} />
            <br />

            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option defaultValue>Type of Statement:</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>
            <br />

            <select value={regularity} onChange={(e) => setRegularity(e.target.value)}>
                <option defaultValue>Regularity:</option>
                <option value="once">Once</option>
                <option value="monthly">Monthly</option>
            </select>
            <br />

            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option defaultValue>Category:</option>
                <option value="Job">Job</option>
                <option value="Travel">Travel</option>
                <option value="Investments">Investments</option>
                <option value="Hobby">Hobby</option>
                <option value="Sport">Sport</option>
                <option value="Entertaiment">Entertaiment</option>
                <option value="Food">Food</option>
                <option value="Health">Health</option>
                <option value="Transport">Transport</option>
                <option value="Others">Others</option>
            </select>
            <br />

            <button type="submit">Edit Statement</button>
        </form>
    </div>
    )
}

export default EditStatement;