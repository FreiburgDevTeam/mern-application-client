
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/data.context";
import NavBar from "./NavBar";
import Title from './Title'
import { Button, Grid, TextField, Typography } from "@mui/material";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SaveIcon from '@mui/icons-material/Save';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';


function NewStatement() {
    const { updateData } = useContext(DataContext);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [regularity, setRegularity] = useState("");
    const [startDate, setStartDate] = useState("");
    const [category, setCategory] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newStatement = {
            title,
            amount,
            description,
            type,
            regularity,
            startDate,
            category,
        }

        const storedToken = localStorage.getItem('authToken');

        axios.post(
            process.env.REACT_APP_API_URL + "/statements",
            newStatement,
            { headers: { Authorization: `Bearer ${storedToken}` } }
        )
            .then(response => {
                updateData();
                navigate("/dashboard");
            })
            .catch(e => console.log("error creating statement...", e));
    }

    return (
        <div className="flex-columm newState">
            <NavBar />
            <Title>New Statement</Title>

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
                        min="2021-01-01"
                        required={true}
                        max={new Date().toISOString().split("T")[0]}
                        modifiers={{ disabled: { after: new Date() } }}
                        value={startDate}
                        disabled={false}
                        locale="en"
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
                    type="submit">Add Statement</Button>

            </form>
        </div>
    )
}

export default NewStatement;