import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
import FileBase64 from './FireBase64';

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    const [postData, setPostData] = useState({ title: '', message: '', selectedFile: '' });
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (currentId === 0) {
            dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
        } else {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        }

        clear();
    }
    
    const clear = () => {
        setCurrentId(0);
        setPostData({ creator: '', title: '', message: '', selectedFile: '' });
    }

    if (!user?.result?.name) {
        return (
            <Paper sx={(theme) => ({
                padding: theme.spacing(2)
            })}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like other's memories.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper sx={(theme) => ({
            padding: theme.spacing(2)
        })}>
            <Box component="form" autoComplete="off" noValidate sx={(theme) => ({
                '& .MuiTextField-root': {
                    margin: theme.spacing(1)
                },
                padding: theme.spacing(2)
            })} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
                <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <div className={classes.fileInput}>
                    <FileBase64
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button sx={{ mb: 1 }} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </Box>
        </Paper>
    );
}

export default Form;