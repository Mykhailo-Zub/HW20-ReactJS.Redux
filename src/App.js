import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

import Post from "./components/Posts/Post";
import "./App.css";

const useStyles = makeStyles((theme) => ({
    button: {
        fontSize: "20px",
        width: "900px",
        margin: "20px auto",
        display: "flex",
    },
    formControl: {
        margin: "20px auto",
        minWidth: 120,
        width: 900,
        display: "flex",
    },
    textField: {
        margin: "20px auto",
        minWidth: 120,
        width: 900,
        display: "flex",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

let id = 3;

const App = (props) => {
    const [author, setAuthor] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [postText, setPostText] = useState("");

    const classes = useStyles();

    const postCreate = () => {
        if (author && imageUrl && postText) {
            setAuthor("");
            setImageUrl("");
            setPostText("");
            id++;
        } else alert("Please enter post info");
    };

    const sendComponent = ({ dispatch }) => {
        return (
            <Button
                variant="contained"
                className={classes.button}
                endIcon={<SendIcon />}
                onClick={() => {
                    if (author && imageUrl && postText) {
                        postCreate();
                        dispatch({
                            type: "POST_CREATE",
                            id: id,
                            author: author,
                            content: postText,
                            image: imageUrl,
                        });
                    } else alert("Please enter post info");
                }}
            >
                Send
            </Button>
        );
    };

    const Send = connect(null, null)(sendComponent);

    return (
        <div className="App">
            <TextField
                id="outlined-helperText"
                label="Post image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                variant="outlined"
                className={classes.textField}
            />
            <TextField
                id="outlined-multiline-flexible"
                label="Post text"
                multiline
                rows={3}
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                variant="outlined"
                className={classes.textField}
            />
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                    Select user
                </InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    label="Select user"
                >
                    <MenuItem value="Anakin Skywalker">
                        Anakin Skywalker
                    </MenuItem>
                    <MenuItem value="Luke Skywalker">Luke Skywalker</MenuItem>
                </Select>
            </FormControl>
            <Send />
            {props.posts.map(({ author, date, content, image, social, id }) => {
                return (
                    <Post
                        author={author}
                        date={date}
                        content={content}
                        image={image}
                        social={social}
                        key={id}
                    />
                );
            })}
        </div>
    );
};

const mapState = (state) => {
    return {
        posts: state,
    };
};

export default connect(mapState, null)(App);
