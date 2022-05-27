import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { DataContext } from "../context/data.context";
import { useContext } from "react";
import Title from './Title'
import { Button, Grid, TextField, Typography } from "@mui/material";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SaveIcon from '@mui/icons-material/Save';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';


function EditStatement () {
    const { statements, updateData } = useContext(DataContext);
    const {statementId} = useParams();
   

    const statementEdit = statements.find(statement => statement._id === statementId);    
   
    const [title, setTitle] = useState(statementEdit.title);
    const [amount, setAmount] = useState(statementEdit.amount);
    const [description, setDescription] = useState(statementEdit.description);
    const [type, setType] = useState(statementEdit.type);
    const [regularity, setRegularity] = useState(statementEdit.regularity);
    const [startDate, setStartDate] = useState(statementEdit.startDate);
    const [category, setCategory] = useState(statementEdit.category);
    
    
    
    const navigate = useNavigate();

    

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

        axios.put(`${process.env.REACT_APP_API_URL}/statements/${statementId}`, newDetails,
        { headers: { Authorization: `Bearer ${storedToken}` } } )
            .then(response => {
                console.log('update response', response)
                updateData()
                navigate("/dashboard");
            })
            .catch(e => console.log("error updating statement...", e));
    }

   


    return (
        <div className="flex-columm newState">
            <NavBar />
            <Title>Edit Statement</Title>

            <form onSubmit={handleSubmit}>
                <Grid>
                    <TextField fullWidth
                        type="text"
                        name="title"
                        id="title"
                        label="Title"
                        variant="filled"
                        value={title}
                        required={true}
                        onChange={(e) => setTitle(e.target.value)} />
                </Grid><br />

                <Grid>
                    <TextField fullWidth
                        id="outlined-multiline-flexible"
                        name="description"
                        variant="filled"
                        label="Description"
                        cols="50"
                        multiline
                        maxRows={4}
                        maxLength="100"
                        value={description}
                        required={true}
                        onChange={(e) => setDescription(e.target.value)} /> <br />
                </Grid> <br />

                <Grid>
                    <TextField fullWidth
                        variant="filled"
                        type="date"
                        name="startDate"
                        id="startDate"
                        InputProps={{inputProps: { min: "2021-01-01", max: new Date().toISOString().split("T")[0]} }}
                        required={true}
                        modifiers={{ disabled: { after: new Date() } }}
                        value={startDate}
                        disabled={false}
                        locale="en"
                        defaultValue="2017-05-24T10:30"
                        onChange={(e) => setStartDate(e.target.value)} />
                </Grid> <br />

                <Grid>
                    <TextField fullWidth
                        variant="filled"
                        type="number"
                        name="amount"
                        label="Amount in Euro"
                        id="amount"
                        InputProps={{ inputProps: { min: 0, max: 99999 } }}
                        value={amount}
                        required={true}
                        onChange={(e) => setAmount(e.target.value)} />
                </Grid> <br />

                <Grid>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-helper-label">Income/Expense</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            required={true}
                            value={type} onChange={(e) => setType(e.target.value)}>

                            <MenuItem value="income">Income</MenuItem>
                            <MenuItem value="expense">Expense</MenuItem>

                        </Select>
                    </FormControl>
                </Grid>
                <br />
                <Grid>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Once/Monthly</InputLabel>
                        <Select value={regularity} onChange={(e) => setRegularity(e.target.value)}
                            required={true}
                        >
                            <MenuItem value="once">Once</MenuItem>
                            <MenuItem value="monthly">Monthly</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <br />
                <Grid>



                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                        <Select value={category} onChange={(e) => setCategory(e.target.value)}
                            required={true}
                            id="demo-simple-select-standard"
                        >

                            <MenuItem value="Job">Job</MenuItem>
                            <MenuItem value="Travel">Travel</MenuItem>
                            <MenuItem value="Investments">Investments</MenuItem>
                            <MenuItem value="Hobby">Hobby</MenuItem>
                            <MenuItem value="Sport">Sport</MenuItem>
                            <MenuItem value="Entertaiment">Entertaiment</MenuItem>
                            <MenuItem value="Food">Food</MenuItem>
                            <MenuItem value="Health">Health</MenuItem>
                            <MenuItem value="Transport">Transport</MenuItem>
                            <MenuItem value="Others">Others</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <br />

                <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    type="submit">Save</Button>

            </form>
        </div>
    )
}

export default EditStatement;